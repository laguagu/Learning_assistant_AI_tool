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
