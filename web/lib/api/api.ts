// lib/api.ts - Single API file for both client and server
import { downloadPdfAction } from "@/app/actions";
import { StructuredLearningPlan, UserData } from "../types";
import { API_URL } from "./config";

/**
 * Fetches a list of all users with NO caching to ensure fresh data
 */
export async function getUsers(): Promise<string[]> {

  try {
    // Force dynamic fetching with no caching
    const response = await fetch(`${API_URL}/api/users`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Failed to fetch users: ${response.status}`);
      throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

/**
 * Fetches current phase (1 = onboarding, 2 = training)
 */
export async function getCurrentPhase(): Promise<number> {
  const response = await fetch(`${API_URL}/api/phase`, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(`Failed to fetch current phase: ${response.status}`);
    throw new Error(`Failed to fetch current phase: ${response.status}`);
  }

  const data = await response.json();
  return data.phase;
}

/**
 * Fetches user data (works on both client and server)
 */
export async function getUserData(userId: string): Promise<UserData> {
  const response = await fetch(`${API_URL}/api/user/${userId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(`Failed to fetch user data: ${response.status}`);
    throw new Error(`Failed to fetch user data for ${userId}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Fetches structured plan or falls back to raw plan (works on both client and server)
 */
export async function getStructuredLearningPlan(
  userId: string,
  phase: number
): Promise<StructuredLearningPlan | string> {
  try {
    const response = await fetch(
      `${API_URL}/api/learning-plan/${userId}/${phase}/structured`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      // Fallback to raw plan
      console.log("Falling back to raw plan");
      const userData = await getUserData(userId);
      return phase === 1
        ? userData.smart_plan_phase1
        : userData.smart_plan_phase2;
    }

    return await response.json();
  } catch (error) {
    // Fallback to raw plan
    console.log("Falling back to raw plan after error:", error);
    const userData = await getUserData(userId);
    return phase === 1
      ? userData.smart_plan_phase1
      : userData.smart_plan_phase2;
  }
}

/**
 * Downloads PDF file using server action
 */
export async function downloadPdf(
  userId: string,
  phase: number
): Promise<void> {
  try {
    console.log("Downloading PDF using server action for", userId, "phase", phase);
    
    // Use server action to download PDF - works in all environments
    const result = await downloadPdfAction(userId, phase);
    
    if (!result.success) {
      console.error("Failed to download PDF:", result.error);
      throw new Error(result.error);
    }
    
    // Create a blob from the PDF data
    if (!result.data) {
      throw new Error("PDF data is missing");
    }
    const pdfBlob = new Blob([result.data], { type: result.contentType });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(pdfBlob);
    
    // Create a link to download the PDF
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", result.filename);
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
}
