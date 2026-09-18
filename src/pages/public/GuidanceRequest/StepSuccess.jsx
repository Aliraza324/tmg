import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Copy, ArrowRight, MessageCircle } from "lucide-react";
import Button from "../../../components/ui/Button";

export default function StepSuccess({ referenceCode, patientName, coordinatorName = "Thura Aung" }) {
  const [copied, setCopied] = React.useState(false);

  const copyCode = () => {
    if (referenceCode) {
      navigator.clipboard.writeText(referenceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="text-center py-8 space-y-6 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Request Submitted Successfully
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Thank you, <strong className="text-slate-800">{patientName || "Patient"}</strong>. Your medical inquiry has been safely received. A TMG senior medical coordinator has been assigned to your case.
        </p>
      </div>

      {/* Case Reference Code Badge */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Your Case Tracking Reference
          </span>
          <span className="text-lg font-mono font-bold text-primary-900 block">
            {referenceCode || "TMG-2026-000123"}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white border border-transparent hover:border-slate-200 transition text-xs flex items-center gap-1 cursor-pointer"
          title="Copy reference code"
        >
          <Copy className="w-4 h-4" />
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>

      <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-950 text-left space-y-1.5">
        <strong className="block font-semibold">What happens next?</strong>
        <p className="text-slate-600">
          1. Assigned coordinator <strong>{coordinatorName}</strong> will review your clinical history.
        </p>
        <p className="text-slate-600">
          2. We will contact you via Viber or phone within 24 hours to confirm your treatment goals and discuss suitable hospital specialists.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link to="/" className="w-full sm:w-auto">
          <Button variant="secondary" size="md" className="w-full">
            Back to Home
          </Button>
        </Link>
        <Link to="/hospitals" className="w-full sm:w-auto">
          <Button variant="primary" size="md" className="w-full" icon={ArrowRight} iconPosition="right">
            Browse Hospitals
          </Button>
        </Link>
      </div>
    </div>
  );
}
