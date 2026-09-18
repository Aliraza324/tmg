import React from "react";
import { cn } from "../../utils/cn";

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "bg-white border border-slate-200/90 rounded-lg shadow-xs overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, title, subtitle, action }) {
  return (
    <div
      className={cn(
        "px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-4",
        className
      )}
    >
      <div>
        {title && <h3 className="font-semibold text-slate-900">{title}</h3>}
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        {children}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardContent({ children, className }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return (
    <div
      className={cn(
        "px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500",
        className
      )}
    >
      {children}
    </div>
  );
}
