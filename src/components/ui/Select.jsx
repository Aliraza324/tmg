import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { ChevronDown } from "lucide-react";

const Select = forwardRef(function Select(
  {
    label,
    options = [],
    error,
    helperText,
    className,
    required = false,
    id,
    placeholder = "Select an option",
    ...props
  },
  ref
) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="text-rose-600 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full h-10 px-3.5 pr-10 bg-white border rounded-lg text-sm text-slate-900 transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:bg-slate-50 disabled:cursor-not-allowed",
            error
              ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
              : "border-slate-300 focus:border-primary-600",
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const val = typeof opt === "string" ? opt : opt.value;
            const lbl = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
});

export default Select;
