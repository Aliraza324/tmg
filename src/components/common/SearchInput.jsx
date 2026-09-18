import React from "react";
import { Search, X } from "lucide-react";
import { cn } from "../../utils/cn";

export default function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  className
}) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 pl-9 pr-8 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20 transition-all"
      />
      {value && (
        <button
          onClick={onClear || (() => onChange(""))}
          className="absolute right-2.5 p-0.5 text-slate-400 hover:text-slate-600 rounded transition"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
