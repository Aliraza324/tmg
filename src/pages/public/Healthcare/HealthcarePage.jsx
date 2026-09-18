import React from "react";
import { Link } from "react-router-dom";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Plane, FileText, CheckCircle2, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";

export default function HealthcarePage() {
  const topics = [
    {
      title: "Thailand Medical Visa (Non-O / MT)",
      slug: "medical-visa",
      desc: "Step-by-step instructions on obtaining medical visa invitation letters and family caregiver visas through Thai embassy channels in Yangon."
    },
    {
      title: "Hospital Admission & Payment Navigation",
      slug: "admission-payment",
      desc: "Information regarding international credit cards, currency conversion rules, hospital escrow deposits, and inpatient admission checklists."
    },
    {
      title: "Medical Record Preparation Checklist",
      slug: "record-preparation",
      desc: "Essential DICOM CT/MRI disc formats, histopathology slides, and English translation tips for doctors in Bangkok."
    },
    {
      title: "Traveling With Oxygen & Chronic Illness",
      slug: "travel-logistics",
      desc: "Flight carrier medical clearance (MEDIF) protocols for air travel from Yangon or Mandalay to Suvarnabhumi Airport."
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="teal" size="md">Patient Knowledge Base</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Healthcare in Thailand: Practical Patient Guide</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Essential practical guidance, travel preparation, and legal medical knowledge for patients traveling from Myanmar to Bangkok.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((t) => (
          <Card key={t.slug} className="p-6 space-y-4 hover:border-primary-300 transition">
            <h3 className="font-bold text-slate-900 text-lg">{t.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.desc}</p>
            <Link to={`/healthcare/${t.slug}`} className="text-xs font-semibold text-primary-700 hover:text-primary-900 inline-flex items-center gap-1">
              Read Complete Guide <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        ))}
      </div>

      <div className="bg-primary-50 rounded-xl p-6 border border-primary-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-primary-950 text-base">Unsure about your medical visa or flight timing?</h4>
          <p className="text-xs text-primary-800 mt-1">Our coordinators can review your documents and assist with fast-track hospital invitations.</p>
        </div>
        <Link to="/guidance-request" className="shrink-0">
          <Button variant="primary" size="md">
            Ask a Coordinator
          </Button>
        </Link>
      </div>
    </div>
  );
}
