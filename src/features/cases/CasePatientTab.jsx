import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { maskPhoneNumber, maskEmail } from "../../utils/formatters";
import { ShieldCheck, Eye, EyeOff, User, Phone, Mail, MapPin } from "lucide-react";

export default function CasePatientTab({ caseData, patient }) {
  const [showSensitive, setShowSensitive] = useState(false);

  const currentPatient = patient || {
    fullName: caseData.patientName,
    gender: caseData.gender,
    age: caseData.age,
    city: "Yangon",
    country: "Myanmar",
    phone: "+95 9 421 084 192",
    email: "patient.record@example.com",
    nationalId: "12/DAGAMA(N)048291",
    emergencyContact: {
      name: "Family Guardian",
      phone: "+95 9 421 084 193",
      relation: "Next of Kin"
    }
  };

  return (
    <div className="space-y-6">
      {/* Privacy Notice Banner (Section 59) */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
          <span>Sensitive patient identifiers are masked by default to protect medical privacy.</span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowSensitive(!showSensitive)}
          icon={showSensitive ? EyeOff : Eye}
        >
          {showSensitive ? "Hide Identifiers" : "Reveal (Authorized)"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5 space-y-3 text-xs">
          <h4 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Demographic Information
          </h4>
          <div className="space-y-2.5 divide-y divide-slate-100">
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Full Name</span>
              <span className="font-semibold text-slate-800">{currentPatient.fullName}</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Gender &amp; Age</span>
              <span className="font-medium text-slate-800">{currentPatient.gender}, {currentPatient.age} years</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">NRC / National ID</span>
              <span className="font-mono font-medium text-slate-800">
                {showSensitive ? currentPatient.nationalId : "12/DAG***(N)***291"}
              </span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Location</span>
              <span className="font-medium text-slate-800">{currentPatient.city}, {currentPatient.country}</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 space-y-3 text-xs">
          <h4 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Contact &amp; Emergency Next of Kin
          </h4>
          <div className="space-y-2.5 divide-y divide-slate-100">
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Phone Number</span>
              <span className="font-mono font-medium text-slate-800">
                {showSensitive ? currentPatient.phone : maskPhoneNumber(currentPatient.phone)}
              </span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Email</span>
              <span className="font-medium text-slate-800">
                {showSensitive ? currentPatient.email : maskEmail(currentPatient.email)}
              </span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Emergency Contact</span>
              <span className="font-medium text-slate-800">{currentPatient.emergencyContact?.name}</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Emergency Phone</span>
              <span className="font-mono font-medium text-slate-800">
                {showSensitive
                  ? currentPatient.emergencyContact?.phone
                  : maskPhoneNumber(currentPatient.emergencyContact?.phone)}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
