import React from "react";
import { STATUS_CONFIG, PRIORITY_CONFIG } from "../../constants/statuses";
import { AlertCircle, Clock, Activity, CheckCircle } from "lucide-react";
import { cn } from "../../utils/cn";

export function CaseStatusBadge({ status, className }) {
  const config = STATUS_CONFIG[status] || {
    label: status || "Unknown",
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    dot: "bg-slate-400"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", config.dot)} />
      {config.label}
    </span>
  );
}

export function CasePriorityBadge({ priority, className }) {
  const config = PRIORITY_CONFIG[priority] || {
    label: priority || "Normal",
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    icon: "Activity"
  };

  const icons = {
    AlertCircle: <AlertCircle className="w-3 h-3 shrink-0 text-rose-600" />,
    Clock: <Clock className="w-3 h-3 shrink-0 text-amber-600" />,
    Activity: <Activity className="w-3 h-3 shrink-0 text-teal-600" />,
    CheckCircle: <CheckCircle className="w-3 h-3 shrink-0 text-slate-500" />
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {icons[config.icon]}
      {config.label}
    </span>
  );
}
