import React from "react";
import Breadcrumb from "./Breadcrumb";
import { cn } from "../../utils/cn";

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
  badge,
  className
}) {
  return (
    <div className={cn("mb-6 space-y-2", className)}>
      {breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} className="mb-2" />}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
            {badge && <div>{badge}</div>}
          </div>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>

        {actions && (
          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
