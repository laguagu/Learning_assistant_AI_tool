"""
UPBEAT Learning Assistant API

This is a FastAPI backend for a learning assistant application that provides learning plans
to users and chatbot functionality.
"""

import os
import pickle
import re
import tempfile
from datetime import datetime
from typing import Any, Dict, List, Optional

import pandas as pd
from dotenv import load_dotenv
from fastapi import BackgroundTasks, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
from langchain_community.tools import TavilySearchResults
from langchain_core.messages import AIMessage, AIMessageChunk, ToolMessage
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from pydantic import BaseModel

# --- CONFIGURATION ---
IS_DEBUG = 1  # Set to 0 in production environment
STUDY_PLANS_FILE = r'learning_plans/study_plans_data.pickle'
CURATED_MATERIALS_FILE = r'data/curated_additional_materials.txt'
LLM_MODEL = "gpt-4o"  # You can change to another model if needed
TRAINING_PERIOD_START = datetime(2025, month=3, day=1, hour=6)
TRAINING_PERIOD_END = datetime(2025, month=3, day=30, hour=23)

# --- LEARNING PLAN PARSER ---
def parse_learning_plan(plan_text: str) -> Dict:
    """
    Parses the learning plan text into a structured JSON object.
    
    Args:
        plan_text: Learning plan Markdown text
    
    Returns:
        Dict: Parsed plan with section names as keys
    """
    # Separate title and introduction
    title_match = re.search(r'^(.*?)\n(Dear.*?)(?=\n\n\d+\.)', plan_text, re.DOTALL)
    
    if not title_match:
        return {"error": "Couldn't parse the learning plan format"}
    
    title = title_match.group(1).strip()
    introduction = title_match.group(2).strip()
    
    # Identify different sections
    # Find all headers in the format "## X. Title" and their contents
    section_pattern = r'(?:^|\n)(\d+)\.\s+(.*?)\n(.*?)(?=\n\d+\.|$)'
    sections_raw = re.findall(section_pattern, plan_text, re.DOTALL)
    
    sections = {}
    
    # Process found sections
    for section_num, section_title, section_content in sections_raw:
        key = f"section_{section_num}"
        sections[key] = {
            "number": section_num,
            "title": section_title.strip(),
            "content": section_content.strip()
        }
        
        # Special handling for topic sections (Essential learning topics)
        if "Essential learning topics" in section_title:
            topics = parse_learning_topics(section_content)
            if topics:
                sections[key]["topics"] = topics
                
        # Special handling for learning objectives
        elif "Learning objectives" in section_title:
            objectives = parse_learning_objectives(section_content)
            if objectives:
                sections[key]["objectives"] = objectives
                
        # Special handling for assignments (Extra assignments)
        elif "Extra assignments" in section_title:
            assignments = parse_assignments(section_content)
            if assignments:
                sections[key]["assignments"] = assignments
                
        # Special handling for additional materials
        elif "Additional" in section_title:
            materials = parse_additional_materials(section_content)
            if materials:
                sections[key]["materials"] = materials
                
    # Extract the final paragraph
    ending_match = re.search(r'We are glad to have you onboard.*', plan_text, re.DOTALL)
    ending = ending_match.group(0) if ending_match else ""
    
    # Build the final result
    result = {
        "title": title,
        "introduction": introduction,
        "sections": sections,
        "ending": ending
    }
    
    return result

def parse_learning_topics(content: str) -> List[Dict]:
    """Parses learning topics into a list"""
    # Finds numbered topics, e.g. "1 Generative AI skills"
    topic_pattern = r'(\d+)\s+(.*?)(?=\n|$)(.*?)(?=\n\d+\s+|$)'
    topics_raw = re.findall(topic_pattern, content, re.DOTALL)
    
    topics = []
    for num, title, description in topics_raw:
        topics.append({
            "number": num,
            "title": title.strip(),
            "description": description.strip()
        })
    
    return topics

