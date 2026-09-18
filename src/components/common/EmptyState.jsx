import React from "react";
import { FolderSearch, Inbox, FileX } from "lucide-react";
import { cn } from "../../utils/cn";

export default function EmptyState({
  title = "No records found",
  description = "There are currently no items matching your criteria.",
  icon: Icon = Inbox,
  action,
  className,
  searchQuery
}) {
  const displayTitle = searchQuery ? `No results found for "${searchQuery}"` : title;
  const displayDesc = searchQuery
    ? "Check your spelling or try clearing active filters to see all records."
    : description;
  const DisplayIcon = searchQuery ? FolderSearch : Icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white border border-dashed border-slate-200 rounded-xl",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-3">
        <DisplayIcon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{displayTitle}</h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1 mb-4">{displayDesc}</p>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
