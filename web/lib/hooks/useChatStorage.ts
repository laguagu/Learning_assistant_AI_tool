import type { ChatMessage } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// Define the SavedChat interface (if not already in types.ts)
export interface SavedChat {
  id: string;
  name: string;
  timestamp: number;
  messages: ChatMessage[];
}

export function useChatStorage(userId: string) {
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const [saveChatName, setSaveChatName] = useState("");
  const [saveChatDialogOpen, setSaveChatDialogOpen] = useState(false);
  const [savedChatsDialogOpen, setSavedChatsDialogOpen] = useState(false);

  // Load saved chats on initial render
  useEffect(() => {
    const loadSavedChats = () => {
      try {
        const savedChatsJson = localStorage.getItem(`upbeat-chats-${userId}`);
        if (savedChatsJson) {
          const chats = JSON.parse(savedChatsJson) as SavedChat[];
          setSavedChats(chats);
        }
      } catch (error) {
        console.error("Failed to load saved chats:", error);
      }
    };

    loadSavedChats();
  }, [userId]);

  // Save chats to localStorage
  const saveChatsList = (chats: SavedChat[]) => {
    try {
      localStorage.setItem(`upbeat-chats-${userId}`, JSON.stringify(chats));
      setSavedChats(chats);
    } catch (error) {
      console.error("Failed to save chats to localStorage:", error);
      toast.error("Failed to save chat history");
    }
  };

  // Handle saving current chat
  const handleSaveChat = (messages: ChatMessage[]) => {
    if (!saveChatName.trim() || messages.length <= 1) {
      toast.error("Please enter a name and have a conversation first");
      return false;
    }

    const newChat: SavedChat = {
      id: Date.now().toString(),
      name: saveChatName,
      timestamp: Date.now(),
      messages: [...messages],
    };

    const updatedChats = [...savedChats, newChat];
    saveChatsList(updatedChats);
    toast.success("Chat saved successfully!");
    setSaveChatDialogOpen(false);
    setSaveChatName("");
    return true;
  };

  // Handle loading a saved chat
  const handleLoadChat = (
    chat: SavedChat,
    onLoad: (messages: ChatMessage[]) => void
  ) => {
    onLoad(chat.messages);
    setSavedChatsDialogOpen(false);
    toast.success(`Loaded chat: ${chat.name}`);
  };

  // Handle deleting a saved chat
  const handleDeleteChat = (chatId: string) => {
    const updatedChats = savedChats.filter((chat) => chat.id !== chatId);
    saveChatsList(updatedChats);
    toast.success("Chat deleted");
  };

  // Download chat as JSON
  const handleDownloadChat = (messages: ChatMessage[]) => {
    if (messages.length <= 1) {
      toast.error("No conversation to download");
      return;
    }

    const chatData = {
      userId: userId,
      timestamp: new Date().toISOString(),
      conversation: messages,
    };

    const dataStr = JSON.stringify(chatData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportName = `upbeat-chat-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportName);
    linkElement.click();

    toast.success("Chat downloaded");
  };

  return {
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
  };
}
