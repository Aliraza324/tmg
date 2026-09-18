import React from "react";
import { Card } from "../../components/ui/Card";
import { formatDate } from "../../utils/formatters";
import { CheckCircle2, Circle, Clock, FileText, Building2, User, Phone } from "lucide-react";

export default function CaseOverviewTab({ caseData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left 2 cols: Clinical Summary & Visual Timeline */}
      <div className="lg:col-span-2 space-y-6">
        {/* Clinical Narrative Summary */}
        <Card className="p-5 space-y-3">
          <h4 className="font-semibold text-slate-900 text-sm">Clinical Intake Summary</h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
            {caseData.clinicalSummary}
          </p>
          {caseData.urgencyReason && (
            <div className="text-xs text-amber-800 bg-amber-50 p-3 rounded-md border border-amber-200">
              <strong className="font-semibold">Urgency Justification:</strong> {caseData.urgencyReason}
            </div>
          )}
        </Card>

        {/* Visual Case Lifecycle Timeline (Section 30) */}
        <Card className="p-5 space-y-4">
          <h4 className="font-semibold text-slate-900 text-sm">Case Coordination Progress</h4>
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {caseData.timeline?.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-3 text-xs">
                <div
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-emerald-600 text-white"
                      : "bg-white border-2 border-slate-300 text-slate-400"
                  }`}
                >
                  {step.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-2.5 h-2.5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${step.completed ? "text-slate-900" : "text-slate-500"}`}>
                      {step.stage}
                    </span>
                    <span className="text-[11px] text-slate-400">{step.timestamp}</span>
                  </div>
                  {step.actor && <span className="text-[11px] text-slate-500 block mt-0.5">By: {step.actor}</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right Column: Key Details Sidebar */}
      <div className="space-y-6">
        <Card className="p-5 space-y-3 text-xs">
          <h4 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Case Metadata
          </h4>
          <div className="space-y-2.5 divide-y divide-slate-100">
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Referral Channel</span>
              <span className="font-medium text-slate-800">{caseData.referralSource}</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Intake Date</span>
              <span className="font-medium text-slate-800">{formatDate(caseData.createdDate)}</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Language Preferred</span>
              <span className="font-medium text-slate-800">{caseData.preferredLanguage}</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Assigned Doctor</span>
              <span className="font-medium text-slate-800 text-right">{caseData.assignedDoctor || "Pending hospital confirmation"}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
