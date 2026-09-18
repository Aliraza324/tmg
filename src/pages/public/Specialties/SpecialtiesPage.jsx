import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_SPECIALTIES } from "../../../data/specialties";
import { Card } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import SearchInput from "../../../components/common/SearchInput";
import { Stethoscope, Activity, Heart, Brain, ChevronRight, Building2, ShieldCheck } from "lucide-react";

export default function SpecialtiesPage() {
  const [search, setSearch] = useState("");

  const filteredSpecialties = MOCK_SPECIALTIES.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.commonConditions.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <Badge variant="teal" size="md">Clinical Directory</Badge>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">Medical Specialties &amp; Advanced Treatments</h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Discover specialized care domains, cutting-edge therapies, and surgical options available across our Bangkok hospital network.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 max-w-md">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by specialty, illness, or condition..."
        />
      </div>

      {/* Specialties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecialties.map((spec) => (
          <Card key={spec.id} className="p-6 hover:border-primary-300 transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <Badge variant="slate" size="sm">{spec.category}</Badge>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 text-lg">{spec.name}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-3">
                  {spec.description}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-700 block mb-1.5">Common Conditions Treated:</span>
                <div className="flex flex-wrap gap-1">
                  {spec.commonConditions.slice(0, 3).map((cond) => (
                    <span key={cond} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {cond}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {spec.hospitalCount} Partner Centers
              </span>
              <Link to={`/specialties/${spec.slug}`}>
                <Button variant="outlineTeal" size="sm" icon={ChevronRight} iconPosition="right">
                  View Treatments
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
