import React from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_SPECIALTIES } from "../../../data/specialties";
import { MOCK_HOSPITALS } from "../../../data/hospitals";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import { Card } from "../../../components/ui/Card";
import { ArrowLeft, CheckCircle2, Building2, ArrowRight, Stethoscope } from "lucide-react";

export default function SpecialtyDetailPage() {
  const { slug } = useParams();
  const specialty = MOCK_SPECIALTIES.find((s) => s.slug === slug || s.id === slug);

  if (!specialty) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Specialty Not Found</h2>
        <Link to="/specialties" className="mt-4 inline-block text-primary-700 hover:underline">
          Return to Specialties Directory
        </Link>
      </div>
    );
  }

  // Find partner hospitals offering this specialty
  const matchedHospitals = MOCK_HOSPITALS.filter((h) =>
    h.specialties.some((s) => s.toLowerCase().includes(specialty.name.split(" ")[0].toLowerCase()))
  );

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Link to="/specialties" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800">
        <ArrowLeft className="w-4 h-4" /> Back to All Specialties
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <Badge variant="teal" size="md">{specialty.category}</Badge>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{specialty.name}</h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {specialty.description}
        </p>

        <div className="pt-4 flex flex-wrap gap-3">
          <Link to="/guidance-request">
            <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
              Request Specialist Consultation
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Advanced Procedures &amp; Therapies Offered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specialty.servicesOffered.map((srv) => (
                <div key={srv} className="flex items-start gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-sm font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
                  <span>{srv}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Common Clinical Indications</h2>
            <div className="flex flex-wrap gap-2">
              {specialty.commonConditions.map((cond) => (
                <span key={cond} className="px-3 py-1.5 rounded-md bg-teal-50 text-teal-900 text-xs font-medium border border-teal-200">
                  {cond}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Key Hospitals for {specialty.name}</h3>
            <div className="space-y-3">
              {(matchedHospitals.length > 0 ? matchedHospitals : MOCK_HOSPITALS.slice(0, 3)).map((h) => (
                <div key={h.id} className="p-3 rounded-lg border border-slate-100 hover:border-slate-300 transition">
                  <h4 className="font-semibold text-slate-900 text-xs">{h.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{h.district}, Bangkok</p>
                  <Link to={`/hospitals/${h.slug}`} className="text-[11px] font-semibold text-primary-700 hover:underline mt-1 block">
                    View Department →
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
