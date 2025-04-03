"use client";

import { updateMilestonesAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserData } from "@/lib/api/api";
import confetti from "canvas-confetti";
import { CheckCircle, LineChart, Sparkles, Star, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ScratchToReveal } from "./magicui/scratch-to-reveal";

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
  const [showReward, setShowReward] = useState(false);
  const [rewardRevealed, setRewardRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

            // Check if all milestones are completed
            const allCompleted = userData.learning_state.states.every(Boolean);
            setShowReward(allCompleted);
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

      // Check if all milestones are completed
      const allCompleted = states.every(Boolean);
      setShowReward(allCompleted);
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

        // Check if all milestones are now completed
        const allCompleted = states.every(Boolean);
        if (allCompleted && !showReward) {
          setShowReward(true);
          triggerConfetti();
        }
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

  const triggerConfetti = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#A97CF8", "#F38CB8", "#FDCC92", "#4CAF50", "#2196F3"],
        zIndex: 1000,
      });
    }
  };

  const handleRewardRevealed = () => {
    setRewardRevealed(true);
    triggerConfetti();
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
    <div ref={containerRef}>
      <Card className="mb-6">
        <CardHeader className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              Learning Milestones
              {progress === 100 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </motion.div>
              )}
            </CardTitle>
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
          <div className="w-full h-3 bg-muted rounded-full mb-6 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-2 p-2 rounded-md hover:bg-accent/50 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Checkbox
                  id={`milestone-${index}`}
                  checked={states[index]}
                  onCheckedChange={(checked) => handleChange(index, !!checked)}
                  className={states[index] ? "text-primary" : ""}
                />
                <label
                  htmlFor={`milestone-${index}`}
                  className={`text-sm cursor-pointer flex-1 ${
                    states[index] ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {milestone}
                </label>
                {states[index] && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 10 }}
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {changed && (
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={resetChanges}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button onClick={saveChanges} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AnimatePresence>
        {showReward && !rewardRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <Card className="overflow-hidden border-2 border-primary/50 shadow-lg">
              <CardHeader className="bg-primary/10">
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  Achievement Unlocked!
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </CardTitle>
                <CardDescription className="text-center">
                  Scratch below to reveal your reward
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex justify-center">
                <ScratchToReveal
                  width={300}
                  height={300}
                  minScratchPercentage={50}
                  onComplete={handleRewardRevealed}
                  gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
                  className="rounded-lg overflow-hidden"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-4">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 10, -10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                      }}
                      className="text-6xl mb-4"
                    >
                      🏆
                    </motion.div>
                    <h3 className="text-xl font-bold text-center mb-2">
                      Congratulations!
                    </h3>
                    <p className="text-center text-sm mb-4">
                      You&apos;ve mastered all your learning milestones!
                    </p>
                    <div className="flex justify-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScratchToReveal>
              </CardContent>
              <CardFooter className="bg-primary/5 justify-center pb-4">
                <p className="text-sm text-center text-muted-foreground">
                  Scratch the card to reveal your achievement
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {showReward && rewardRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <Card className="overflow-hidden border-2 border-primary/50 shadow-lg">
              <CardHeader className="bg-primary/10">
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  Achievement Unlocked!
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-4 rounded-lg">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 10, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                    }}
                    className="text-6xl mb-4"
                  >
                    🏆
                  </motion.div>
                  <h3 className="text-xl font-bold text-center mb-2">
                    Congratulations!
                  </h3>
                  <p className="text-center text-sm mb-4">
                    You&apos;ve mastered all your learning milestones!
                  </p>
                  <div className="flex justify-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -5, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.1,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 2,
                        }}
                      >
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      </motion.div>
                    ))}
                  </div>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={triggerConfetti}
                  >
                    Celebrate Again!
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
