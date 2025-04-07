"use client";

import HomeButton from "@/components/home-button";
import { ModuleContentAccordion } from "@/components/module-content-accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getModuleContent, isModuleEnabled, markModuleAsComplete } from "@/lib/api/modules";
import { createClient } from "@/lib/supabase/client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface ModulePageProps {
  params: Promise<{
    module_id: string;
  }>;
}

export default function ModulePage({ params }: ModulePageProps) {
  const { module_id } = React.use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [moduleContent, setModuleContent] = useState({
    title: "Loading...",
    description: "Loading module content...",
    content: "# Loading...\n\nPlease wait while we fetch the module content.",
  });

  // Extract module number from ID
  const moduleNumber = parseInt(module_id.replace("module", ""));

  // Check if module is enabled
  if (!isModuleEnabled(moduleNumber)) {
    router.push("/");
    return null;
  }

  // Fetch module content on component mount
  React.useEffect(() => {
    async function fetchModuleContent() {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        
        if (data.user) {
          const content = await getModuleContent(module_id, data.user.id);
          setModuleContent(content);
        } else {
          const content = await getModuleContent(module_id);
          setModuleContent(content);
        }
      } catch (error) {
        console.error("Error fetching module content:", error);
        toast.error("Failed to load module content");
      }
    }

    fetchModuleContent();
  }, [module_id]);

  const handleCompleteModule = async () => {
    setIsLoading(true);

    try {
      // Get current user session directly when needed
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("You must be logged in to complete modules");
        return;
      }

      const { success, error } = await markModuleAsComplete(user.id, module_id);

      if (success) {
        toast.success("Module completed!");
        router.push(`/users/${user.email}`);
      } else {
        console.error("Error saving module progress:", error);
        toast.error("Failed to mark module as complete");
      }
    } catch (err) {
      console.error("Failed to save module completion:", err);
      toast.error("Failed to save completion status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <HomeButton />

      <div className="mb-8 mt-12">
        <Button
          variant="outline"
          size="sm"
          className="mb-4"
          onClick={() => {
            router.back();
          }}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-2xl">{moduleContent.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-8">
            <ModuleContentAccordion moduleContent={moduleContent} defaultOpen={true} />
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleCompleteModule} disabled={isLoading}>
            {isLoading ? "Marking as complete..." : "Mark as Complete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
