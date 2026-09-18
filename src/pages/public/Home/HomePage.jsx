import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Stethoscope,
  HeartHandshake,
  Clock,
  MessageCircle,
  FileCheck,
  Users,
  MapPin,
  ChevronRight
} from "lucide-react";
import Button from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import { MOCK_HOSPITALS } from "../../../data/hospitals";
import { MOCK_SPECIALTIES } from "../../../data/specialties";

export default function HomePage() {
  const featuredHospitals = MOCK_HOSPITALS.slice(0, 3);
  const featuredSpecialties = MOCK_SPECIALTIES.slice(0, 4);

  const patientSteps = [
    { num: "01", step: "Inquiry", desc: "Submit your medical inquiry and existing reports online or via our Yangon desk." },
    { num: "02", step: "Assessment", desc: "Our bilingual coordinator reviews requirements with Thailand clinical specialists." },
    { num: "03", step: "Hospital Matching", desc: "Receive transparent comparison of accredited hospitals, doctors, and estimated packages." },
    { num: "04", step: "Appointment", desc: "We coordinate clinic booking, medical visa assistance, and hospital check-in." },
    { num: "05", step: "Follow-up", desc: "Post-consultation check-ins, medication refills, and continuous Myanmar-based support." }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50/70 via-white to-white pt-8 sm:pt-20 pb-12 sm:pb-16 border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary-100/70 border border-primary-200 text-[11px] sm:text-xs font-semibold text-primary-900 max-w-full">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-700 shrink-0" />
                <span className="truncate sm:whitespace-normal">Trusted Thailand Medical Facilitator for Myanmar Patients</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2] break-words">
                Healthcare guidance and patient support for Myanmar-speaking patients seeking medical care in Thailand.
              </h1>

              <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Connecting you with JCI-accredited hospitals in Bangkok, top medical specialists, transparent treatment plans, and dedicated Burmese-speaking coordinators from day one.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link to="/guidance-request">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-sm" icon={ArrowRight} iconPosition="right">
                    Get Free Guidance
                  </Button>
                </Link>
                <Link to="/hospitals">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto" icon={Building2}>
                    Explore Hospitals
                  </Button>
                </Link>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-2.5 sm:gap-6 text-xs text-slate-500 border-t border-slate-200/80">
                <span className="flex items-center gap-1.5 font-medium text-slate-700 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Free Guidance &amp; Matching
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-700 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Burmese Language Liaisons
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-700 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Verified JCI Hospitals
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80"
                  alt="Medical Team Collaboration"
                  className="w-full h-80 object-cover"
                />
                <div className="p-6 space-y-3 bg-white">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-primary-800">TMG Hospital Network</span>
                    <span>8 Premier Hospitals in Bangkok</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base">Direct Access to Leading Tertiary Care</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Personalized medical record reviews, priority appointment scheduling, and bilingual hospital accompaniment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How TMG Helps Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <Badge variant="teal" size="md">What We Do</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">How TMG Supports Your Healthcare Journey</h2>
          <p className="text-sm text-slate-600">
            We bridge the cross-border healthcare gap so you and your loved ones can focus entirely on recovery without language barriers or administrative stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-slate-200 hover:border-primary-300 transition-colors">
            <div className="w-11 h-11 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center mb-4">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Hospital &amp; Specialist Matching</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We connect your specific medical reports with top-rated departments across Bangkok's premier hospital network to find the most suitable medical specialists.
            </p>
          </Card>

          <Card className="p-6 border-slate-200 hover:border-primary-300 transition-colors">
            <div className="w-11 h-11 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Burmese Medical Translation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our coordinators are fluent in Burmese, Thai, and English, ensuring accurate clinical translations between you and Thai healthcare providers.
            </p>
          </Card>

          <Card className="p-6 border-slate-200 hover:border-primary-300 transition-colors">
            <div className="w-11 h-11 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Continuous Care &amp; Follow-up</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              From airport liaison coordination to post-treatment prescription refills and remote surveillance back home in Myanmar, we stand beside you.
            </p>
          </Card>
        </div>
      </section>

      {/* Patient Journey Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Structured Pathway</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The TMG Patient Journey</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear, transparent milestones ensuring complete safety and coordination every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {patientSteps.map((s, idx) => (
              <div key={s.num} className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 relative">
                <span className="text-xs font-bold text-teal-400 block mb-2">{s.num}</span>
                <h4 className="text-base font-semibold text-white mb-2">{s.step}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Directory Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="teal" size="md">Accredited Network</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Premier Hospital Partners</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">Internationally recognized healthcare institutions in Bangkok.</p>
          </div>
          <Link to="/hospitals">
            <Button variant="secondary" size="md" icon={ChevronRight} iconPosition="right">
              View All Hospitals
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredHospitals.map((hosp) => (
            <Card key={hosp.id} className="group hover:border-primary-300 transition flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img src={hosp.image} alt={hosp.name} className="w-full h-full object-cover group-hover:scale-103 transition duration-300" />
                <div className="absolute top-3 right-3">
                  <Badge variant="slate" size="sm" className="bg-white/90 font-semibold">{hosp.accreditations[0]}</Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{hosp.district}, {hosp.city}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base group-hover:text-primary-800 transition">
                    {hosp.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {hosp.overview}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                    {hosp.burmeseLiaison.split(" on ")[0]}
                  </span>
                  <Link to={`/hospitals/${hosp.slug}`} className="text-xs font-semibold text-primary-700 hover:text-primary-900 flex items-center gap-1">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Specialty Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="teal" size="md">Specialized Medicine</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Key Clinical Specialties</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">High-demand advanced tertiary procedures coordinated by TMG.</p>
          </div>
          <Link to="/specialties">
            <Button variant="secondary" size="md" icon={ChevronRight} iconPosition="right">
              View All Specialties
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredSpecialties.map((spec) => (
            <Card key={spec.id} className="p-5 hover:border-primary-300 transition">
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 text-sm mb-1">{spec.name}</h4>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3">{spec.description}</p>
              <Link to={`/specialties/${spec.slug}`} className="text-xs font-semibold text-primary-700 hover:text-primary-900 flex items-center gap-1">
                Explore treatments <ChevronRight className="w-3 h-3" />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-primary-900 text-white rounded-2xl p-5 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-md">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <h3 className="text-xl sm:text-3xl font-bold tracking-tight">Need help deciding on the right hospital?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our medical coordination team is ready to review your medical reports confidentially and suggest the most appropriate specialists and hospitals in Bangkok at zero consultation cost.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/guidance-request">
              <Button variant="primary" size="lg" className="bg-white text-primary-950 hover:bg-slate-100 font-semibold border-none">
                Submit Medical Request
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="border-slate-700 bg-primary-800 text-white hover:bg-primary-700">
                Contact Yangon Desk
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
