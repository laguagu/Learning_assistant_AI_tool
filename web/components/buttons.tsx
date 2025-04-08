"use client";

import { logoutUser } from "@/app/(auth)/login-actions";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

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

export function LogoutButton() {
  const [, formAction, isPending] = useActionState(logoutUser, null);

  return (
    <form action={formAction}>
      <Button
        type="submit"
        variant="outline"
        size="sm"
        disabled={isPending}
        className="flex items-center gap-1"
      >
        <LogOut className="h-4 w-4" />
        <span>{isPending ? "Logging out..." : "Logout"}</span>
      </Button>
    </form>
  );
}
