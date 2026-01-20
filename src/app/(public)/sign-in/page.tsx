"use client";

import { useState } from "react";
import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function SignInPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <main className="relative">
      {errorMessage && (
        <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4">
          <Alert
            variant="destructive"
            className="shadow-lg animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {errorMessage}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {isLogin ? (
        <LoginForm
          onErrorAction={setErrorMessage}
          onToggleAction={() => {
            setIsLogin(false);
            setErrorMessage("");
          }}
        />
      ) : (
        <SignupForm
          onErrorAction={setErrorMessage}
          onToggleAction={() => {
            setIsLogin(true);
            setErrorMessage("");
          }}
        />
      )}
    </main>
  );
}
