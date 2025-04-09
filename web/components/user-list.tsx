"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface UsersListProps {
  initialUsers: string[];
}

export default function UsersList({ initialUsers }: UsersListProps) {
  const router = useRouter();

  const handleUserSelect = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  // Extract city name from email and get a color based on the city name
  const getCityColor = (email: string): string => {
    const cityColors: Record<string, string> = {
      tampere: "bg-blue-500",
      espoo: "bg-green-500",
      tallinn: "bg-red-500",
      tartu: "bg-purple-500",
      helsinki: "bg-cyan-500",
      turku: "bg-amber-500",
    };

    const cityMatch = email.match(/\.([^@]+)@/);
    const city = cityMatch ? cityMatch[1].toLowerCase() : "";

    return cityColors[city] || "bg-gray-500";
  };

  // Get user avatar based on email
  const getUserAvatar = (email: string): string => {
    // Generate a consistent seed from the email to always get the same avatar for the same user
    const seed = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");

    // Using DiceBear API for consistent, free-to-use avatars
    return `https://api.dicebear.com/7.x/personas/svg?seed=${seed}`;
  };

  // Get city name from email for display
  const getCityName = (email: string): string => {
    const cityMatch = email.match(/\.([^@]+)@/);
    return cityMatch
      ? cityMatch[1].charAt(0).toUpperCase() + cityMatch[1].slice(1)
      : "Unknown";
  };

  // Get username from email
  const getUserName = (email: string): string => {
    const username = email.split("@")[0];
    // Convert username.like.this to Username Like This
    return username
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="border-b bg-slate-50 dark:bg-slate-900 py-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <User className="h-5 w-5 text-cyan-500" />
          Select a User
        </CardTitle>
        <CardDescription className="text-sm">
          Choose a user to view their learning plan
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {initialUsers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground bg-slate-50 rounded-md">
              <User className="h-12 w-12 mx-auto mb-3 text-slate-300" />
              <p className="font-medium">No users available</p>
              <p className="text-sm mt-1">
                Please check your backend connection
              </p>
            </div>
          ) : (
            initialUsers.map((userId) => {
              const cityName = getCityName(userId);
              const cityColor = getCityColor(userId);
              const userAvatar = getUserAvatar(userId);
              const userName = getUserName(userId);

              // Get text color based on background color
              const textColor = [
                "bg-blue-500",
                "bg-green-500",
                "bg-purple-500",
                "bg-cyan-500",
              ].includes(cityColor)
                ? "text-white"
                : "text-slate-900";

              return (
                <button
                  key={userId}
                  onClick={() => handleUserSelect(userId)}
                  className="w-full text-left flex items-center justify-between gap-3 p-3 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border shadow-sm">
                      <AvatarImage
                        src={userAvatar}
                        alt={`Avatar for ${userName}`}
                        className="object-cover"
                      />
                      <AvatarFallback className={`${cityColor} ${textColor}`}>
                        {userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{userName}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-muted-foreground truncate max-w-[150px] sm:max-w-[200px]">
                          {userId}
                        </p>
                        <Badge
                          variant="outline"
                          className={`${cityColor.replace("bg-", "border-")} ${cityColor.replace("bg-", "text-")} bg-transparent text-xs px-1.5 py-0 h-4`}
                        >
                          {cityName}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-between flex-wrap text-xs text-muted-foreground border-t py-3 bg-slate-50 dark:bg-slate-900">
        <p className="flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mr-2"></span>
          Total users: {initialUsers.length}
        </p>
        <p className="font-medium text-xs uppercase tracking-wider">
          UPBEAT Learning Assistant © 2025
        </p>
      </CardFooter>
    </Card>
  );
}
