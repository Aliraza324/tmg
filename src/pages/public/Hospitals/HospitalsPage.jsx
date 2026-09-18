import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { hospitalService } from "../../../services/hospitalService";
import { Card } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import SearchInput from "../../../components/common/SearchInput";
import Select from "../../../components/ui/Select";
import EmptyState from "../../../components/common/EmptyState";
import { TableSkeleton } from "../../../components/common/SkeletonLoader";
import { MapPin, Phone, CheckCircle2, ChevronRight, Building2 } from "lucide-react";

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const specialtyOptions = [
    { value: "All", label: "All Specialties" },
    { value: "Oncology", label: "Oncology & Cancer" },
    { value: "Cardiology", label: "Cardiology & Heart" },
    { value: "Orthopedics", label: "Orthopedics & Spine" },
    { value: "Neurology", label: "Neurology & Brain" },
    { value: "Organ Transplant", label: "Organ Transplant" },
    { value: "Gastroenterology", label: "Gastroenterology" }
  ];

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    hospitalService
      .getHospitals({ search, specialty: selectedSpecialty })
      .then((data) => {
        if (mounted) {
          setHospitals(data);
          setIsLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, [search, selectedSpecialty]);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <Badge variant="teal" size="md">Bangkok Healthcare Network</Badge>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">Accredited Hospital Directory</h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Browse internationally accredited partner medical centers in Thailand. TMG coordinators arrange priority consultations, bilingual language liaisons, and second opinions.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-80">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search hospitals by name or district..."
          />
        </div>

        <div className="w-full md:w-64">
          <Select
            options={specialtyOptions}
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            placeholder=""
          />
        </div>
      </div>

      {/* Hospital List */}
      {isLoading ? (
        <TableSkeleton rows={4} />
      ) : hospitals.length === 0 ? (
        <EmptyState
          searchQuery={search}
          title="No hospitals found"
          description="Try broadening your search term or choosing 'All Specialties'."
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setSearch("");
                setSelectedSpecialty("All");
              }}
            >
              Reset Filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hosp) => (
            <Card key={hosp.id} className="group flex flex-col hover:border-primary-300 transition shadow-xs">
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={hosp.image}
                  alt={hosp.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                />
                <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                  <Badge variant="slate" size="sm" className="bg-white/95 font-semibold text-slate-800 shadow-xs">
                    {hosp.accreditations[0]}
                  </Badge>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{hosp.district}, {hosp.city}</span>
                  </div>

                  <h3 className="font-semibold text-slate-900 text-lg group-hover:text-primary-800 transition">
                    {hosp.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {hosp.overview}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {hosp.specialties.slice(0, 4).map((spec) => (
                      <span
                        key={spec}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                    {hosp.specialties.length > 4 && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                        +{hosp.specialties.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
                    {hosp.burmeseLiaison.split(" on ")[0]}
                  </span>

                  <Link to={`/hospitals/${hosp.slug}`}>
                    <Button variant="outlineTeal" size="sm" icon={ChevronRight} iconPosition="right">
                      View Hospital
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
