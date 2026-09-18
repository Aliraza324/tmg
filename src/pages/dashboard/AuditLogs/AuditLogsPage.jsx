import React from "react";
import { MOCK_AUDIT_LOGS } from "../../../data/auditLogs";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/tables/DataTable";
import Badge from "../../../components/ui/Badge";
import { formatDateTime } from "../../../utils/formatters";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export default function AuditLogsPage() {
  const columns = [
    {
      key: "timestamp",
      label: "Timestamp (ICT)",
      render: (row) => (
        <span className="font-mono text-xs text-slate-600">
          {formatDateTime(row.timestamp)}
        </span>
      )
    },
    {
      key: "userName",
      label: "Staff / Actor",
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block text-xs">{row.userName}</span>
          <span className="text-[10px] text-slate-400">{row.userRole}</span>
        </div>
      )
    },
    {
      key: "action",
      label: "Operation Event",
      render: (row) => (
        <Badge variant="teal" size="sm">
          {row.action}
        </Badge>
      )
    },
    {
      key: "resourceType",
      label: "Target Resource",
      render: (row) => (
        <span className="text-xs font-medium text-slate-800">
          {row.resourceType} ({row.resourceId})
        </span>
      )
    },
    {
      key: "description",
      label: "Event Description",
      render: (row) => (
        <span className="text-xs text-slate-600 truncate max-w-md block">
          {row.description}
        </span>
      )
    },
    {
      key: "ipAddress",
      label: "IP & Origin",
      render: (row) => (
        <span className="font-mono text-[11px] text-slate-400">
          {row.ipAddress}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compliance &amp; Security Audit Ledger"
        subtitle="Immutable security trail of clinical records, appointments, and coordinator allocations"
        breadcrumbs={[{ label: "Audit Logs" }]}
      />

      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0" />
        <span>
          Audit logs are cryptographically sealed and accessible only to Super Admin accounts to satisfy health information compliance standards.
        </span>
      </div>

      <DataTable columns={columns} data={MOCK_AUDIT_LOGS} />
    </div>
  );
}
