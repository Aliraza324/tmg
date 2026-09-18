import React from "react";
import { cn } from "../../utils/cn";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className,
  type = "button",
  icon: Icon,
  iconPosition = "left",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

  const variants = {
    primary:
      "bg-primary-700 hover:bg-primary-800 text-white shadow-xs focus:ring-primary-600 border border-transparent",
    secondary:
      "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs focus:ring-primary-500",
    ghost:
      "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus:ring-slate-400",
    danger:
      "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 focus:ring-rose-500",
    outlineTeal:
      "bg-transparent hover:bg-primary-50 text-primary-700 border border-primary-600 focus:ring-primary-500"
  };

  const sizes = {
    sm: "text-xs px-2.5 py-1.5 rounded-md gap-1.5 h-8",
    md: "text-sm px-3.5 py-2 rounded-lg gap-2 h-10",
    lg: "text-base px-5 py-2.5 rounded-lg gap-2.5 h-12"
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : Icon && iconPosition === "left" ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}

      <span>{children}</span>

      {!isLoading && Icon && iconPosition === "right" && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
}
