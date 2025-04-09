export interface Topic {
  number: string;
  title: string;
  description: string;
}

export interface Material {
  number: string;
  description: string;
  url: string | null;
}

export interface Assignment {
  title: string;
  task?: string;
  process?: string;
  tools?: string;
  sample_prompt?: string;
}

export interface LearningPlanSection {
  number: string;
  title: string;
  content: string;
  topics?: Topic[];
  objectives?: Record<string, string[]>;
  assignments?: Assignment[];
  materials?: Material[];
}

export interface StructuredLearningPlan {
  title: string;
  introduction: string;
  sections: Record<string, LearningPlanSection>;
  ending: string;
}

export interface UserData {
  username: string;
  smart_plan_phase1: string;
  smart_plan_phase2: string;
  milestones: string[];
  learning_state: {
    labels: string[];
    states: boolean[];
  };
  data: Record<string, unknown>;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  response: string;
}

export interface SavedChat {
  id: string;
  name: string;
  timestamp: number;
  messages: ChatMessage[];
}

export interface ChatControlMethods {
  resetChat: () => void;
}

export interface ChatProps {
  userId: string;
  onReady?: (methods: ChatControlMethods) => void;
}

export interface AgentSettings {
  system_prompt: string;
  temperature: number;
  use_plan_tool: boolean;
  use_search_tool: boolean;
  use_learningmaterial_tool: boolean;
  use_milestones_tool: boolean;
}
