import React from "react";
import { Card } from "../../components/ui/Card";
import { formatDateTime } from "../../utils/formatters";
import { Activity, ShieldCheck, UserCheck, Calendar, FileText, CheckCircle2 } from "lucide-react";

export default function CaseActivityTab({ caseData }) {
  const activities = [
    {
      id: "act-1",
      icon: Calendar,
      title: "Appointment Booking Confirmed",
      description: "Consultation confirmed with Dr. Artit Jinawath at Bumrungrad Horizon Regional Cancer Center.",
      time: "2026-09-17 02:20 PM",
      actor: caseData.coordinatorName || "Thura Aung"
    },
    {
      id: "act-2",
      icon: Activity,
      title: "Case Status Updated",
      description: "Status changed to 'Appointment' following hospital confirmation.",
      time: "2026-09-16 11:45 AM",
      actor: caseData.coordinatorName || "Thura Aung"
    },
    {
      id: "act-3",
      icon: FileText,
      title: "Medical Report Reviewed",
      description: "Thorax CT Scan & Biopsy Histopathology report reviewed by medical coordination desk.",
      time: "2026-09-12 10:30 AM",
      actor: "Clinical Review Desk"
    },
    {
      id: "act-4",
      icon: UserCheck,
      title: "Coordinator Assigned",
      description: `Case assigned to lead coordinator ${caseData.coordinatorName || "Thura Aung"}.`,
      time: "2026-09-02 09:00 AM",
      actor: "Intake Automation"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h4 className="font-semibold text-slate-900 text-sm">Case Audit &amp; Event Activity Ledger</h4>
        <p className="text-xs text-slate-500 mt-0.5">Immutable chronology of clinical alterations and status transitions.</p>
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs flex items-start gap-3 text-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
              <act.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{act.title}</span>
                <span className="text-[11px] text-slate-400">{act.time}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{act.description}</p>
              <span className="text-[10px] text-slate-400 block pt-1">Logged by: {act.actor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
