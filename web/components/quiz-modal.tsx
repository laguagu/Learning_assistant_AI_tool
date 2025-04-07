// components/quiz-modal.tsx
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
import { createClient } from "@supabase/supabase-js";
import { CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// Initialize Supabase client
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Quiz questions
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
  {
    id: "q4",
    question: "What is your primary goal for this learning program?",
    options: [
      "Apply AI in my current role",
      "Start a new AI project/business",
      "General knowledge",
      "Share knowledge with my team",
    ],
  },
  {
    id: "q5",
    question: "How much time can you dedicate to learning each week?",
    options: [
      "Less than 2 hours",
      "2-5 hours",
      "5-10 hours",
      "More than 10 hours",
    ],
  },
];

interface QuizModalProps {
  userId: string;
  onComplete?: () => void;
}

export function QuizModal({ userId, onComplete }: QuizModalProps) {
  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [quizEnabled, setQuizEnabled] = useState(false);

  // Check if user has already completed the quiz and if quiz is enabled
  useEffect(() => {
    const checkQuizStatus = async () => {
      try {
        setCheckingStatus(true);

        // Check if quiz feature is enabled from environment variable
        const quizEnabledEnv = process.env.NEXT_PUBLIC_ENABLE_QUIZ !== "false";
        setQuizEnabled(quizEnabledEnv);

        if (!quizEnabledEnv) {
          setCheckingStatus(false);
          return;
        }

        // Check if user has already taken the quiz
        const { data, error } = await supabase
          .from("quiz_responses")
          .select("*")
          .eq("user_id", userId)
          .maybeSingle();

        if (error && error.code !== "PGRST116") {
          console.error("Error checking quiz status:", error);
          toast.error("Failed to check quiz status");
        }

        // Set the completed state based on whether we found a record
        setHasCompletedQuiz(!!data);
      } catch (error) {
        console.error("Error checking quiz status:", error);
      } finally {
        setCheckingStatus(false);
      }
    };

    if (userId) {
      checkQuizStatus();
    }
  }, [userId]);

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
      // Process responses to determine recommendations
      const results = processResponses(responses);

      // Save responses to Supabase
      const { error } = await supabase.from("quiz_responses").insert({
        user_id: userId,
        responses,
        results,
        completed_at: new Date().toISOString(),
      });

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          toast.error("You have already completed this quiz");
        } else {
          console.error("Error saving quiz:", error);
          throw new Error("Failed to save quiz responses");
        }
      } else {
        toast.success("Quiz completed successfully!");
        setHasCompletedQuiz(true);
        setOpen(false);

        // Call the onComplete callback if provided
        if (onComplete) {
          onComplete();
        }
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Simple function to process responses and determine learning materials
  const processResponses = (responses: Record<string, string>) => {
    // Extract experience level from question 1
    const experienceLevel = responses.q1 || "Mixed";

    // Extract primary interest from question 2
    const primaryInterest = responses.q2 || "Varied";

    // Extract learning style from question 3
    const learningStyle = responses.q3 || "Mixed";

    // Calculate learning path based on responses
    const learningPath = [];

    // Add materials based on experience level
    if (experienceLevel === "Beginner") {
      learningPath.push("fundamentals", "basic-concepts");
    } else if (experienceLevel === "Intermediate") {
      learningPath.push("intermediate-techniques", "applied-examples");
    } else if (experienceLevel === "Advanced" || experienceLevel === "Expert") {
      learningPath.push("advanced-concepts", "research-papers");
    }

    // Add materials based on primary interest
    if (primaryInterest === "Prompt Engineering") {
      learningPath.push("prompt-design", "prompt-patterns");
    } else if (primaryInterest === "Business Applications") {
      learningPath.push("business-cases", "roi-analysis");
    } else if (primaryInterest === "Technical Implementation") {
      learningPath.push("api-integration", "technical-guides");
    } else if (primaryInterest === "Ethics and Safety") {
      learningPath.push("ethics-guidelines", "governance");
    }

    // Add materials based on learning style
    if (learningStyle === "Reading Articles") {
      learningPath.push("articles", "whitepapers");
    } else if (learningStyle === "Watching Videos") {
      learningPath.push("video-tutorials", "webinars");
    } else if (learningStyle === "Practical Exercises") {
      learningPath.push("hands-on-exercises", "projects");
    } else if (learningStyle === "Interactive Discussions") {
      learningPath.push("discussion-topics", "debate-questions");
    }

    return {
      experienceLevel,
      primaryInterest,
      learningStyle,
      recommendedMaterials: learningPath,
    };
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === QUIZ_QUESTIONS.length - 1;
  const hasSelectedOption = responses[currentQ?.id];
  const progressPercentage = Math.round(
    (currentQuestion / QUIZ_QUESTIONS.length) * 100
  );

  if (checkingStatus) {
    return (
      <Button variant="outline" disabled className="flex gap-2 items-center">
        <Loader2 className="h-4 w-4 animate-spin" />
        Checking quiz status...
      </Button>
    );
  }

  // Don't render anything if quiz is disabled
  if (!quizEnabled) {
    return null;
  }

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
