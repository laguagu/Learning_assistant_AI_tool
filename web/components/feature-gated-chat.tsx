// components/feature-gated-chat.tsx
"use client";

import { Chat } from "@/components/chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isChatAssistantEnabled } from "@/lib/features";
import { Bot, Lock } from "lucide-react";

// Import ChatProps from the chat component
import type { ChatProps } from "@/components/chat";

export const FeatureGatedChat: React.FC<ChatProps> = (props) => {
  // Check if the chat feature is enabled
  if (!isChatAssistantEnabled()) {
    return (
      <Card className="w-full h-[80vh] flex flex-col shadow-md border overflow-hidden">
        <CardHeader className="bg-muted/30 py-3 flex flex-row justify-between items-center border-b shrink-0">
          <CardTitle className="flex items-center text-lg">
            <Bot className="h-5 w-5 mr-2 text-muted-foreground" />
            Learning Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center p-6 max-w-md">
            <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Chat Assistant Unavailable</h3>
            <p className="text-muted-foreground">
              The chat assistant feature is currently disabled. It will be available in a future update.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // If enabled, render the actual Chat component
  return <Chat {...props} />;
};