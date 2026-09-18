import React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "../../utils/cn";
import EmptyState from "../common/EmptyState";
import { TableSkeleton } from "../common/SkeletonLoader";
import { MedicalECGLoader } from "../common/Loader";

export default function DataTable({
  columns = [],
  data = [],
  isLoading = false,
  emptyTitle = "No records found",
  emptyDescription = "Try changing your search keywords or active filters.",
  emptyAction,
  sortColumn,
  sortDirection,
  onSort,
  className
}) {
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-lg border border-slate-200 p-12 flex flex-col items-center justify-center min-h-[280px]">
        <MedicalECGLoader size="md" />
        <p className="text-xs font-semibold text-slate-700 mt-3">Loading clinical records...</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Fetching coordinated patient information</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  return (
    <div className={cn("w-full bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700 divide-y divide-slate-200">
          <thead className="bg-slate-50/90 text-xs font-semibold text-slate-600 uppercase tracking-wider select-none">
            <tr>
              {columns.map((col) => {
                const isSortable = col.sortable && onSort;
                const isCurrentSort = sortColumn === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    onClick={() => isSortable && onSort(col.key)}
                    className={cn(
                      "px-4 py-3.5 whitespace-nowrap",
                      col.align === "right" ? "text-right" : "text-left",
                      col.align === "center" ? "text-center" : "",
                      isSortable ? "cursor-pointer hover:bg-slate-100/80 transition-colors" : "",
                      col.headerClassName
                    )}
                  >
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5",
                        col.align === "right" ? "justify-end w-full" : ""
                      )}
                    >
                      <span>{col.label}</span>
                      {isSortable && (
                        <span className="text-slate-400">
                          {isCurrentSort ? (
                            sortDirection === "asc" ? (
                              <ArrowUp className="w-3.5 h-3.5 text-primary-700" />
                            ) : (
                              <ArrowDown className="w-3.5 h-3.5 text-primary-700" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((row, index) => (
              <tr
                key={row.id || index}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-4 py-3.5 whitespace-nowrap text-slate-700",
                      col.align === "right" ? "text-right" : "text-left",
                      col.align === "center" ? "text-center" : "",
                      col.className
                    )}
                  >
                    {col.render ? col.render(row, index) : row[col.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
