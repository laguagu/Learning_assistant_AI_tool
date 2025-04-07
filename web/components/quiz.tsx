// components/quiz.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { saveQuizResponses } from "@/lib/supabase/queries";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

// Mock quiz questions
const QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: "How would you rate your experience with AI tools?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
  },
  {
    id: "q2",
    question: "What aspect of AI are you most interested in learning?",
    options: [
      "Prompt Engineering",
      "Business Applications",
      "Technical Implementation",
      "Ethics and Safety",
    ],
  },
  {
    id: "q3",
    question: "How do you prefer to learn new content?",
    options: [
      "Reading Articles",
      "Watching Videos",
      "Practical Exercises",
      "Interactive Discussions",
    ],
  },
];

interface QuizProps {
  userId: string;
  onComplete?: (responses: Record<string, string>) => void;
}

export function Quiz({ userId, onComplete }: QuizProps) {
  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);

  const handleOptionSelect = (questionId: string, option: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    setLoading(true);

    try {
      // Save responses to Supabase using the query function
      const { success, error } = await saveQuizResponses(userId, responses);

      if (!success) {
        throw error || new Error("Failed to save quiz responses");
      }

      toast.success("Quiz completed successfully!");
      setHasCompletedQuiz(true);
      setOpen(false);

      // Call the onComplete callback if provided
      if (onComplete) {
        onComplete(responses);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to save your responses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === QUIZ_QUESTIONS.length - 1;
  const hasSelectedOption = responses[currentQ?.id];
  const progressPercentage = Math.round(
    (currentQuestion / QUIZ_QUESTIONS.length) * 100
  );

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        disabled={hasCompletedQuiz}
        variant={hasCompletedQuiz ? "outline" : "default"}
        className={hasCompletedQuiz ? "flex gap-2 items-center" : ""}
      >
        {hasCompletedQuiz ? (
          <>
            <CheckCircle className="h-4 w-4 text-green-500" />
            Quiz Completed
          </>
        ) : (
          "Take Learning Quiz"
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Learning Preferences Quiz</DialogTitle>
            <DialogDescription>
              This quiz will help us personalize your learning materials. You
              can only take it once.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>
                  Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span>{progressPercentage}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">{currentQ.question}</h3>
                <RadioGroup
                  value={responses[currentQ.id] || ""}
                  onValueChange={(value) =>
                    handleOptionSelect(currentQ.id, value)
                  }
                  className="space-y-3"
                >
                  {currentQ.options.map((option) => (
                    <div
                      key={option}
                      className={`flex items-center space-x-2 p-3 rounded-md border transition-colors ${
                        responses[currentQ.id] === option
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                      }`}
                    >
                      <RadioGroupItem
                        value={option}
                        id={`${currentQ.id}-${option}`}
                      />
                      <Label
                        htmlFor={`${currentQ.id}-${option}`}
                        className="flex-1 cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() =>
                setCurrentQuestion((prev) => Math.max(0, prev - 1))
              }
              disabled={currentQuestion === 0 || loading}
            >
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!hasSelectedOption || loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </span>
              ) : isLastQuestion ? (
                "Complete Quiz"
              ) : (
                "Next Question"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
