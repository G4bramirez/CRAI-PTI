"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    mrr: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const modalRef = useRef<HTMLDivElement>(null);

  // Fechar modal ao pressionar Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevenir scroll quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Fechar ao clicar fora do modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Lead enviado com sucesso!",
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          mrr: "",
          message: "",
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus({ type: null, message: "" });
        }, 2000);
      } else {
        setSubmitStatus({
          type: "error",
          message:
            data.message || "Erro ao enviar o lead. Tente novamente.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Erro de conexão. Tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md rounded-2xl border border-border-light dark:border-border-dark bg-surface-cream dark:bg-surface-dark p-8 shadow-lg animate-rise">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-display font-semibold text-2xl text-ink dark:text-parchment">
              Agendar Demonstração
            </h2>
            <p className="mt-1 text-sm text-ink/60 dark:text-parchment/60">
              Conheça a CRAI em ação
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="h-8 w-8 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center text-ink/60 dark:text-parchment/60 hover:text-amber transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink dark:text-parchment mb-2">
              Nome Completo
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Seu nome"
              className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-black/20 text-ink dark:text-parchment placeholder:text-ink/40 dark:placeholder:text-parchment/40 focus:outline-none focus:border-amber transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink dark:text-parchment mb-2">
              Email Corporativo
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu.email@empresa.com"
              className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-black/20 text-ink dark:text-parchment placeholder:text-ink/40 dark:placeholder:text-parchment/40 focus:outline-none focus:border-amber transition-colors"
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-ink dark:text-parchment mb-2">
              Empresa
            </label>
            <input
              id="company"
              type="text"
              name="company"
              required
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Nome da sua empresa"
              className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-black/20 text-ink dark:text-parchment placeholder:text-ink/40 dark:placeholder:text-parchment/40 focus:outline-none focus:border-amber transition-colors"
            />
          </div>

          {/* MRR */}
          <div>
            <label htmlFor="mrr" className="block text-sm font-medium text-ink dark:text-parchment mb-2">
              MRR Estimado (R$)
            </label>
            <input
              id="mrr"
              type="text"
              name="mrr"
              required
              value={formData.mrr}
              onChange={handleInputChange}
              placeholder="Ex: 150k, 1M, 500k-1M, etc"
              className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-black/20 text-ink dark:text-parchment placeholder:text-ink/40 dark:placeholder:text-parchment/40 focus:outline-none focus:border-amber transition-colors"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-ink dark:text-parchment mb-2">
              Mensagem (opcional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Conte-nos um pouco sobre seu negócio..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-black/20 text-ink dark:text-parchment placeholder:text-ink/40 dark:placeholder:text-parchment/40 focus:outline-none focus:border-amber transition-colors resize-none"
            />
          </div>

          {/* Status Message */}
          {submitStatus.type && (
            <div
              className={`p-3 rounded-lg text-sm ${
                submitStatus.type === "success"
                  ? "bg-emerald-400/15 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-400/15 text-red-600 dark:text-red-400"
              }`}
            >
              {submitStatus.message}
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
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando...
              </span>
            ) : (
              "Agendar Demonstração"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-xs text-ink/50 dark:text-parchment/50 text-center">
          Respeitamos sua privacidade. Veja nossa <a href="#" className="underline hover:text-amber transition-colors">Política de Privacidade</a>.
        </p>
      </div>
    </div>
  );
}
