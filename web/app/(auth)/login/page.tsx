"use client";

import { PasswordInput } from "@/components/password-input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginUser } from "../login-actions";

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign in"
      )}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginUser, {
    errors: {},
    message: "",
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-secondary/20">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="flex flex-col w-full max-w-md px-4"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">UPBEAT</h1>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="my-2">
            {state?.message && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            <form action={formAction} className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    autoCapitalize="none"
                    required
                  />
                  {state?.errors?.email && (
                    <p className="text-destructive text-sm">
                      {state.errors.email.join(", ")}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <PasswordInput
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  {state?.errors?.password && (
                    <p className="text-destructive text-sm">
                      {state.errors.password.join(", ")}
                    </p>
                  )}
                </div>

                <SubmitButton />
              </div>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            <p className="w-full">
              Enter your credentials to access UPBEAT Learning Assistant
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
