import React from "react";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { formatDate } from "../../utils/formatters";
import { Calendar, Clock, MapPin, User, Stethoscope, Plus } from "lucide-react";

export default function CaseAppointmentTab({ caseData, appointment }) {
  const currentAppointment = appointment || {
    hospitalName: caseData.hospitalName || "Bumrungrad International Hospital",
    department: "Specialty Clinic, Floor 3",
    doctorName: caseData.assignedDoctor || "Dr. Artit Jinawath",
    appointmentDate: "2026-09-22",
    appointmentTime: "09:30 AM",
    status: "Confirmed",
    locationDetail: "Building A, Counter 3B",
    notes: "Burmese medical interpreter pre-arranged for initial consultation.",
    interpreterAssigned: "Daw Aye Myat (TMG Liaison)"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">Consultation &amp; Hospital Scheduling</h4>
          <p className="text-xs text-slate-500 mt-0.5">Direct appointment booking with attending Thai specialist team.</p>
        </div>
      </div>

      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Confirmed Appointment</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">{currentAppointment.doctorName}</h3>
            <p className="text-xs text-slate-600">{currentAppointment.department} • {currentAppointment.hospitalName}</p>
          </div>
          <Badge variant="emerald" size="md">
            ● {currentAppointment.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-primary-700" /> Date
            </span>
            <p className="font-bold text-slate-900 text-sm">{formatDate(currentAppointment.appointmentDate)}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-primary-700" /> Time
            </span>
            <p className="font-bold text-slate-900 text-sm">{currentAppointment.appointmentTime}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-primary-700" /> Location
            </span>
            <p className="font-semibold text-slate-800">{currentAppointment.locationDetail}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <User className="w-3.5 h-3.5 text-primary-700" /> Medical Liaison
            </span>
            <p className="font-semibold text-slate-800">{currentAppointment.interpreterAssigned}</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-teal-50/70 border border-teal-200 text-xs text-teal-950 space-y-1">
          <strong className="block font-semibold">Coordination Protocol:</strong>
          <p className="text-slate-700">{currentAppointment.notes}</p>
        </div>
      </Card>
    </div>
  );
}
