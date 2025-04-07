// components/module-section.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { isModuleEnabled } from "@/lib/features";
import { ArrowRight, BookOpen, Calendar, CheckCircle, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

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
}

export function ModuleSection({ userId }: ModuleSectionProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchModules() {
      try {
        // Fetch user's progress from the database
        const response = await fetch(`/api/modules/progress?userId=${encodeURIComponent(userId)}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch module progress");
        }
        
        const progressData = await response.json();
        
        // Construct the modules list with enabled/disabled status
        const modulesList: Module[] = [
          {
            id: "module1",
            number: 1,
            title: "Understanding AI basics",
            description: "Learn fundamental technologies and ecosystems of AI and their relevance to business.",
            enabled: isModuleEnabled(1),
            completed: progressData.completed?.includes("module1") || false,
            dueDate: "April 14, 2025"
          },
          {
            id: "module2",
            number: 2,
            title: "AI for Business Planning",
            description: "Using AI tools to clarify business ideas, perform market analysis, and create customer personas.",
            enabled: isModuleEnabled(2),
            completed: progressData.completed?.includes("module2") || false,
            dueDate: "April 21, 2025"
          },
          {
            id: "module3",
            number: 3,
            title: "Business Prompting Workshop",
            description: "Apply structured prompts for business impact and learn to assess AI tools.",
            enabled: isModuleEnabled(3),
            completed: progressData.completed?.includes("module3") || false,
            dueDate: "April 28, 2025"
          },
          {
            id: "module4",
            number: 4,
            title: "AI for Business Success",
            description: "Use AI tools for strategic marketing and customer engagement.",
            enabled: isModuleEnabled(4),
            completed: progressData.completed?.includes("module4") || false,
            dueDate: "May 5, 2025"
          },
        ];
        
        setModules(modulesList);
      } catch (error) {
        console.error("Failed to fetch modules:", error);
        toast.error("Failed to load modules");
      } finally {
        setLoading(false);
      }
    }
    
    fetchModules();
  }, [userId]);

  const handleModuleClick = (module: Module) => {
    if (!module.enabled) {
      toast.error(`Module ${module.number} is not yet available`);
      return;
    }
    
    router.push(`/modules/${module.id}`);
  };

  if (loading) {
    return (
      <div className="space-y-4">
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

  // Calculate completed modules
  const completedCount = modules.filter(m => m.completed).length;
  const totalEnabledCount = modules.filter(m => m.enabled).length;
  const progressPercentage = totalEnabledCount ? Math.round((completedCount / totalEnabledCount) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Learning Modules</h2>
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
      </div>
      
      <div className="grid gap-4">
        {modules.map((module) => (
          <Card 
            key={module.id}
            className={`transition-all ${
              !module.enabled ? "opacity-70" : ""
            } hover:shadow-md`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Badge variant={module.enabled ? "default" : "outline"} className="text-xs w-fit">
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
                    <span>Due: {module.dueDate}</span>
                  </div>
                )}
                <Button
                  variant={module.completed ? "outline" : module.enabled ? "default" : "secondary"}
                  size="sm"
                  disabled={!module.enabled}
                  onClick={() => handleModuleClick(module)}
                  className={module.completed ? "bg-green-50 border-green-200 text-green-700 hover:text-green-800 hover:bg-green-100" : ""}
                >
                  {module.completed ? (
                    "Review"
                  ) : module.enabled ? (
                    <span className="flex items-center gap-1">Start <ArrowRight className="h-4 w-4" /></span>
                  ) : (
                    "Coming Soon"
                  )}
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground">{module.description}</p>
              
              {module.completed && (
                <div className="mt-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-900/30">
                  <p className="text-sm text-green-700 dark:text-green-400">
                    You've successfully completed this module!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}