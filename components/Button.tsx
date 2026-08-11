import React from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-bold rounded-lg transition-all active:scale-95 duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary-container text-on-primary hover:shadow-[0_0_20px_rgba(239,147,17,0.4)]",
    secondary:
      "border border-outline-variant/30 text-on-surface hover:bg-surface-container-high",
    tertiary: "text-on-surface-variant hover:text-primary",
  };

  const sizes = {
    sm: "px-md py-xs text-label-md",
    md: "px-lg py-md text-body-md",
    lg: "px-3xl py-md text-body-md",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`;

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={combinedClassName}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}