def parse_learning_objectives(content: str) -> Dict[str, List[str]]:
    """Parses learning objectives"""
    # Finds topics and their bullet points
    objective_groups = {}
    
    # Identify topics and add them to the object
    category_pattern = r'(.*?)\n((?:.*?\n)*?)(?=\n[A-Za-z]|$)'
    matches = re.findall(category_pattern, content)
    
    for category, items_text in matches:
        category = category.strip()
        if not category:
            continue
            
        # Split text rows into a list and remove empty ones
        items = [line.strip() for line in items_text.split('\n') if line.strip()]
        objective_groups[category] = items
    
    return objective_groups

def parse_assignments(content: str) -> List[Dict]:
    """Parses assignments"""
    # Identify assignments and their descriptions
    assignment_pattern = r'(.*?)\nTask:(.*?)(?:Process:|Tool:|$)(.*?)(?:Tool:|Sample prompt:|$)(.*?)(?:Sample prompt:|$)(.*?)(?=\n\n|$)'
    assignments_raw = re.findall(assignment_pattern, content, re.DOTALL)
    
    assignments = []
    for matches in assignments_raw:
        # Remove empty strings and process the remaining ones
        parts = [p.strip() for p in matches if p.strip()]
        
        if len(parts) < 2:
            continue
            
        assignment = {"title": parts[0]}
        
        # Find key-value pairs where the key is "Task:", "Process:", etc.
        for i in range(1, len(parts)):
            if "Task:" in parts[i-1]:
                assignment["task"] = parts[i]
            elif "Process:" in parts[i-1]:
                assignment["process"] = parts[i]
            elif "Tool:" in parts[i-1] or "Tools:" in parts[i-1]:
                assignment["tools"] = parts[i]
            elif "Sample prompt:" in parts[i-1]:
                assignment["sample_prompt"] = parts[i]
        
        assignments.append(assignment)
    
    return assignments

def parse_additional_materials(content: str) -> List[Dict]:
    """Parses additional materials"""
    # This typically contains numbered items and URLs
    material_pattern = r'(\d+): (.*?)(?=\nhttp|\n\d+:|$)\n?(https?://[^\s]+)?'
    materials_raw = re.findall(material_pattern, content, re.DOTALL)
    
    materials = []
    for num, description, url in materials_raw:
        materials.append({
            "number": num,
            "description": description.strip(),
            "url": url.strip() if url else None
        })
    
    return materials

# --- ENVIRONMENT SETUP ---
def setup_environment():
    """Loads environment variables and determines current phase"""
    load_dotenv('.env')
    
    # Set environment variables from .env file
    os.environ["ANTHROPIC_API_KEY"] = os.getenv("ANTHROPIC_API_KEY")
    os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
    os.environ["TAVILY_API_KEY"] = os.getenv('TAVILY_API_KEY')

    # Determine current phase
    current_time = datetime.now()
    if IS_DEBUG == 1:
        return 2  # Force phase 2 in debug mode
    elif current_time < TRAINING_PERIOD_START:
        return 1
    elif current_time < TRAINING_PERIOD_END:
        return 2
    else:
        return 3

# --- GLOBAL STATE ---
print('Loading study plans data...', end='')
user_datasets = pickle.load(open(STUDY_PLANS_FILE, 'rb'))
print(f' done ({len(user_datasets)} items loaded)')

print('Loading curated materials data...', end='')
additional_courses_data = pd.read_csv(CURATED_MATERIALS_FILE, sep='|', index_col=0)
additional_courses_data = (additional_courses_data['description'] + ' URL: ' + additional_courses_data['url']).to_list()
print(f' done ({len(additional_courses_data)} items)')

# Determine current phase
current_phase = setup_environment()
print(f'Current phase: {current_phase}')

# LLM agents for different users
user_agents = {}

# --- PYDANTIC MODELS ---
class ChatRequest(BaseModel):
    message: str
    user_id: str
    history: List[Dict] = []

class ChatResponse(BaseModel):
    response: str

class UpdateMilestonesRequest(BaseModel):
    user_id: str
    milestones: List[bool]

class AgentSettingsRequest(BaseModel):
    user_id: str
    system_prompt: str
    temperature: float
    use_plan_tool: bool
    use_search_tool: bool
    use_learningmaterial_tool: bool
    use_milestones_tool: bool

