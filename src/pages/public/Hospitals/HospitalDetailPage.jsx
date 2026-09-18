import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { hospitalService } from "../../../services/hospitalService";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import { Card } from "../../../components/ui/Card";
import { TableSkeleton } from "../../../components/common/SkeletonLoader";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Languages,
  Building,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

export default function HospitalDetailPage() {
  const { slug } = useParams();
  const [hospital, setHospital] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    hospitalService
      .getHospitalBySlug(slug)
      .then((data) => {
        if (isMounted) {
          setHospital(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="py-12 max-w-5xl mx-auto px-4">
        <TableSkeleton rows={4} />
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Hospital Not Found</h2>
        <Link to="/hospitals" className="mt-4 inline-block text-primary-700 hover:underline">
          Return to Hospital Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Back Link */}
      <Link to="/hospitals" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800">
        <ArrowLeft className="w-4 h-4" /> Back to All Hospitals
      </Link>

      {/* Hospital Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
        <div className="h-72 w-full relative">
          <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {hospital.accreditations.map((acc) => (
                  <Badge key={acc} variant="slate" size="sm" className="bg-white/90 text-slate-900 font-semibold">
                    {acc}
                  </Badge>
                ))}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{hospital.name}</h1>
              <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                {hospital.address}
              </p>
            </div>

            <Link to="/guidance-request">
              <Button variant="primary" size="lg" icon={Calendar} iconPosition="left">
                Request Appointment Here
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hospital Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Hospital Overview</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{hospital.overview}</p>
          </section>

          {/* Clinical Centers of Excellence */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Specialized Centers of Excellence</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hospital.specialties.map((spec) => (
                <div key={spec} className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-primary-700 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Myanmar Patient Coordination Services */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Myanmar Patient Support &amp; Language Access</h2>
            <div className="p-4 rounded-lg bg-teal-50/70 border border-teal-200 text-sm text-teal-950 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-primary-900">
                <Languages className="w-4 h-4 text-primary-700" />
                <span>Burmese Language Facilitation:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {hospital.burmeseLiaison}. TMG coordinators will personally accompany and interpret throughout consultations and admissions.
              </p>
            </div>
          </section>
        </div>

        {/* Sidebar Info Card */}
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Key Facility Information</h3>
            <div className="space-y-3 text-xs text-slate-600 divide-y divide-slate-100">
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Bed Capacity</span>
                <span className="font-semibold text-slate-800">{hospital.bedCapacity} Beds</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Average Booking Lead Time</span>
                <span className="font-semibold text-slate-800">{hospital.leadTimeDays} Business Days</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Languages</span>
                <span className="font-semibold text-slate-800 text-right">{hospital.languagesSupported.slice(0, 3).join(", ")}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">International Desk Phone</span>
                <span className="font-semibold text-slate-800">{hospital.phone}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link to="/guidance-request" className="block">
                <Button variant="primary" size="md" className="w-full" icon={ArrowRight} iconPosition="right">
                  Get Free Doctor Match
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
