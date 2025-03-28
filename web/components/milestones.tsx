"use client";

import { updateMilestonesAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserData } from "@/lib/api/api";
import { CheckCircle, LineChart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface MilestonesProps {
  userId: string;
  initialMilestones?: string[];
  initialStates?: boolean[];
}

export function Milestones({
  userId,
  initialMilestones,
  initialStates,
}: MilestonesProps) {
  const [milestones, setMilestones] = useState<string[]>(
    initialMilestones || []
  );
  const [states, setStates] = useState<boolean[]>(initialStates || []);
  const [originalStates, setOriginalStates] = useState<boolean[]>(
    initialStates || []
  );
  const [loading, setLoading] = useState(!initialMilestones || !initialStates);
  const [saving, setSaving] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    // If we have initial data, no need to fetch
    if (
      initialMilestones &&
      initialMilestones.length > 0 &&
      initialStates &&
      initialStates.length > 0 &&
      !loading
    )
      return;

    const fetchMilestones = async () => {
      try {
        setLoading(true);
        const userData = await getUserData(userId);

        // Check that milestones data exists
        if (
          userData?.milestones &&
          Array.isArray(userData.milestones) &&
          userData.milestones.length > 0
        ) {
          setMilestones(userData.milestones);

          // Check that learning_state.states data exists
          if (
            userData.learning_state?.states &&
            Array.isArray(userData.learning_state.states)
          ) {
            setStates(userData.learning_state.states);
            setOriginalStates(userData.learning_state.states);
          } else {
            // If not, create an empty array
            const emptyStates = Array(userData.milestones.length).fill(false);
            setStates(emptyStates);
            setOriginalStates(emptyStates);
          }
        } else {
          // If milestones data doesn't exist, show message
          console.warn("No milestone data available for this user");
          toast.error("No milestone data available");
        }
      } catch (error) {
        console.error("Error fetching milestones:", error);
        toast.error("Failed to load milestones");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchMilestones();
    }
  }, [userId, initialMilestones, initialStates, loading]);

  // Check if there are changes
  useEffect(() => {
    if (originalStates.length === states.length) {
      const hasChanges = originalStates.some(
        (state, index) => state !== states[index]
      );
      setChanged(hasChanges);
    }
  }, [states, originalStates]);

  const handleChange = (index: number, checked: boolean) => {
    const newStates = [...states];
    newStates[index] = checked;
    setStates(newStates);
  };

  const saveChanges = async () => {
    if (!changed) return;

    setSaving(true);
    try {
      // Use server action to update milestones
      const result = await updateMilestonesAction(userId, states);

      if (result.success) {
        setOriginalStates([...states]);
        toast.success("Milestones updated successfully");
      } else {
        throw new Error(result.error || "Failed to update milestones");
      }
    } catch (error) {
      console.error("Error saving milestones:", error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
      setChanged(false);
    }
  };

  const resetChanges = () => {
    setStates([...originalStates]);
    setChanged(false);
  };

  const completedCount = states.filter(Boolean).length;
  const totalCount = states.length;
  const progress =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-48" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!milestones || milestones.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Learning Milestones</CardTitle>
          <CardDescription>
            No milestones available for this user
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex justify-between items-start">
        <div>
          <CardTitle>Learning Milestones</CardTitle>
          <CardDescription>
            Track your progress: {completedCount}/{totalCount} completed (
            {progress}%)
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <span>Track your progress and achievements</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-2 bg-muted rounded mb-6">
          <div
            className="h-full bg-primary rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Checkbox
                id={`milestone-${index}`}
                checked={states[index]}
                onCheckedChange={(checked) => handleChange(index, !!checked)}
              />
              <label
                htmlFor={`milestone-${index}`}
                className={`text-sm ${
                  states[index] ? "line-through text-muted-foreground" : ""
                }`}
              >
                {milestone}
              </label>
            </div>
          ))}
        </div>

        {changed && (
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={resetChanges} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={saveChanges} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}

        {progress === 100 && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg flex items-center gap-2 text-primary shadow-md">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Congratulations! You&apos;ve completed all milestones.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