class UserDataResponse(BaseModel):
    username: str
    smart_plan_phase1: str
    smart_plan_phase2: str
    milestones: List[str]
    learning_state: Dict
    data: Dict

class LearningPlanStructuredResponse(BaseModel):
    title: str
    introduction: str
    sections: Dict
    ending: str


# --- TOOLS ---
def get_additional_materials_tool(user_id):
    """Creates and returns an additional materials tool for a specific user"""
    @tool
    def additional_materials_tool():
        """List of additional learning materials, such as videos, articles and courses, covering topics of teaching"""
        print(f'Obtaining learning materials for {user_id}')
        return additional_courses_data
    
    return additional_materials_tool

def get_phase1_plan_tool(user_id):
    """Creates and returns a phase 1 plan tool for a specific user"""
    @tool
    def phase1_plan_tool():
        """Contains the personalized smart learning plan created for the student"""
        print(f'Obtaining smart_plan_phase1 for {user_id}')
        return user_datasets[user_id]['smart_plan_phase1']
    
    return phase1_plan_tool

def get_phase2_plan_tool(user_id):
    """Creates and returns a phase 2 plan tool for a specific user"""
    @tool
    def phase2_plan_tool():
        """Contains the personalized smart learning plan created for the student"""
        print(f'Obtaining smart_plan_phase2 for {user_id}')
        return user_datasets[user_id]['smart_plan_phase2']
    
    return phase2_plan_tool

def get_milestones_tool(user_id):
    """Creates and returns a milestones tool for a specific user"""
    @tool
    def milestones_tool():
        """Contains the personalized milestones (max 10) created for the student"""
        print(f'Obtaining milestones for {user_id}')
        return user_datasets[user_id]['milestones']
    
    return milestones_tool

def initialize_search_tool():
    """Initializes the search tool"""
    return TavilySearchResults(
        max_results=5,
        search_depth="advanced",
        include_answer=True,
        include_raw_content=True,
        include_images=False
    )

# --- STATE MANAGEMENT ---
def load_user_state(user_id):
    """Loads the user's learning state"""
    user_dir = os.path.join('user_data', user_id)
    
    if not os.path.exists(user_dir):
        os.makedirs(user_dir, exist_ok=True)
        
    state_file = os.path.join(user_dir, 'state_variables.pickle')
    
    if os.path.exists(state_file):
        try:
            with open(state_file, 'rb') as f:
                return pickle.load(f)
        except Exception as e:
            print(f"Error loading user state: {e}")
            return None
    
    # Create default state
    if user_id in user_datasets and 'milestones' in user_datasets[user_id]:
        default_state = {
            'labels': user_datasets[user_id]['milestones'],
            'states': [False] * len(user_datasets[user_id]['milestones'])
        }
        save_user_state(user_id, default_state)
        return default_state
    
    return None

def save_user_state(user_id, state):
    """Saves the user's learning state"""
    user_dir = os.path.join('user_data', user_id)
    
    if not os.path.exists(user_dir):
        os.makedirs(user_dir, exist_ok=True)
        
    state_file = os.path.join(user_dir, 'state_variables.pickle')
    temp_file = os.path.join(user_dir, 'state_variables.temp.pickle')
    
    try:
        with open(temp_file, 'wb') as f:
            pickle.dump(state, f)
            f.flush()
            os.fsync(f.fileno())
        
        # Rename for atomic write
        if os.path.exists(state_file) and os.name == 'nt':
            os.remove(state_file)
            
        os.rename(temp_file, state_file)
        return True
    except Exception as e:
        print(f"Error saving user state: {e}")
        if os.path.exists(temp_file):
            try:
                os.remove(temp_file)
            except:
                pass
        return False

