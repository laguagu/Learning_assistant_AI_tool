import { ModuleContentItem } from "@/components/module-content-accordion";
import { createClient } from "@/lib/supabase/client";

const defaultModuleContent: Record<string, ModuleContentItem> = {
  module1: {
    title: "Understanding AI basics",
    description:
      "Learn fundamental technologies and ecosystems of AI and their relevance to business.",
    content: "# Loading content...\n\nPlease wait while we load the module content.",
  },
  module2: {
    title: "AI for Business Planning",
    description:
      "Using AI tools to clarify business ideas, perform market analysis, and create customer personas.",
    content: "# Loading content...\n\nPlease wait while we load the module content.",
  },
  module3: {
    title: "Business Prompting Workshop",
    description:
      "Apply structured prompts for business impact and learn to assess AI tools.",
    content: "# Loading content...\n\nPlease wait while we load the module content.",
  },
  module4: {
    title: "AI for Business Success",
    description:
      "Use AI tools for strategic marketing and customer engagement.",
    content: "# Loading content...\n\nPlease wait while we load the module content.",
  },
};

export async function getModuleContent(moduleId: string, userId?: string): Promise<ModuleContentItem> {
  // Return default content if no user ID
  if (!userId) {
    return defaultModuleContent[moduleId] || defaultModuleContent.module1;
  }

  try {
    // Try to fetch personalized module content based on user
    const supabase = createClient();
    
    // Get user data including core module content
    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('id', userId)
      .single();
    
    if (error || !data) {
      console.error("Error fetching user data:", error);
      return defaultModuleContent[moduleId] || defaultModuleContent.module1;
    }
    
    // Get study plan data for the user's email
    const { data: planData, error: planError } = await supabase
      .from('study_plans')
      .select('*')
      .eq('id_username', data.email)
      .single();
    
    if (planError || !planData) {
      console.error("Error fetching study plan:", planError);
      return defaultModuleContent[moduleId] || defaultModuleContent.module1;
    }
    
    // Map module_id to the corresponding content in planData
    const contentMap: Record<string, string> = {
      module1: planData.smart_plan_phase1 || "",
      module2: planData.smart_plan_phase2 || "",
      module3: planData.assistant_prompt || "",
      module4: "", // This would need to be added to your database if available
    };
    
    return {
      ...defaultModuleContent[moduleId],
      content: contentMap[moduleId] || defaultModuleContent[moduleId].content,
    };
  } catch (error) {
    console.error("Error in getModuleContent:", error);
    return defaultModuleContent[moduleId] || defaultModuleContent.module1;
  }
}

// Check if the module is enabled for the user
export function isModuleEnabled(moduleNumber: number): boolean {
  // For simplicity, enable all modules for now
  // In a real implementation, this might check against user progress or other conditions
  return moduleNumber >= 1 && moduleNumber <= 4;
}

// Mark module as complete
export async function markModuleAsComplete(userId: string, moduleId: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({ 
        user_id: userId, 
        module_id: moduleId,
        completed_at: new Date().toISOString(),
      });

    if (error) {
      console.error("Error marking module as complete:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in markModuleAsComplete:", error);
    return { success: false, error };
  }
}
