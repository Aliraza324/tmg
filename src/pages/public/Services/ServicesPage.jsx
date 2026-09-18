import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  MessageSquareQuote,
  Building,
  Plane,
  HeartPulse,
  PhoneCall,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Button from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

export default function ServicesPage() {
  const services = [
    {
      title: "Medical Report Review & Hospital Matching",
      icon: FileText,
      desc: "Our bilingual clinical intake team translates and submits your medical scans and lab results to accredited Thai hospital specialist departments to acquire treatment plans and cost estimations."
    },
    {
      title: "In-Person Burmese Medical Translation",
      icon: MessageSquareQuote,
      desc: "A dedicated TMG patient coordinator accompanies you inside the hospital for all doctor consultations, procedures, and discharge briefings, ensuring total clinical clarity."
    },
    {
      title: "Medical Visa & Travel Logistics Assistance",
      icon: Plane,
      desc: "We coordinate official hospital invitation letters required for Thai Medical Visa applications (Non-Immigrant MT/O), plus wheelchair-assisted airport transfers in Bangkok."
    },
    {
      title: "Post-Discharge & Cross-Border Follow-up",
      icon: HeartPulse,
      desc: "Once back in Myanmar, we coordinate laboratory reviews, remote specialist check-ins, and local medication courier refills so your recovery is uninterrupted."
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="teal" size="md">Patient Care Services</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Comprehensive Patient Coordination</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          From the initial doctor inquiry in Myanmar to full hospital recovery in Bangkok, TMG handles every coordination detail without medical consultation markup.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((srv, idx) => (
          <Card key={srv.title} className="p-6 sm:p-8 space-y-4 hover:border-primary-300 transition">
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center">
              <srv.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{srv.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{srv.desc}</p>
          </Card>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Have specific medical questions?</h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Contact our bilingual coordinators directly or request our free guidance service.
        </p>
        <Link to="/guidance-request">
          <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
            Request Guidance
          </Button>
        </Link>
      </div>
    </div>
  );
}
