"use client";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Changed from next/router to next/navigation
import { useState } from "react";
import toast from "react-hot-toast";

export default function HomeButton() {
  return (
    <TooltipProvider>
      <div className="fixed top-4 left-4 z-50 sm:absolute">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/" passHref>
              <Button
                variant="secondary"
                size="icon"
                className="h-9 w-9 rounded-full shadow-md hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <Home className="h-4 w-4 text-primary" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" align="start">
            Return to home
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      className="mb-4"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      Back
    </Button>
  );
}

interface CompleteButtonProps {
  email: string;
  module_id: string;
}

export function CompleteButton({ email, module_id }: CompleteButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    setIsLoading(true);

    // Simulate saving - no actual saving here
    setTimeout(() => {
      toast.success("Module marked as completed!");
      router.push(`/users/${email}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Button onClick={handleComplete} disabled={isLoading}>
      {isLoading ? "Marking as completed..." : "Mark as completed"}
    </Button>
  );
}
