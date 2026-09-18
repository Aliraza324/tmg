import React from "react";
import Badge from "../../../components/ui/Badge";
import { ShieldCheck, Lock, EyeOff, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <Badge variant="teal" size="md">Data Governance</Badge>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">Patient Privacy Policy &amp; Security</h1>
        <p className="text-xs text-slate-500 mt-1">Last Updated: September 18, 2026</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Medical Information Confidentiality</h2>
          <p>
            TMG Healthcare treats all medical records, pathology slides, CT/MRI imaging scans, physician notes, and personal identification documents with the highest degree of confidentiality. Your health information is processed strictly for the sole purpose of facilitating medical review with licensed healthcare providers in Thailand.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Data Sharing With Thai Hospital Partners</h2>
          <p>
            Your clinical files are disclosed exclusively to accredited hospital partner international medical review teams (e.g. Bumrungrad, BDMS, MedPark, Samitivej, Siriraj) upon your explicit authorization. We never sell, monetize, or disclose patient data to commercial third parties, marketers, or unverified entities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Encryption &amp; Security Standards</h2>
          <p>
            Uploaded medical documents are encrypted both in transit (TLS 1.3) and at rest (AES-256). Coordinator access is governed by strict Role-Based Access Control (RBAC) and audited via immutable administrative logs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Right to Deletion &amp; File Retrieval</h2>
          <p>
            Patients maintain the legal right to request the permanent deletion of their uploaded medical files from TMG active storage at any time by contacting privacy@tmghealthcare.com.
          </p>
        </section>
      </div>
    </div>
  );
}
