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
