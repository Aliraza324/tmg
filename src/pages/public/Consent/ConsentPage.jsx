import React from "react";
import Badge from "../../../components/ui/Badge";
import { CheckCircle2, ShieldAlert } from "lucide-react";

export default function ConsentPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <Badge variant="teal" size="md">Patient Agreement</Badge>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">Informed Medical Coordination Consent</h1>
        <p className="text-xs text-slate-500 mt-1">Version 2.4 — September 2026</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 text-sm text-slate-700 leading-relaxed">
        <div className="p-4 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-950 font-medium">
          By engaging TMG Healthcare coordination services and submitting medical inquiries, the patient or legal guardian confirms agreement with the following clinical facilitation terms.
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Nature of TMG Coordination Services</h2>
          <p>
            I acknowledge that TMG Healthcare is an independent cross-border patient facilitator and medical liaison agency. TMG does not operate as a hospital or medical clinic, does not provide medical diagnosis, and does not prescribe medication. All medical opinions, treatment decisions, and surgical recommendations are solely the professional responsibility of the attending physicians at the selected Thai hospitals.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Authorization for Clinical Document Transmission</h2>
          <p>
            I authorize TMG Healthcare to review my submitted medical history, lab results, biopsy reports, and imaging discs, and to transmit these documents to relevant specialist departments across partner hospitals in Thailand for the purpose of obtaining medical evaluations and appointment confirmations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Non-Guaranteed Medical Outcomes</h2>
          <p>
            I understand that clinical assessments and cost estimations provided by hospitals are preliminary estimates based on available documents and may change upon physical examination and in-person diagnostic workup in Bangkok. TMG cannot guarantee clinical outcomes, physician availability, or treatment success.
          </p>
        </section>
      </div>
    </div>
  );
}
