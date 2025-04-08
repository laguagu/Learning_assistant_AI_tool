"use client";

import { LogoutButton } from "@/components/buttons";
import { FeatureGatedChat } from "@/components/feature-gated-chat";
import { Milestones } from "@/components/milestones";
import { ModuleSection } from "@/components/module-section";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { UserData } from "@/lib/types";
import {
  BookOpen,
  Layout,
  Mail,
  MessageSquare,
  Sparkles,
  User
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

interface UserDashboardProps {
  userData: UserData;
  currentPhase: number;
  userId: string;
}

export default function UserDashboard({
  userData,
  currentPhase,
  userId,
}: UserDashboardProps) {
  // const [selectedPhase, setSelectedPhase] = useState<number>(currentPhase);
  const [activeTab, setActiveTab] = useState("modules");
  const chatRef = useRef<{ resetChat?: () => void }>({});
  // const [isLoading, setIsLoading] = useState(false);

  // // Get the correct plan text based on selected phase
  // const currentPlanText =
  //   selectedPhase === 1
  //     ? userData.smart_plan_phase1
  //     : userData.smart_plan_phase2;

  // Decode email for display to fix the '%40' issue
  const displayEmail = decodeURIComponent(userId);

  // Handle PDF download with loading state
  // const handleDownload = useCallback(async () => {
  //   try {
  //     setIsLoading(true);
  //     await downloadPdf(userId, selectedPhase);
  //     toast.success("PDF downloaded successfully");
  //   } catch (error) {
  //     console.error("Download error:", error);
  //     toast.error("Failed to download PDF");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [userId, selectedPhase]);

  // // Handle chat reset for the Options menu
  // const handleResetChat = useCallback(() => {
  //   if (chatRef.current.resetChat) {
  //     chatRef.current.resetChat();
  //   }
  // }, []);

  // Extract user name from data or fallback to email username
  const userName =
    (userData.data["Q1. Full Name"] as string) || displayEmail.split("@")[0];

  return (
    <TooltipProvider>
      <div className="container mx-auto py-4 sm:py-8 px-3 sm:px-4">
        {/* User header section - with improved backdrop blur effect */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 mt-6 
          border border-gray-200 dark:border-gray-800 pb-4 bg-white/50 dark:bg-black/50 rounded-lg py-2 px-4
          shadow-[0_0_15px_rgba(180,180,180,0.15),0_0_5px_rgba(150,150,150,0.1)]
          dark:shadow-[0_0_15px_rgba(70,70,70,0.25),0_0_5px_rgba(40,40,40,0.15)]
          relative backdrop-blur-sm overflow-hidden
          before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-50/10 before:via-white/5 before:to-gray-50/10 dark:before:from-gray-900/10 dark:before:via-black/5 dark:before:to-gray-900/10 before:rounded-lg before:z-[-1]"
        >
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-primary">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm sm:text-base">
                {userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <h1 className="text-xl sm:text-3xl font-bold truncate">
                {userName}
              </h1>
              <p className="text-sm text-muted-foreground">
                Learning phase:{" "}
                <span className="font-medium">
                  {currentPhase === 1 ? "Onboarding" : "Training"}
                </span>
              </p>
            </div>
          </div>

          {/* Add logout button in the header */}
          <div className="flex items-center">
            <LogoutButton />
          </div>

          {/* Mobile-friendly action buttons */}
          {/* <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedPhase === 1 ? "default" : "outline"}
                    onClick={() => setSelectedPhase(1)}
                    className="flex items-center gap-1 text-xs sm:text-sm h-9"
                    size="sm"
                    aria-label="Onboarding phase"
                  >
                    <Route className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sm:inline">Onboarding</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View onboarding plan</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedPhase === 2 ? "default" : "outline"}
                    onClick={() => setSelectedPhase(2)}
                    disabled={currentPhase < 2}
                    className="flex items-center gap-1 text-xs sm:text-sm h-9"
                    size="sm"
                    aria-label="Training phase"
                  >
                    <Presentation className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sm:inline">Training</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View training plan</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    className="flex items-center gap-1 text-xs sm:text-sm h-9 mt-2 sm:mt-0"
                    size="sm"
                    disabled={isLoading}
                    aria-label="Download PDF"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-1">
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span className="sm:inline">Loading</span>
                      </span>
                    ) : (
                      <>
                        <Download className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="sm:inline">PDF</span>
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download as PDF</TooltipContent>
              </Tooltip>

              <div className="mt-2 sm:mt-0">
                <FeatureGatedOptionsMenu
                  userId={userId}
                  onResetChat={handleResetChat}
                />
              </div>
            </div>
          </div> */}
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Mobile-friendly sidebar - only show on larger screens or when menu toggled */}
            <div className="col-span-1 md:block">
              <Card className="shadow-sm">
                <CardHeader className="pb-2 bg-muted/50 justify-start items-center">
                  <CardTitle className="text-base sm:text-lg flex items-baseline justify-between">
                    <div className="flex items-center gap-2">
                      <Layout
                        className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
                        aria-hidden="true"
                      />
                      Dashboard
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {/* User Info Card - with truncation for long text */}
                  <div className="p-3 sm:p-4 border-b">
                    <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <User
                        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                        aria-hidden="true"
                      />
                      Profile
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User
                          className="text-muted-foreground h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-xs sm:text-sm truncate">
                          {userName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail
                          className="text-muted-foreground h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-xs sm:text-sm truncate">
                          {displayEmail}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4">
                    <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      Navigation
                    </h3>
                    <TabsList className="flex flex-col w-full h-auto space-y-1 bg-transparent">
                      <TabsTrigger
                        value="modules"
                        className="justify-start w-full text-xs sm:text-sm py-1.5 sm:py-2 bg-background data-[state=active]:bg-primary/10"
                        aria-label="Learning Modules tab"
                      >
                        <BookOpen
                          className="h-3.5 w-3.5 mr-2 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="truncate">Learning Modules</span>
                        <span className="sr-only">(Alt+1)</span>
                      </TabsTrigger>
                      {/* Learning Plan tab commented out - no longer used
                      <TabsTrigger
                        value="plan"
                        className="justify-start w-full text-xs sm:text-sm py-1.5 sm:py-2 bg-background data-[state=active]:bg-primary/10"
                        aria-label="Learning Plan tab"
                      >
                        <BookOpen
                          className="h-3.5 w-3.5 mr-2"
                          aria-hidden="true"
                        />
                        Learning Plan
                        <span className="sr-only">(Alt+2)</span>
                      </TabsTrigger>
                      */}
                      <TabsTrigger
                        value="chat"
                        className="justify-start w-full text-xs sm:text-sm py-1.5 sm:py-2 bg-background data-[state=active]:bg-primary/10"
                        aria-label="Chat Assistant tab"
                      >
                        <MessageSquare
                          className="h-3.5 w-3.5 mr-2 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="truncate">Chat Assistant</span>
                        <span className="sr-only">(Alt+3)</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="milestones"
                        className="justify-start w-full text-xs sm:text-sm py-1.5 sm:py-2 bg-background data-[state=active]:bg-primary/10"
                        aria-label="Milestones tab"
                      >
                        <Sparkles
                          className="h-3.5 w-3.5 mr-2 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="truncate">Milestones</span>
                        <span className="sr-only">(Alt+4)</span>
                      </TabsTrigger>

                      {/* Logout button in the navigation menu */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                        <LogoutButton />
                      </div>
                    </TabsList>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main content area - adjust content based on active tab */}
            <div className="col-span-1 md:col-span-3">
              <TabsContent value="modules" className="m-0">
                <ModuleSection userId={userId} />
              </TabsContent>

              {/* Plan tab content commented out - no longer used
              <TabsContent value="plan" className="m-0">
                <MarkdownPlanViewer markdown={currentPlanText} />
              </TabsContent>
              */}

              <TabsContent value="chat" className="m-0">
                <FeatureGatedChat
                  userId={userId}
                  onReady={(methods) => {
                    chatRef.current = methods;
                  }}
                />
              </TabsContent>

              <TabsContent value="milestones" className="m-0">
                <Milestones
                  userId={userId}
                  initialMilestones={userData.milestones}
                  initialStates={userData.learning_state.states}
                />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
