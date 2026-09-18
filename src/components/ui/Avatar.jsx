import React from "react";
import { cn } from "../../utils/cn";

export default function Avatar({
  src,
  name = "",
  size = "md",
  className,
  status
}) {
  const sizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl"
  };

  const statusSizes = {
    sm: "w-2 h-2 right-0 bottom-0",
    md: "w-2.5 h-2.5 right-0 bottom-0",
    lg: "w-3 h-3 right-0.5 bottom-0.5",
    xl: "w-4 h-4 right-1 bottom-1"
  };

  const getInitials = (str) => {
    if (!str) return "U";
    const parts = str.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="relative inline-block shrink-0">
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn(
            "rounded-full object-cover border border-slate-200 bg-slate-100",
            sizes[size],
            className
          )}
        />
      ) : (
        <div
          className={cn(
            "rounded-full bg-primary-100 text-primary-800 font-medium flex items-center justify-center border border-primary-200",
            sizes[size],
            className
          )}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          className={cn(
            "absolute rounded-full ring-2 ring-white",
            status === "online" ? "bg-emerald-500" : "bg-slate-400",
            statusSizes[size]
          )}
        />
      )}
    </div>
  );
}
