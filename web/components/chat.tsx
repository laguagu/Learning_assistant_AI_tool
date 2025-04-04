"use client";

import type React from "react";

import { Markdown } from "@/components/markdown"; // Import your custom Markdown component
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { streamChatMessage } from "@/lib/api/stream";
import { useChatStorage } from "@/lib/hooks/useChatStorage";
import type { ChatMessage, SavedChat } from "@/lib/types";
import {
  ArrowBigRight,
  BookmarkPlus,
  Bot,
  Download,
  Folder,
  Loader2,
  RefreshCw,
  Send,
  UserIcon
} from "lucide-react";
import { motion } from "motion/react";
import { startTransition, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

// Learning-related suggested questions
const suggestedQuestions = [
  {
    title: "Introduction",
    label: "Hi! Who are you and what can you do for me?",
    action: "Hi! Who are you and what can you do for me?",
  },
  {
    title: "Getting Started",
    label: "Help me in getting started with my learning",
    action: "Help me in getting started with my learning",
  },
  {
    title: "Essential Skills",
    label: "What are essential skills I need to learn during onboarding?",
    action: "What are essential skills I need to learn during onboarding?",
  },
  {
    title: "Priorities",
    label: "What are my top learning priorities?",
    action: "What are my top learning priorities?",
  },
];

interface ChatProps {
  userId: string;
  onReady?: (methods: { resetChat: () => void }) => void;
}

export function Chat({ userId, onReady }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm your learning assistant. How can I help you with your learning plan today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const {
    savedChats,
    saveChatName,
    setSaveChatName,
    saveChatDialogOpen,
    setSaveChatDialogOpen,
    savedChatsDialogOpen,
    setSavedChatsDialogOpen,
    handleSaveChat,
    handleLoadChat,
    handleDeleteChat,
    handleDownloadChat,
  } = useChatStorage(userId);

  // Reset chat function
  const resetChat = () => {
    startTransition(() => {
      setMessages([
        {
          role: "assistant",
          content:
            "👋 Hello! I'm your learning assistant. How can I help you with your learning plan today?",
        },
      ]);
      setHasInteracted(false);
    });
    setInput("");
    setLoading(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Expose the resetChat method
  useEffect(() => {
    if (onReady) {
      onReady({ resetChat });
    }
  }, [onReady]);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  // Check if scroll button should be shown
  const handleScroll = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
      const isScrolled = scrollHeight - scrollTop - clientHeight > 100;
      setShowScrollButton(isScrolled);
    }
  };

  // Scroll chat area down when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when moving from welcome screen to chat
  useEffect(() => {
    if (hasInteracted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasInteracted]);

  // Handle save chat with current messages
  const onSaveChat = () => {
    handleSaveChat(messages);
  };

  // Handle load chat with setting messages
  const onLoadChat = (chat: SavedChat) => {
    handleLoadChat(chat, (loadedMessages) => {
      startTransition(() => {
        setMessages(loadedMessages);
        setHasInteracted(true);
      });
    });
  };

  // Handle download current chat
  const onDownloadChat = () => {
    handleDownloadChat(messages);
  };

  // Handle suggested question click
  const handleSuggestionClick = async (question: string) => {
    // Add user message
    const userMessage: ChatMessage = { role: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);
    setHasInteracted(true);

    // Trigger the API call
    setLoading(true);

    // Add an initial assistant message that will be updated with streamed content
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    // Get the index where we'll update the assistant's message
    const assistantIndex = messages.length + 1;

    try {
      await streamChatMessage(decodeURIComponent(userId), question, (chunk) => {
        console.log(`[CHAT] Processing chunk of length: ${chunk.length}`);

        // Update the message with each new chunk
        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages[assistantIndex]) {
            newMessages[assistantIndex] = {
              role: "assistant",
              content: chunk,
            };
          }
          return newMessages;
        });

        // Scroll to ensure the latest content is visible
        setTimeout(scrollToBottom, 100);
      });

      console.log("[CHAT] Stream completed successfully");
    } catch (error) {
      console.error("[CHAT] Error:", error);
      toast.error("Failed to send message. Please try again.");

      // Update with an error message
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[assistantIndex] = {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        };
        return newMessages;
      });
    } finally {
      setLoading(false);
      setTimeout(scrollToBottom, 200);
    }
  };

  // Using streamChatMessage from api.ts with startTransition
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || loading) return;

    // Store the input and add user message
    const userInput = input;
    const userMessage: ChatMessage = { role: "user", content: userInput };

    // Add user message to chat and set hasInteracted
    setMessages((prev) => [...prev, userMessage]);
    setHasInteracted(true);

    // Clear input and set loading
    setInput("");
    setLoading(true);

    // Add an initial assistant message that will be updated with streamed content
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    // Get the index where we'll update the assistant's message
    const assistantIndex = messages.length + 1;

    try {
      // STREAMING SOLUTION:
      // 1. We receive the FULL markdown content with each update
      // 2. We completely replace the message content each time (not append)
      // 3. This ensures proper rendering of markdown elements like lists
      // 4. We immediately update the UI with each new chunk
      await streamChatMessage(
        decodeURIComponent(userId),
        userInput,
        (chunk) => {
          console.log(`[CHAT] Processing chunk of length: ${chunk.length}`);

          // Update the message with each new chunk
          setMessages((prev) => {
            const newMessages = [...prev];
            if (newMessages[assistantIndex]) {
              newMessages[assistantIndex] = {
                role: "assistant",
                content: chunk,
              };
            }
            return newMessages;
          });

          // Scroll to ensure the latest content is visible
          setTimeout(scrollToBottom, 100);
        }
      );

      console.log("[CHAT] Stream completed successfully");
    } catch (error) {
      console.error("[CHAT] Error:", error);
      toast.error("Failed to send message. Please try again.");

      // Update with an error message
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[assistantIndex] = {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        };
        return newMessages;
      });
    } finally {
      setLoading(false);

      // One final scroll to make sure everything is visible
      setTimeout(scrollToBottom, 200);

      // Focus input after sending
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <Card className="w-full h-[80vh] flex flex-col shadow-md border overflow-hidden">
      <CardHeader className="bg-muted/30 py-3 flex flex-row justify-between items-center border-b shrink-0">
        <CardTitle className="flex items-center text-lg">
          <Bot className="h-5 w-5 mr-2 text-primary" />
          Learning Assistant
        </CardTitle>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Folder className="h-4 w-4" />
                <span>Manage Chats</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSaveChatDialogOpen(true)}>
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Save current chat
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSavedChatsDialogOpen(true)}>
                <Folder className="h-4 w-4 mr-2" />
                Load saved chats
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDownloadChat}>
                <Download className="h-4 w-4 mr-2" />
                Download chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            onClick={resetChat}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            <span>New Chat</span>
          </Button>
        </div>
      </CardHeader>

      {!hasInteracted && messages.length <= 1 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col items-center justify-center gap-4 px-4 py-4 overflow-y-auto"
        >
          <div className="text-center space-y-2 max-w-lg mb-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary">
              Welcome to your Learning Assistant
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              I can help you with your learning plan and answer questions about
              your entrepreneurship journey.
            </p>
          </div>

          {/* Suggested Questions - now with better spacing and responsive design */}
          <div className="grid grid-cols-1 gap-2 w-full max-w-2xl mb-auto">
            {suggestedQuestions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Button
                  variant="outline"
                  className="w-full text-left justify-start h-auto py-2 px-3"
                  onClick={() => handleSuggestionClick(question.action)}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-primary text-sm">
                      {question.title}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {question.label}
                    </span>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Input form with fixed position at bottom */}
          <div className="w-full max-w-2xl mt-4 sticky bottom-0 bg-background pt-2 pb-2">
            <form
              className="flex w-full items-center space-x-2"
              onSubmit={handleSubmit}
            >
              <Input
                ref={inputRef}
                type="text"
                placeholder="Or type your own question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                size="icon"
                className={loading ? "opacity-50" : ""}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 relative overflow-hidden"
        >
          <div
            ref={scrollAreaRef}
            onScroll={handleScroll}
            className="h-full overflow-y-auto pb-4"
          >
            <div className="space-y-5 px-4 pt-4 w-full">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  } w-full`}
                >
                  <div
                    className={`flex ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    } gap-3 ${
                      msg.role === "user" ? "max-w-[85%]" : "max-w-full"
                    }`}
                  >
                    <Avatar
                      className={
                        msg.role === "user"
                          ? "bg-primary h-8 w-8 shrink-0"
                          : "bg-secondary h-8 w-8 shrink-0"
                      }
                    >
                      <AvatarFallback>
                        {msg.role === "user" ? (
                          <UserIcon className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>

                    <div
                      className={`p-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent w-full"
                      }`}
                      style={{
                        width: msg.role === "assistant" ? "100%" : "auto",
                      }}
                    >
                      {msg.role === "user" ? (
                        <div className="whitespace-pre-wrap break-words">
                          {msg.content}
                        </div>
                      ) : (
                        <div className="break-words w-full">
                          {msg.content === "" && loading ? (
                            <div className="flex items-center space-x-2">
                              <span>Thinking</span>
                              <span className="inline-block animate-bounce">
                                .
                              </span>
                              <span className="inline-block animate-bounce animation-delay-200">
                                .
                              </span>
                              <span className="inline-block animate-bounce animation-delay-400">
                                .
                              </span>
                            </div>
                          ) : (
                            <Markdown
                              className="prose prose-zinc prose-sm prose-headings:my-2 
                                      prose-ul:pl-5 prose-ol:pl-5 prose-li:pl-1 prose-li:my-0 
                                      max-w-none w-full dark:prose-invert"
                              debugMode={true} // Always enable debug mode to help diagnose issues
                            >
                              {msg.content}
                            </Markdown>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showScrollButton && (
            <Button
              size="icon"
              variant="outline"
              onClick={scrollToBottom}
              className="absolute bottom-4 right-4 rounded-full shadow-lg bg-white/80 
                       hover:bg-white dark:bg-zinc-900/80 dark:hover:bg-zinc-900"
            >
              <ArrowBigRight className="h-4 w-4 rotate-90" />
            </Button>
          )}
        </motion.div>
      )}

      {hasInteracted && (
        <CardFooter className="p-3 border-t bg-background shrink-0">
          <form
            className="flex w-full items-center space-x-2"
            onSubmit={handleSubmit}
          >
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              size="icon"
              className={loading ? "opacity-50" : ""}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardFooter>
      )}

      {/* Save Chat Dialog */}
      <Dialog open={saveChatDialogOpen} onOpenChange={setSaveChatDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save This Chat</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="chat-name" className="text-right">
                Name
              </Label>
              <Input
                id="chat-name"
                value={saveChatName}
                onChange={(e) => setSaveChatName(e.target.value)}
                className="col-span-3"
                placeholder="My learning chat"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSaveChatDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={onSaveChat}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Saved Chats Dialog */}
      <Dialog
        open={savedChatsDialogOpen}
        onOpenChange={setSavedChatsDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Saved Chats</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {savedChats.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No saved chats yet
              </p>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {savedChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center justify-between p-2 rounded-md border hover:bg-accent/50 cursor-pointer"
                    onClick={() => onLoadChat(chat)}
                  >
                    <div>
                      <p className="font-medium">{chat.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(chat.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChat(chat.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setSavedChatsDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