# --- LLM AGENT MANAGEMENT ---
def create_agent_for_user(user_id, settings=None):
    """Creates or updates an LLM agent for a specific user"""
    if user_id not in user_datasets:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")
    
    # Try to load settings from disk if not provided
    if settings is None:
        disk_settings = load_agent_settings(user_id)
        if disk_settings:
            settings = disk_settings
        else:
            # Initialize default settings if not provided and not found on disk
            settings = {
                'system_prompt': user_datasets[user_id]['assistant_prompt'].strip(),
                'temperature': 0.3,
                'use_plan_tool': True,
                'use_search_tool': True, 
                'use_learningmaterial_tool': True,
                'use_milestones_tool': True
            }
    
    # Initialize user_agents for this user if not existing
    if user_id not in user_agents:
        user_agents[user_id] = {
            'settings': settings,
            'memory': MemorySaver(),
            'config': {"configurable": {"thread_id": f"{user_id}-1"}},
            'agent_phase1': None,
            'agent_phase2': None
        }
    else:
        # Update existing settings
        user_agents[user_id]['settings'] = settings
    
    # Set agent tool lists
    phase1_tools = []
    phase2_tools = []
    
    if settings['use_search_tool']:
        search_tool = initialize_search_tool()
        phase1_tools.append(search_tool)
        phase2_tools.append(search_tool)
        
    if settings['use_plan_tool']:
        phase1_tools.append(get_phase1_plan_tool(user_id))
        phase2_tools.append(get_phase2_plan_tool(user_id))
        
    if settings['use_learningmaterial_tool']:
        phase1_tools.append(get_additional_materials_tool(user_id))
        phase2_tools.append(get_additional_materials_tool(user_id))
        
    if settings['use_milestones_tool']:
        phase1_tools.append(get_milestones_tool(user_id))
        phase2_tools.append(get_milestones_tool(user_id))
    
    # Create langchain agents
    model = ChatOpenAI(model=LLM_MODEL, temperature=settings['temperature'])
    
    user_agents[user_id]['agent_phase1'] = create_react_agent(
        model,
        tools=phase1_tools,
        prompt=settings['system_prompt'],
        checkpointer=user_agents[user_id]['memory']
    )
    
    user_agents[user_id]['agent_phase2'] = create_react_agent(
        model,
        tools=phase2_tools,
        prompt=settings['system_prompt'],
        checkpointer=user_agents[user_id]['memory']
    )
    
    return user_agents[user_id]

async def predict_for_user(user_id, message, history=None):
    """Gets a prediction for a specific user"""
    if history is None:
        history = []
    
    # Ensure user agent exists
    if user_id not in user_agents:
        create_agent_for_user(user_id)
    
    # Get appropriate agent based on phase
    agent = user_agents[user_id]['agent_phase1'] if current_phase == 1 else user_agents[user_id]['agent_phase2']
    
    # Invoke agent
    response = agent.invoke(
        {"messages": [{"role": "user", "content": message}]},
        user_agents[user_id]['config'],
        stream_mode="values",
    )
    
    return response["messages"][-1].content

async def stream_predict_for_user(user_id, message):
    """
    Streams a prediction for a specific user.
    
    IMPORTANT STREAMING NOTES:
    1. We encode the response as JSON to prevent conflicts between markdown
       formatting (especially lists) and SSE protocol which uses double newlines
       as event separators
    2. We send the FULL accumulated response each time, not just incremental updates
    3. We ensure proper SSE format with "data: " prefix and double newlines after each event
    4. We explicitly handle the [DONE] signal to notify the client the stream is complete
    
    This approach works reliably with markdown content including complex elements
    like numbered lists, bullet points, and code blocks.
    """
    
    # Ensure user agent exists
    if user_id not in user_agents:
        create_agent_for_user(user_id)
    
    # Get appropriate agent based on phase
    agent = user_agents[user_id]['agent_phase1'] if current_phase == 1 else user_agents[user_id]['agent_phase2']
    
    # Send an initial empty event to establish connection
    yield "data: \n\n"
    
    # Stream response
    full_response = ""
    
    async for msg, _ in agent.astream(
        {"messages": [{"role": "user", "content": message}]},
        user_agents[user_id]['config'],
        stream_mode="messages"
    ):
        if isinstance(msg, AIMessageChunk) or isinstance(msg, AIMessage):
            if hasattr(msg, 'content') and msg.content:
                full_response += msg.content
                # Use JSON to safely encode the message - this prevents newline issues
                import json
                yield f"data: {json.dumps(full_response)}\n\n"
        elif isinstance(msg, ToolMessage):
            tool_msg = f'\n[used tool "{msg.name}"]\n'
            full_response += tool_msg
            import json
            yield f"data: {json.dumps(full_response)}\n\n"
    
    # Signal completion
    yield "data: [DONE]\n\n"

