// lib/api.ts - Single API file for both client and server
import { StructuredLearningPlan, UserData } from "../types";
import { API_URL } from "./config";

/**
 * Fetches a list of all users with NO caching to ensure fresh data
 */
export async function getUsers(): Promise<string[]> {
  console.log("api url:", API_URL);

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
 * Updates user milestones
 */
export async function updateMilestones(
  userId: string,
  milestones: boolean[]
): Promise<{ success: boolean }> {
  const response = await fetch(`${API_URL}/api/update-milestones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, milestones }),
  });

  if (!response.ok) throw new Error("Failed to update milestones");
  return await response.json();
}

/**
 * Downloads PDF file
 */
export async function downloadPdf(
  userId: string,
  phase: number
): Promise<void> {
  const url = `${API_URL}/api/download-pdf/${userId}/${phase}`;

  try {
    // Create a hidden anchor element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `learning_plan_phase${phase}.pdf`);
    link.setAttribute("target", "_self");

    // Add to document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
}
