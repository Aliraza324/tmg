import React from "react";
import { useParams, Link } from "react-router-dom";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export default function HealthcareDetailPage() {
  const { slug } = useParams();

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Link to="/healthcare" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800">
        <ArrowLeft className="w-4 h-4" /> Back to Healthcare Guides
      </Link>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">
        <Badge variant="teal" size="md">Patient Advisory Guide</Badge>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 capitalize">
          {slug?.replace(/-/g, " ")}: Guidelines for Myanmar Patients
        </h1>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            When traveling from Myanmar to Bangkok for specialized hospital treatment, proper preparation guarantees timely medical attention and eliminates unnecessary airport or immigration delays.
          </p>

          <h3 className="text-base font-bold text-slate-900 pt-2">Essential Document Requirements</h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Valid passport with at least 6 months remaining before expiry date.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Original doctor referral letters, discharge summaries, and biopsy slides (if applicable).</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Digital copies of DICOM CD/DVD images for CT, MRI, and PET scans.</span>
            </li>
          </ul>

          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              Please inform our coordination team in advance if the patient requires continuous supplemental oxygen, stretcher flight support, or Suvarnabhumi Airport ambulance tarmac pickup.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
          <Link to="/healthcare" className="text-xs font-semibold text-slate-600 hover:text-slate-900">
            ← Back to Overview
          </Link>
          <Link to="/guidance-request">
            <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
              Get Personal Assistance
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
