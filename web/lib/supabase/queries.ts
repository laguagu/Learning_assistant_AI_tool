import { createClient } from "@/lib/supabase/client";

/**
 * Mark a module as complete for a user
 */
export async function markModuleAsComplete(userId: string, moduleId: string) {
  try {
    const supabase = await createClient();

    const { error } = await supabase.from("module_progress").insert({
      user_id: userId,
      module_id: moduleId,
    });

    // Ignore unique constraint violations (already marked as complete)
    if (error && error.code !== "23505") {
      console.error("Error saving module progress:", error);
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error("Failed to save module completion:", err);
    return { success: false, error: err };
  }
}

/**
 * Mark a module as uncomplete for a user (remove completion status)
 */
export async function markModuleAsUncomplete(userId: string, moduleId: string) {
  try {
    // Add await here
    const supabase = await createClient();

    const { error } = await supabase.from("module_progress").delete().match({
      user_id: userId,
      module_id: moduleId,
    });

    if (error) {
      console.error("Error removing module progress:", error);
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error("Failed to remove module completion:", err);
    return { success: false, error: err };
  }
}

/**
 * Get user's completed modules
 */
export async function getCompletedModules(userId: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("module_progress")
      .select("module_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching module progress:", error);
      return { completedModules: [], error };
    }

    return {
      completedModules: data?.map((item) => item.module_id) || [],
      error: null,
    };
  } catch (err) {
    console.error("Failed to fetch completed modules:", err);
    return { completedModules: [], error: err };
  }
}

/**
 * Get current user from Supabase Auth
 */
export async function getCurrentUser() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error getting user:", error);
      return { user: null, error };
    }

    return { user, error: null };
  } catch (err) {
    console.error("Failed to get current user:", err);
    return { user: null, error: err };
  }
}
