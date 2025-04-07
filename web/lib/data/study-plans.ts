// Moduulien sisältödata käyttäjäkohtaisesti

// Sisältötyypit
export interface ModuleContent {
  title: string;
  description: string;
  content: string;
}

export interface StudyPlan {
  id_username: string;
  modules: {
    module1: ModuleContent;
    module2: ModuleContent;
    module3: ModuleContent;
    module4: ModuleContent;
  };
}

// Kovakoodattu sisältödata
export const studyPlans: StudyPlan[] = [
  {
    id_username: "anil.tampere@example.com",
    modules: {
      module1: {
        title: "Understanding AI basics",
        description:
          "Learn fundamental technologies and ecosystems of AI and their relevance to business.",
        content: `# AI Fundamentals for Business
  
  ## Core Concepts
  - Artificial Intelligence: systems designed to mimic human intelligence
  - Machine Learning: AI systems that learn from data
  - Natural Language Processing: AI understanding human language
  - Computer Vision: AI interpreting visual information
  
  ## Business Applications
  - Customer service automation
  - Data analysis and insights
  - Process optimization
  - Predictive analytics
  
  ## Key Technologies
  - Large Language Models (LLMs)
  - Neural Networks
  - Cloud AI Services
  - AI Development Platforms`,
      },
      module2: {
        title: "AI for Business Planning",
        description:
          "Using AI tools to clarify business ideas, perform market analysis, and create customer personas.",
        content: `# Business Planning with AI
  
  ## Market Analysis
  - Using AI to identify market trends
  - Competitor analysis automation
  - Target audience identification
  
  ## Business Model Development
  - AI-assisted value proposition design
  - Revenue model optimization
  - Resource allocation planning
  
  ## Strategic Planning
  - AI-driven SWOT analysis
  - Risk assessment automation
  - Scenario planning with predictive models`,
      },
      module3: {
        title: "Business Prompting Workshop",
        description:
          "Apply structured prompts for business impact and learn to assess AI tools.",
        content: `# Effective Business Prompting
  
  ## Prompt Structure
  - Clear objective statements
  - Context provision
  - Format specification
  - Examples inclusion
  
  ## Prompt Types for Business
  - Analysis prompts
  - Creative generation prompts
  - Decision-making frameworks
  - Data interpretation prompts
  
  ## Evaluation Techniques
  - Output quality assessment
  - Iteration methodology
  - Bias detection
  - Practical application testing`,
      },
      module4: {
        title: "AI for Business Success",
        description:
          "Use AI tools for strategic marketing and customer engagement.",
        content: `# AI for Business Growth
  
  ## Marketing Strategies
  - AI-driven content creation
  - Personalized marketing campaigns
  - Customer segmentation
  - Performance analytics
  
  ## Customer Engagement
  - AI chatbots and virtual assistants
  - Personalized recommendations
  - Customer journey optimization
  - Feedback analysis and implementation`,
      },
    },
  },
  {
    id_username: "default",
    modules: {
      module1: {
        title: "Understanding AI basics",
        description:
          "Learn fundamental technologies and ecosystems of AI and their relevance to business.",
        content: `# Introduction to AI for Business
  
  This module covers the essential foundations of AI technology and how it applies to business contexts.
  
  ## Key Topics
  - What is artificial intelligence?
  - Types of AI systems relevant to business
  - AI vs. traditional software approaches
  - Current state of AI capabilities`,
      },
      module2: {
        title: "AI for Business Planning",
        description:
          "Using AI tools to clarify business ideas, perform market analysis, and create customer personas.",
        content: `# Business Planning Fundamentals
  
  This module explores how AI tools can enhance the business planning process from ideation to execution.
  
  ## Key Topics
  - Market analysis with AI
  - Business model canvas development
  - Customer persona creation
  - Value proposition design`,
      },
      module3: {
        title: "Business Prompting Workshop",
        description:
          "Apply structured prompts for business impact and learn to assess AI tools.",
        content: `# Business Prompting Essentials
  
  This module teaches you how to effectively craft prompts for AI systems to achieve business objectives.
  
  ## Key Topics
  - Prompt engineering basics
  - Structure of effective business prompts
  - Common prompt patterns for business use cases
  - Testing and refining prompts`,
      },
      module4: {
        title: "AI for Business Success",
        description:
          "Use AI tools for strategic marketing and customer engagement.",
        content: `# Business Growth with AI
  
  This module focuses on leveraging AI for marketing, customer engagement, and business expansion.
  
  ## Key Topics
  - AI-driven marketing strategies
  - Customer engagement automation
  - Business analytics and insights
  - Scaling with AI tools`,
      },
    },
  },
];

/**
 * Hae moduulisisältö sähköpostiosoitteen ja moduuliID:n perusteella
 */
export function getModuleContent(
  email: string,
  moduleId: string
): ModuleContent {
  // Etsi käyttäjän opiskelusuunnitelma
  const userPlan =
    studyPlans.find((plan) => plan.id_username === email) ||
    studyPlans.find((plan) => plan.id_username === "default");

  // Tarkista että moduleId on kelvollinen
  const validModuleId = ["module1", "module2", "module3", "module4"].includes(
    moduleId
  )
    ? (moduleId as keyof StudyPlan["modules"])
    : ("module1" as keyof StudyPlan["modules"]);

  // Palauta moduulisisältö
  return userPlan!.modules[validModuleId];
}