# --- FASTAPI APP ---
app = FastAPI(title="UPBEAT Learning Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API ROUTES ---
    
@app.get("/")
async def root():
    """Main page showing basic information about the API"""
    return {
        "message": "UPBEAT Learning Assistant API", 
        "users": len(user_datasets),
        "current_phase": current_phase
    }

@app.get("/api/users")
async def get_users():
    """Gets a list of available users"""
    return {"users": list(user_datasets.keys())}

@app.get("/api/user/{user_id}")
async def get_user_data(user_id: str):
    """Gets user data for a specific user"""
    if user_id not in user_datasets:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")
    
    # Load learning state
    learning_state = load_user_state(user_id)
    if learning_state is None and 'milestones' in user_datasets[user_id]:
        learning_state = {
            'labels': user_datasets[user_id]['milestones'],
            'states': [False] * len(user_datasets[user_id]['milestones'])
        }
        save_user_state(user_id, learning_state)
    
    return {
        "username": user_id,
        "smart_plan_phase1": user_datasets[user_id]["smart_plan_phase1"],
        "smart_plan_phase2": user_datasets[user_id]["smart_plan_phase2"],
        "milestones": user_datasets[user_id]["milestones"],
        "learning_state": learning_state,
        "data": user_datasets[user_id].get("data", {})
    }

@app.get("/api/phase")
async def get_current_phase():
    """Gets the current phase (1=onboarding, 2=training)"""
    return {"phase": current_phase}

@app.get("/api/learning-plan/{user_id}/{phase}/structured")
async def get_structured_learning_plan(user_id: str, phase: int):
    """
    Returns the user's learning plan in a structured JSON format,
    which can be used in a tab-based view.
    """
    if user_id not in user_datasets:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")
    
    if phase not in [1, 2]:
        raise HTTPException(status_code=400, detail="Invalid phase. Must be 1 or 2.")
    
    # Get learning plan for user and phase
    plan_key = 'smart_plan_phase1' if phase == 1 else 'smart_plan_phase2'
    plan_text = user_datasets[user_id][plan_key]
    
    # Parse plan into structured format
    structured_plan = parse_learning_plan(plan_text)
    
    return structured_plan

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat with the assistant"""
    if request.user_id not in user_datasets:
        raise HTTPException(status_code=404, detail=f"User {request.user_id} not found")
    
    response = await predict_for_user(request.user_id, request.message, request.history)
    return ChatResponse(response=response)

@app.get("/api/chat/stream")
async def chat_stream(user_id: str, message: str):
    """Streams a conversation with the assistant"""
    if user_id not in user_datasets:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")
    
    return StreamingResponse(
        stream_predict_for_user(user_id, message),
        media_type="text/event-stream"
    )

@app.post("/api/update-milestones")
async def update_milestones(request: UpdateMilestonesRequest):
    """Updates the user's milestones"""
    if request.user_id not in user_datasets:
        raise HTTPException(status_code=404, detail=f"User {request.user_id} not found")
    
    # Load current state
    state = load_user_state(request.user_id)
    if state is None:
        state = {
            'labels': user_datasets[request.user_id]['milestones'],
            'states': [False] * len(user_datasets[request.user_id]['milestones'])
        }
    
    # Update states
    state['states'] = request.milestones
    
    # Save updated state
    success = save_user_state(request.user_id, state)
    return {"success": success}

def save_agent_settings(user_id, settings):
    """Saves agent settings to disk"""
    user_dir = os.path.join('user_data', user_id)
    
    if not os.path.exists(user_dir):
        os.makedirs(user_dir, exist_ok=True)
        
    settings_file = os.path.join(user_dir, 'agent_settings.pickle')
    temp_file = os.path.join(user_dir, 'agent_settings.temp.pickle')
    
    try:
        with open(temp_file, 'wb') as f:
            pickle.dump(settings, f)
            f.flush()
            os.fsync(f.fileno())
        
        # Rename for atomic write
        if os.path.exists(settings_file) and os.name == 'nt':
            os.remove(settings_file)
            
        os.rename(temp_file, settings_file)
        return True
    except Exception as e:
        print(f"Error saving agent settings: {e}")
        if os.path.exists(temp_file):
            try:
                os.remove(temp_file)
            except:
                pass
        return False

def load_agent_settings(user_id):
    """Loads agent settings from disk"""
    user_dir = os.path.join('user_data', user_id)
    settings_file = os.path.join(user_dir, 'agent_settings.pickle')
    
    if os.path.exists(settings_file):
        try:
            with open(settings_file, 'rb') as f:
                return pickle.load(f)
        except Exception as e:
            print(f"Error loading agent settings: {e}")
    
    return None
   
@app.post("/api/update-agent-settings")
async def update_agent_settings(request: AgentSettingsRequest):
    """Updates agent settings for a user"""
    if request.user_id not in user_datasets:
        raise HTTPException(status_code=404, detail=f"User {request.user_id} not found")
    
    # Create settings dictionary
    settings = {
        'system_prompt': request.system_prompt,
        'temperature': request.temperature,
        'use_plan_tool': request.use_plan_tool,
        'use_search_tool': request.use_search_tool,
        'use_learningmaterial_tool': request.use_learningmaterial_tool,
        'use_milestones_tool': request.use_milestones_tool
    }
    success = save_agent_settings(request.user_id, settings)
    # Update agent
    create_agent_for_user(request.user_id, settings)
    
    return {"success": success}

@app.get("/api/reset-agent-settings")
async def reset_agent_settings(user_id: str, reset: bool = False):
    """Resets agent settings to defaults for a user if reset=True, otherwise returns current settings"""
    if user_id not in user_datasets:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")
    
    if reset:
        # If reset=True, use default settings
        default_settings = {
            'system_prompt': user_datasets[user_id]['assistant_prompt'].strip(),
            'temperature': 0.3,
            'use_plan_tool': True,
            'use_search_tool': True, 
            'use_learningmaterial_tool': True,
            'use_milestones_tool': True
        }
        
        # Update agent with default settings
        create_agent_for_user(user_id, default_settings)
        
        # Save default settings to disk
        save_agent_settings(user_id, default_settings)
        
        # Return default settings
        return {
            "success": True,
            "settings": default_settings
        }
    else:
        # First try to load settings from disk
        disk_settings = load_agent_settings(user_id)
        
        if disk_settings:
            # Use settings from disk if available
            if user_id not in user_agents:
                create_agent_for_user(user_id, disk_settings)
            return {
                "success": True,
                "settings": disk_settings
            }
        else:
            # If no settings on disk, create with default settings
            create_agent_for_user(user_id)
            return {
                "success": True,
                "settings": user_agents[user_id]['settings']
            }

@app.get("/api/download-pdf/{user_id}/{phase}")
async def download_pdf(user_id: str, phase: int, background_tasks: BackgroundTasks):
    """Downloads a PDF for a user"""
    if user_id not in user_datasets:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")
    
    if phase not in [1, 2]:
        raise HTTPException(status_code=400, detail="Invalid phase. Must be 1 or 2.")
    
    # Determine which PDF to return
    file_name = "UPBEAT_onboarding_plan.pdf" if phase == 1 else "UPBEAT_training_plan.pdf"
    temp_dir = tempfile.gettempdir()
    file_path = os.path.join(temp_dir, f"{user_id}_{file_name}")
    
    # Write PDF data to temporary file
    pdf_data_key = 'smart_plan_pdf_phase1' if phase == 1 else 'smart_plan_pdf_phase2'
    with open(file_path, 'wb') as pdf_file:
        pdf_file.write(user_datasets[user_id][pdf_data_key])
    
    # Schedule cleanup after response is sent
    background_tasks.add_task(lambda: os.remove(file_path) if os.path.exists(file_path) else None)
    
    return FileResponse(
        path=file_path,
        filename=file_name,
        media_type="application/pdf",
        background=background_tasks
    )

# --- MAIN EXECUTION ---
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)