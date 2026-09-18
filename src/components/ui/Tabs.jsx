import React from "react";
import { cn } from "../../utils/cn";

export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  className,
  variant = "underline"
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 border-b border-slate-200 overflow-x-auto no-scrollbar",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-3.5 py-2.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 -mb-[2px] flex items-center gap-2 cursor-pointer",
              isActive
                ? "border-primary-700 text-primary-900 font-semibold"
                : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
            )}
          >
            {tab.icon && <tab.icon className="w-4 h-4" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full",
                  isActive
                    ? "bg-primary-100 text-primary-800"
                    : "bg-slate-100 text-slate-600"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
