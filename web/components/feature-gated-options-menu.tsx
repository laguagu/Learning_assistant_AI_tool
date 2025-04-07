// components/feature-gated-options-menu.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_URL } from "@/lib/api/config";
import { isOptionsMenuEnabled } from "@/lib/features";
import { Loader2, Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface OptionsMenuProps {
  userId: string;
  onResetChat?: () => void; 
}

export function FeatureGatedOptionsMenu({ userId, onResetChat }: OptionsMenuProps) {
  // Check if the options menu feature is enabled
  if (!isOptionsMenuEnabled()) {
    return null;
  }

  // If enabled, render the actual OptionsMenu component
  return <OptionsMenu userId={userId} onResetChat={onResetChat} />;
}

// The actual OptionsMenu component
function OptionsMenu({ userId, onResetChat }: OptionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  // State for settings
  const [systemPrompt, setSystemPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.3);
  const [usePlanTool, setUsePlanTool] = useState(true);
  const [useSearchTool, setUseSearchTool] = useState(true);
  const [useLearningMaterialTool, setUseLearningMaterialTool] = useState(true);
  const [useMilestonesTool, setUseMilestonesTool] = useState(true);

  // Handle button click - show loading state immediately
  const handleButtonClick = async () => {
    setButtonLoading(true);
    try {
      // Get settings from API
      const response = await fetch(
        `${API_URL}/api/reset-agent-settings?user_id=${encodeURIComponent(userId)}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to load settings");
      }
      
      const data = await response.json();
      if (data.success && data.settings) {
        const settings = data.settings;
        setSystemPrompt(settings.system_prompt || "");
        setTemperature(settings.temperature || 0.3);
        setUsePlanTool(!!settings.use_plan_tool);
        setUseSearchTool(!!settings.use_search_tool);
        setUseLearningMaterialTool(!!settings.use_learningmaterial_tool);
        setUseMilestonesTool(!!settings.use_milestones_tool);
      }
      
      // Open the dialog
      setOpen(true);
    } catch (error) {
      console.error("Failed to load settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setButtonLoading(false);
    }
  };

  // Save settings using API
  const handleSaveSettings = async () => {
    try {
      setLoading(true);
      
      // Call the API to update settings
      const response = await fetch(`${API_URL}/api/update-agent-settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          system_prompt: systemPrompt,
          temperature: temperature,
          use_plan_tool: usePlanTool,
          use_search_tool: useSearchTool,
          use_learningmaterial_tool: useLearningMaterialTool,
          use_milestones_tool: useMilestonesTool,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update settings");
      }
      
      const data = await response.json();
      if (data.success) {
        toast.success("Settings updated successfully");
        setOpen(false);
        
        // Reset chat if function is provided
        if (onResetChat) {
          onResetChat();
        }
      } else {
        throw new Error(data.error || "Failed to update settings");
      }
    } catch (error) {
      console.error("Failed to update settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  // Reset settings to defaults
  const handleResetSettings = async () => {
    try {
      setLoading(true);
      
      // Call the API to reset settings
      const response = await fetch(
        `${API_URL}/api/reset-agent-settings?user_id=${encodeURIComponent(userId)}&reset=true`
      );
      
      if (!response.ok) {
        throw new Error("Failed to reset settings");
      }
      
      const data = await response.json();
      
      if (data.success && data.settings) {
        const settings = data.settings;
        setSystemPrompt(settings.system_prompt || "");
        setTemperature(settings.temperature || 0.3);
        setUsePlanTool(!!settings.use_plan_tool);
        setUseSearchTool(!!settings.use_search_tool);
        setUseLearningMaterialTool(!!settings.use_learningmaterial_tool);
        setUseMilestonesTool(!!settings.use_milestones_tool);
        toast.success("Settings reset to defaults");
        
        // Reset chat if function is provided
        if (onResetChat) {
          onResetChat();
        }
      } else {
        throw new Error(data.error || "Failed to reset settings");
      }
    } catch (error) {
      console.error("Failed to reset settings:", error);
      toast.error("Failed to reset settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1 h-9"
        onClick={handleButtonClick}
        disabled={buttonLoading}
      >
        {buttonLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            <Settings className="h-4 w-4" />
            <span>Options</span>
          </>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>LLM Assistant Options</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="group relative">
              <label
                htmlFor="system-prompt"
                className="origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+textarea:not(:placeholder-shown)]:text-foreground has-aria-invalid:border-destructive/60 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive absolute top-0 block translate-y-2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+textarea:not(:placeholder-shown)]:pointer-events-none has-[+textarea:not(:placeholder-shown)]:-translate-y-1/2 has-[+textarea:not(:placeholder-shown)]:cursor-default has-[+textarea:not(:placeholder-shown)]:text-xs has-[+textarea:not(:placeholder-shown)]:font-medium"
              >
                <span className="bg-background inline-flex px-2">
                  System Prompt
                </span>
              </label>
              <Textarea
                id="system-prompt"
                rows={15}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                disabled={loading}
                className="font-mono text-sm"
                placeholder=" "
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="temperature" className="text-sm font-medium">
                  Temperature
                </label>
                <span className="text-sm text-muted-foreground">
                  {temperature}
                </span>
              </div>
              <Input
                id="temperature"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                disabled={loading}
                className="w-full"
              />
            </div>

            <div className="grid gap-2">
              <h3 className="text-sm font-medium mb-2">LLM Tools</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="use-plan-tool"
                    checked={usePlanTool}
                    onCheckedChange={(checked) => setUsePlanTool(!!checked)}
                    disabled={loading}
                  />
                  <label htmlFor="use-plan-tool" className="text-sm">
                    Learning plan
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="use-search-tool"
                    checked={useSearchTool}
                    onCheckedChange={(checked) => setUseSearchTool(!!checked)}
                    disabled={loading}
                  />
                  <label htmlFor="use-search-tool" className="text-sm">
                    Internet search
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="use-learning-material-tool"
                    checked={useLearningMaterialTool}
                    onCheckedChange={(checked) =>
                      setUseLearningMaterialTool(!!checked)
                    }
                    disabled={loading}
                  />
                  <label
                    htmlFor="use-learning-material-tool"
                    className="text-sm"
                  >
                    Learning materials
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="use-milestones-tool"
                    checked={useMilestonesTool}
                    onCheckedChange={(checked) =>
                      setUseMilestonesTool(!!checked)
                    }
                    disabled={loading}
                  />
                  <label htmlFor="use-milestones-tool" className="text-sm">
                    Milestones
                  </label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <div className="flex">
              <Button
                variant="outline"
                onClick={handleResetSettings}
                disabled={loading}
              >
                Reset to defaults
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSettings} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}