import React from "react";
import { Link } from "react-router-dom";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { ShieldCheck, Users, HeartHandshake, Building2, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="teal" size="md">Our Mission &amp; Ethics</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">About TMG Healthcare</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          TMG (Thailand Medical Guidance) was founded to ensure Myanmar patients and families receive trusted, transparent, and empathetic access to Thailand's world-class medical system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900">Bridging the Cross-Border Care Gap</h2>
          <p>
            Traveling abroad for critical medical treatment is intimidating. Language hurdles, complex hospital hierarchies, opaque pricing, and unfamiliar medical paperwork compound patient anxiety.
          </p>
          <p>
            TMG serves as your independent advocate. We are not employed by a single hospital; we work directly on behalf of the patient, ensuring objective hospital comparisons and personal coordination throughout Bangkok.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80"
            alt="Healthcare professionals"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6 text-center space-y-2">
          <div className="text-3xl font-extrabold text-primary-700">8+</div>
          <h4 className="font-semibold text-slate-900 text-sm">Premier Hospital Partners</h4>
          <p className="text-xs text-slate-500">JCI &amp; HA accredited medical centers in Bangkok</p>
        </Card>
        <Card className="p-6 text-center space-y-2">
          <div className="text-3xl font-extrabold text-primary-700">100%</div>
          <h4 className="font-semibold text-slate-900 text-sm">Burmese Bilingual Staff</h4>
          <p className="text-xs text-slate-500">Culturally sensitive and medically fluent</p>
        </Card>
        <Card className="p-6 text-center space-y-2">
          <div className="text-3xl font-extrabold text-primary-700">$0</div>
          <h4 className="font-semibold text-slate-900 text-sm">Guidance Fee to Patients</h4>
          <p className="text-xs text-slate-500">Hospital matching and initial reviews are completely free</p>
        </Card>
      </div>

      <div className="text-center pt-4">
        <Link to="/contact">
          <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
            Connect With Our Coordinators
          </Button>
        </Link>
      </div>
    </div>
  );
}
