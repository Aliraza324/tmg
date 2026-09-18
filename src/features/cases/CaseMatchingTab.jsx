import React, { useState } from "react";
import { MOCK_HOSPITALS } from "../../data/hospitals";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import SearchInput from "../../components/common/SearchInput";
import { Building2, Check, Plus, Star, MapPin, CheckCircle2 } from "lucide-react";

export default function CaseMatchingTab({ caseData, onUpdateCase }) {
  const [search, setSearch] = useState("");
  const [selectedHospitalId, setSelectedHospitalId] = useState(caseData.hospitalId);
  const [shortlisted, setShortlisted] = useState(
    caseData.matchedHospitals?.map((m) => m.hospitalId) || []
  );

  const filteredHospitals = MOCK_HOSPITALS.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.specialties.some((s) => s.toLowerCase().includes(caseData.specialty.toLowerCase()))
  );

  const toggleShortlist = (id) => {
    if (shortlisted.includes(id)) {
      setShortlisted(shortlisted.filter((hId) => hId !== id));
    } else {
      setShortlisted([...shortlisted, id]);
    }
  };

  const handleSelectHospital = (hospital) => {
    setSelectedHospitalId(hospital.id);
    if (onUpdateCase) {
      onUpdateCase({
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        status: "Hospital Matching"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">Hospital &amp; Department Matching Engine</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare candidate hospitals in Bangkok based on specialty expertise, doctor availability, and lead times.
          </p>
        </div>
        <div className="w-full sm:w-64">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search hospitals..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHospitals.map((hosp) => {
          const isSelected = selectedHospitalId === hosp.id;
          const isShortlisted = shortlisted.includes(hosp.id);

          return (
            <Card
              key={hosp.id}
              className={`p-5 space-y-4 transition ${
                isSelected
                  ? "ring-2 ring-primary-700 bg-teal-50/20 border-primary-600"
                  : "hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-semibold text-slate-900 text-sm">{hosp.name}</h5>
                    {isSelected && (
                      <Badge variant="emerald" size="sm">Selected</Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {hosp.district}, Bangkok
                  </p>
                </div>
                <Badge variant="slate" size="sm">{hosp.accreditations[0]}</Badge>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {hosp.overview}
              </p>

              <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Burmese Liaison:</span>
                  <span className="font-medium text-slate-800 text-right">{hosp.burmeseLiaison.split(" on ")[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Booking Lead Time:</span>
                  <span className="font-medium text-slate-800">{hosp.leadTimeDays} Business Days</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleShortlist(hosp.id)}
                  className={`text-xs font-medium px-2.5 py-1.5 rounded transition ${
                    isShortlisted
                      ? "text-amber-700 bg-amber-50"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {isShortlisted ? "★ Shortlisted" : "☆ Shortlist"}
                </button>

                <Button
                  variant={isSelected ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => handleSelectHospital(hosp)}
                >
                  {isSelected ? "Currently Assigned" : "Select Hospital"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
