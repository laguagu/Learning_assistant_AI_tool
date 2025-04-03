// app/actions.ts
"use server";

import { API_URL } from "@/lib/api/config";
import { revalidatePath } from "next/cache";

/**
 * Server action to update milestones
 */
export async function updateMilestonesAction(
  userId: string,
  milestones: boolean[]
) {
  try {
    const response = await fetch(`${API_URL}/api/update-milestones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, milestones }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update milestones: ${response.status}`);
    }

    const result = await response.json();

    // Revalidate the user's page to update any cached data
    revalidatePath(`/users/${userId}`);

    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating milestones:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Server action to download PDF
 * This works in both local and Rahti environments
 */
export async function downloadPdfAction(userId: string, phase: number) {
  try {
    console.log(`Downloading PDF for user ${userId}, phase ${phase} using server action`);
    
    // Use API_URL from config to ensure it's correct for the environment
    const response = await fetch(`${API_URL}/api/download-pdf/${userId}/${phase}`, {
      method: "GET",
      // No cache to ensure we get the latest PDF
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to download PDF: ${response.status}`);
    }

    // Get the PDF data as array buffer
    const pdfData = await response.arrayBuffer();
    
    // Determine filename based on phase
    const phaseFileName = phase === 1 ? "UPBEAT_onboarding_plan" : "UPBEAT_training_plan";
    const filename = `${phaseFileName}.pdf`;
    
    console.log(`Phase ${phase}, generating file: ${filename}`);
    
    // Return the PDF data and filename for the client to use
    return { 
      success: true, 
      data: pdfData,
      filename: filename,
      contentType: "application/pdf"
    };
  } catch (error) {
    console.error("Error downloading PDF:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Server action to stream chat messages
 * This handles the streaming in the server environment, avoiding client-side URL issues
 */
export async function streamChatAction(userId: string, message: string) {
  try {
    console.log(`Streaming chat for user ${userId} using server action`);
    
    // Use correct API URL from config - this works for all environments
    const baseUrl = `${API_URL}/api/chat/stream`;
    
    // Build the URL string with proper encoding
    // Note: We're avoiding the URL constructor which causes issues in Rahti
    const url = `${baseUrl}?user_id=${encodeURIComponent(userId)}&message=${encodeURIComponent(message)}`;
    
    console.log(`Requesting from: ${url}`);
    
    // Use regular fetch with streaming
    const response = await fetch(url, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      console.error(`Stream request failed: ${response.status}`);
      throw new Error(`Stream request failed: ${response.status}`);
    }
    
    // Get the full response text (for server action we need to capture the entire response)
    const fullText = await response.text();
    
    // Process the SSE response
    const events = fullText.split(/\r?\n\r?\n/);
    const chunks: string[] = [];
    
    for (const event of events) {
      if (event.startsWith("data: ")) {
        const data = event.slice(6); // Remove "data: " prefix
        
        if (data === "[DONE]") {
          break;
        }
        
        try {
          // Parse JSON data if possible (the backend sends JSON-encoded strings)
          const parsedData = JSON.parse(data);
          chunks.push(parsedData);
        } catch {
          // If not valid JSON but not empty, add as is
          if (data.trim()) {
            chunks.push(data);
          }
        }
      }
    }
    
    // Return all received chunks
    return {
      success: true,
      chunks: chunks,
    };
  } catch (error) {
    console.error("Chat stream error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Server action to load agent settings
 */
export async function loadAgentSettingsAction(userId: string, reset: boolean = false) {
  try {
    console.log(`Loading agent settings for user ${userId}, reset=${reset}`);
    
    // Use API_URL from config for consistent environment support
    const url = `${API_URL}/api/reset-agent-settings?user_id=${encodeURIComponent(userId)}&reset=${reset}`;
    
    console.log(`Fetching from: ${url}`);
    
    const response = await fetch(url, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      throw new Error(`Failed to load settings: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      settings: data.settings,
    };
  } catch (error) {
    console.error("Error loading agent settings:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Server action to update agent settings
 */
export async function updateAgentSettingsAction(
  userId: string, 
  settings: {
    system_prompt: string;
    temperature: number;
    use_plan_tool: boolean;
    use_search_tool: boolean;
    use_learningmaterial_tool: boolean;
    use_milestones_tool: boolean;
  }
) {
  try {
    console.log(`Updating agent settings for user ${userId}`);
    
    const response = await fetch(`${API_URL}/api/update-agent-settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        ...settings,
      }),
      cache: "no-store",
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update settings: ${response.status}`);
    }
    
    const result = await response.json();
    
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error updating agent settings:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
