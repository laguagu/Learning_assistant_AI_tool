"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { isModuleEnabled } from "@/lib/features";
import { createClient } from "@/lib/supabase/client";
import {
  markModuleAsComplete,
  markModuleAsUncomplete,
} from "@/lib/supabase/queries";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  Lock,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useSWR from "swr";

interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  enabled: boolean;
  completed: boolean;
  dueDate?: string; // Optional due date
}

interface ModuleSectionProps {
  userId: string;
  userEmail?: string; // Optional: if provided, will be used for routing
}

// Fetcher function for SWR
const fetchCompletedModules = async (userId: string) => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("module_progress")
      .select("module_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching from Supabase:", error);
      return [];
    }

    return data ? data.map((item) => item.module_id) : [];
  } catch (error) {
    console.error("Failed to fetch modules:", error);
    return [];
  }
};

export function ModuleSection({ userId, userEmail }: ModuleSectionProps) {
  const router = useRouter();
  // If userEmail is not provided, use a default value
  const email = userEmail || "anil.tampere@example.com";
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);

  // Use SWR for data fetching with automatic revalidation
  const {
    data: completedModules,
    error,
    mutate,
  } = useSWR(`completed-modules-${userId}`, () =>
    fetchCompletedModules(userId)
  );

  const loading = (!completedModules && !error) || !!isSubmitting;

  // Function to mark a module as complete via Supabase
  const completeModule = async (moduleId: string) => {
    try {
      setIsSubmitting(moduleId);
      const { success, error } = await markModuleAsComplete(userId, moduleId);

      if (!success) {
        console.error("Error saving module progress:", error);
        throw error;
      }

      // Revalidate data
      await mutate(
        // Optimistically update the local data
        completedModules ? [...completedModules, moduleId] : [moduleId],
        {
          revalidate: true, // Force revalidation from the server
        }
      );

      toast.success("Module marked as complete!");
    } catch (error) {
      console.error("Failed to mark module as complete:", error);
      toast.error("Failed to update progress");
    } finally {
      setIsSubmitting(null);
    }
  };

  // Function to mark a module as uncomplete via Supabase
  const uncompleteModule = async (moduleId: string) => {
    try {
      setIsSubmitting(moduleId);
      const { success, error } = await markModuleAsUncomplete(userId, moduleId);

      if (!success) {
        console.error("Error removing module progress:", error);
        throw error;
      }

      // Optimistically update the local data and force a revalidation
      await mutate(completedModules?.filter((id) => id !== moduleId) || [], {
        revalidate: true, // Force revalidation from the server
      });

      toast.success("Module marked as incomplete!");
    } catch (error) {
      console.error("Failed to update module status:", error);
      toast.error("Failed to update progress");
    } finally {
      setIsSubmitting(null);
    }
  };

  const handleModuleClick = (module: Module) => {
    if (!module.enabled) {
      toast.error(`Module ${module.number} is not yet available`);
      return;
    }

    // Updated route to use the new URL structure with user email
    router.push(`/users/${encodeURIComponent(email)}/modules/${module.id}`);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="opacity-70 mb-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-6 w-52" />
            <Skeleton className="h-8 w-28" />
          </CardHeader>
        </Card>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="opacity-70">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-6 w-52" />
              <Skeleton className="h-8 w-28" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Define the modules with their completion status
  const modules: Module[] = [
    {
      id: "module1",
      number: 1,
      title: "Understanding AI basics",
      description:
        "Learn fundamental technologies and ecosystems of AI and their relevance to business.",
      enabled: isModuleEnabled(1),
      completed: completedModules?.includes("module1") || false,
      dueDate: "April 14, 2025",
    },
    {
      id: "module2",
      number: 2,
      title: "AI for Business Planning",
      description:
        "Using AI tools to clarify business ideas, perform market analysis, and create customer personas.",
      enabled: isModuleEnabled(2),
      completed: completedModules?.includes("module2") || false,
      dueDate: "April 21, 2025",
    },
    {
      id: "module3",
      number: 3,
      title: "Business Prompting Workshop",
      description:
        "Apply structured prompts for business impact and learn to assess AI tools.",
      enabled: isModuleEnabled(3),
      completed: completedModules?.includes("module3") || false,
      dueDate: "April 28, 2025",
    },
    {
      id: "module4",
      number: 4,
      title: "AI for Business Success",
      description:
        "Use AI tools for strategic marketing and customer engagement.",
      enabled: isModuleEnabled(4),
      completed: completedModules?.includes("module4") || false,
      dueDate: "May 5, 2025",
    },
    {
      id: "module5",
      number: 5,
      title: "AI Hackathon Challenge",
      description:
        "Apply your AI skills in a collaborative hackathon to solve real business challenges and showcase your solutions.",
      enabled: isModuleEnabled(5),
      completed: completedModules?.includes("module5") || false,
      dueDate: "May 12, 2025",
    },
  ];

  // Calculate completed modules
  const completedCount = modules.filter((m) => m.completed).length;
  const totalEnabledCount = modules.filter((m) => m.enabled).length;
  const progressPercentage = totalEnabledCount
    ? Math.round((completedCount / totalEnabledCount) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <Card className="mb-2">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-2xl font-bold">Learning Modules</CardTitle>
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-md">
            <span className="text-sm font-medium">Progress:</span>
            <span className="text-lg font-bold">{progressPercentage}%</span>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {modules.map((module) => (
          <Card
            key={module.id}
            className={`transition-all ${
              !module.enabled ? "opacity-70" : ""
            } hover:shadow-md ${
              isSubmitting === module.id ? "opacity-70 pointer-events-none" : ""
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Badge
                  variant={module.enabled ? "default" : "outline"}
                  className="text-xs w-fit"
                >
                  Module {module.number}
                </Badge>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  {module.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : module.enabled ? (
                    <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                  {module.title}
                </CardTitle>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                {module.dueDate && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Available: {module.dueDate}</span>
                  </div>
                )}
                <Button
                  variant={
                    module.completed
                      ? "outline"
                      : module.enabled
                      ? "default"
                      : "secondary"
                  }
                  size="sm"
                  disabled={!module.enabled}
                  onClick={() => handleModuleClick(module)}
                  className={
                    module.completed
                      ? "bg-green-50 border-green-200 text-green-700 hover:text-green-800 hover:bg-green-100"
                      : ""
                  }
                >
                  {module.completed ? (
                    "Review"
                  ) : module.enabled ? (
                    <span className="flex items-center gap-1">
                      Start <ArrowRight className="h-4 w-4" />
                    </span>
                  ) : (
                    "Coming Soon"
                  )}
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">{module.description}</p>

              {module.completed ? (
                <div className="mt-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-900/30">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-green-700 dark:text-green-400">
                      You&apos;ve successfully completed this module!
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => uncompleteModule(module.id)}
                      className="text-green-700 hover:text-green-800 hover:bg-green-100 border  dark:text-green-400 dark:hover:bg-green-900/40"
                      disabled={isSubmitting === module.id}
                    >
                      {isSubmitting === module.id ? (
                        <RefreshCw className="h-3.5 w-3.5 mr-1 animate-spin" />
                      ) : (
                        <RefreshCw className="h-3.5 w-3.5 mr-1" />
                      )}
                      Mark as incomplete
                    </Button>
                  </div>
                </div>
              ) : (
                module.enabled && (
                  <div className="mt-2 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => completeModule(module.id)}
                      disabled={isSubmitting === module.id}
                    >
                      {isSubmitting === module.id ? (
                        <span className="flex items-center gap-1">
                          <RefreshCw className="h-3.5 w-3.5 mr-1 animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        "Mark as complete"
                      )}
                    </Button>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
