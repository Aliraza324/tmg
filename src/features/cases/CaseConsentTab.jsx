import React from "react";
import { Card } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { formatDate } from "../../utils/formatters";
import { ShieldCheck, CheckCircle2, FileCheck } from "lucide-react";

export default function CaseConsentTab({ caseData }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h4 className="font-semibold text-slate-900 text-sm">Patient Informed Consent &amp; Disclosure Status</h4>
        <p className="text-xs text-slate-500 mt-0.5">Verified legal permissions recorded during case onboarding.</p>
      </div>

      <Card className="p-6 space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h5 className="font-bold text-slate-900 text-sm">Active Consent Ledger</h5>
          </div>
          <Badge variant="emerald" size="sm">Valid &amp; Authorized</Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Cross-Border Healthcare Coordination Authorization</span>
              <p className="text-slate-600 mt-0.5">
                Authorized TMG Healthcare to transmit medical summaries, imaging, and biopsy slides to partner hospitals in Bangkok.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Patient Privacy Policy &amp; PDPA Compliance Acceptance</span>
              <p className="text-slate-600 mt-0.5">
                Accepted digital data protection and encrypted record transmission protocols.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Bilingual Communication Consent</span>
              <p className="text-slate-600 mt-0.5">
                Consented to phone and messenger correspondence in Burmese for all appointments and travel updates.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-between text-slate-500">
          <span>Signed At: {formatDate(caseData.createdDate)}</span>
          <span>Verified By: Digital Audit Signature</span>
        </div>
      </Card>
    </div>
  );
}
