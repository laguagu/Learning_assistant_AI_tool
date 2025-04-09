// app/api/modules/progress/route.ts
import { isModuleEnabled } from "@/lib/features";
import { NextRequest, NextResponse } from "next/server";

// Since we're keeping this simple without a database,
// we'll use a in-memory store simulating a database
const moduleProgress = new Map<string, string[]>();

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId parameter" },
        { status: 400 },
      );
    }

    // Get the user's progress from our in-memory store
    const completedModules = moduleProgress.get(userId) || [];

    return NextResponse.json({
      completed: completedModules,
    });
  } catch (error) {
    console.error("Error fetching module progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch module progress" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, moduleId } = await request.json();

    if (!userId || !moduleId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Verify module is enabled
    const moduleNumber = parseInt(moduleId.replace("module", ""));
    if (!isModuleEnabled(moduleNumber)) {
      return NextResponse.json(
        { error: "Module not enabled" },
        { status: 403 },
      );
    }

    // Get existing progress or initialize empty array
    let completedModules = moduleProgress.get(userId) || [];

    // Add moduleId if not already in the list
    if (!completedModules.includes(moduleId)) {
      completedModules = [...completedModules, moduleId];
      moduleProgress.set(userId, completedModules);
    }

    return NextResponse.json({
      success: true,
      completed: completedModules,
    });
  } catch (error) {
    console.error("Error updating module progress:", error);
    return NextResponse.json(
      { error: "Failed to update module progress" },
      { status: 500 },
    );
  }
}
