"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      // TODO: Implementar autenticação real com seu backend
      // Por enquanto, simular login
      if (!email || !password) {
        throw new Error("Email e senha são obrigatórios");
      }

      if (!email.includes("@")) {
        throw new Error("Email inválido");
      }

      if (password.length < 6) {
        throw new Error("Senha deve ter pelo menos 6 caracteres");
      }

      // Simular sucesso
      setStatus({
        type: "success",
        message: "Login realizado com sucesso! Redirecionando...",
      });

      // TODO: Redirecionar para dashboard após login real
      setTimeout(() => {
        // window.location.href = "/dashboard";
      }, 1500);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Erro ao fazer login. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-5 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <Image
            src="/logo_crai.png"
            alt="CRAI"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-display font-semibold text-xl text-ink dark:text-parchment">
            CRAI
          </span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display font-semibold text-3xl text-ink dark:text-parchment mb-2">
            Bem-vindo de Volta
          </h1>
          <p className="text-sm text-ink/60 dark:text-parchment/60">
            Faça login para acessar seu painel de controle
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-ink dark:text-parchment mb-2"
            >
              Email Corporativo
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@empresa.com"
              className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-black/20 text-ink dark:text-parchment placeholder:text-ink/40 dark:placeholder:text-parchment/40 focus:outline-none focus:border-amber transition-colors"
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-ink dark:text-parchment"
              >
                Senha
              </label>
              <Link
                href="#"
                className="text-xs text-amber hover:text-amber-light transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-black/20 text-ink dark:text-parchment placeholder:text-ink/40 dark:placeholder:text-parchment/40 focus:outline-none focus:border-amber transition-colors"
              disabled={isLoading}
            />
          </div>

          {/* Status Message */}
          {status.type && (
            <div
              className={`p-3 rounded-lg text-sm ${
                status.type === "success"
                  ? "bg-emerald-400/15 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-400/15 text-red-600 dark:text-red-400"
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 rounded-full bg-amber-gradient text-espresso font-semibold text-sm flex items-center justify-center hover:brightness-105 active:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-light dark:border-border-dark" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-surface-cream dark:bg-espresso text-ink/50 dark:text-parchment/50">
              Ou
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-ink/60 dark:text-parchment/60 mb-4">
            Não tem conta?{" "}
            <Link
              href="#"
              className="text-amber hover:text-amber-light font-medium transition-colors"
            >
              Solicitar acesso
            </Link>
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-amber hover:text-amber-light transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Voltar para home
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark text-xs text-ink/40 dark:text-parchment/40 text-center">
          <p>
            Este é um formulário de login de demonstração. Para implementar
            autenticação real, conecte seu backend de autenticação (NextAuth,
            Auth0, Supabase, etc).
          </p>
        </div>
      </div>
    </div>
  );
}
