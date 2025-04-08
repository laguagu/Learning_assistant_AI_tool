"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Validation schema
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export async function loginUser(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  try {
    const validatedFields = LoginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    });

    if (error) {
      return {
        message:
          error.message === "Invalid login credentials"
            ? "Invalid email or password"
            : "Login failed. Please try again.",
      };
    }

    // Check if we got a session
    if (!data.session) {
      return {
        message: "Login failed. No session.",
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      message: "Server error. Please try again later.",
    };
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function logoutUser() {
    try {
      const supabase = await createClient()
      
      // Sign out the user
      await supabase.auth.signOut();
      
      // Revalidate all paths
      revalidatePath("/", "layout");
      
      // Redirect to login page
      redirect("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, try to redirect to login
      redirect("/login");
    }
  }