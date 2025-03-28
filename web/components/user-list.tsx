"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
      'tampere': 'bg-blue-500',
      'espoo': 'bg-green-500',
      'tallinn': 'bg-red-500',
      'tartu': 'bg-purple-500',
      'helsinki': 'bg-cyan-500',
      'turku': 'bg-amber-500',
    };
    
    const cityMatch = email.match(/\.([^@]+)@/);
    const city = cityMatch ? cityMatch[1].toLowerCase() : '';
    
    return cityColors[city] || 'bg-gray-500';
  };
  
  // Get user avatar based on email
  const getUserAvatar = (email: string): string => {
    // Generate a consistent seed from the email to always get the same avatar for the same user
    const seed = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
    
    // Using DiceBear API for consistent, free-to-use avatars
    return `https://api.dicebear.com/7.x/personas/svg?seed=${seed}`;
  };
  
  // Get city name from email for display
  const getCityName = (email: string): string => {
    const cityMatch = email.match(/\.([^@]+)@/);
    return cityMatch ? cityMatch[1].charAt(0).toUpperCase() + cityMatch[1].slice(1) : '';
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a User</CardTitle>
        <CardDescription>
          Choose a user to view their learning plan and start interacting with
          the AI assistant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {initialUsers.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No users available. Please check your backend connection.
            </p>
          ) : (
            initialUsers.map((userId) => {
              const cityName = getCityName(userId);
              const cityColor = getCityColor(userId);
              const userAvatar = getUserAvatar(userId);
              
              return (
                <div
                  key={userId}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={userAvatar} alt={`Avatar for ${userId}`} className="object-cover" />
                      <AvatarFallback className={`${cityColor} text-white flex items-center justify-center`}>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{userId}</p>
                      <p className="text-xs text-muted-foreground">
                        City: {cityName}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleUserSelect(userId)}
                    className="gap-1"
                  >
                    Open <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-between flex-wrap text-sm text-muted-foreground">
        <p>Total users: {initialUsers.length}</p>
        <p>UPBEAT Learning Assistant © 2025</p>
      </CardFooter>
    </Card>
  );
}
