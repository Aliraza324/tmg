import React from "react";
import { cn } from "../../utils/cn";

export default function Badge({
  children,
  variant = "slate",
  size = "md",
  className,
  dot = false,
  dotColor
}) {
  const variants = {
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    teal: "bg-teal-50 text-teal-800 border-teal-200",
    primary: "bg-primary-50 text-primary-800 border-primary-200",
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    rose: "bg-rose-50 text-rose-800 border-rose-200",
    sky: "bg-sky-50 text-sky-800 border-sky-200",
    indigo: "bg-indigo-50 text-indigo-800 border-indigo-200"
  };

  const sizes = {
    sm: "text-[11px] px-2 py-0.5 rounded-full font-medium gap-1",
    md: "text-xs px-2.5 py-1 rounded-full font-medium gap-1.5"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center border",
        variants[variant] || variants.slate,
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            dotColor || "bg-current"
          )}
        />
      )}
      {children}
    </span>
  );
}
