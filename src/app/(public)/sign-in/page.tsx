"use client";

import { useState } from "react";
import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";

export default function SignInPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <main className="bg-[#f7f7f7] min-h-screen flex items-center justify-center text-[#1a1a1a] p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-(--color-roxo) mb-2">
            Connective
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? "Faça login na sua conta" : "Crie sua conta"}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive text-destructive rounded-md text-sm">
            {errorMessage}
          </div>
        )}

        {isLogin ? (
          <LoginForm onError={setErrorMessage} />
        ) : (
          <SignupForm onError={setErrorMessage} />
        )}

        <div className="mt-6 text-center text-sm">
          {isLogin ? "Não tem conta? " : "Já tem conta? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMessage("");
            }}
            className="text-(--color-roxo) font-medium hover:underline"
          >
            {isLogin ? "Registre-se" : "Faça login"}
          </button>
        </div>
      </div>
    </main>
  );
}
