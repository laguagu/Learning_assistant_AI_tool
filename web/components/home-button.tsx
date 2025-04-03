"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Home } from "lucide-react";
import Link from "next/link";

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
