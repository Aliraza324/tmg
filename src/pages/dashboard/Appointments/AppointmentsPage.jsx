import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { appointmentService } from "../../../services/appointmentService";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/tables/DataTable";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import Modal from "../../../components/ui/Modal";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import SearchInput from "../../../components/common/SearchInput";
import Select from "../../../components/ui/Select";
import AppointmentForm from "../../../components/forms/AppointmentForm";
import { formatDate } from "../../../utils/formatters";
import { APPOINTMENT_STATUSES } from "../../../constants/statuses";
import { Calendar, Clock, Plus, MapPin, User, LayoutList, CalendarDays, Edit, XCircle } from "lucide-react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadAppointments = () => {
    setIsLoading(true);
    appointmentService
      .getAppointments({ search, status: statusFilter })
      .then((data) => {
        setAppointments(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadAppointments();
  }, [search, statusFilter]);

  const handleCreateSubmit = async (formData) => {
    setIsSaving(true);
    await appointmentService.createAppointment(formData);
    setIsSaving(false);
    setCreateModalOpen(false);
    loadAppointments();
  };

  const handleEditSubmit = async (formData) => {
    setIsSaving(true);
    await appointmentService.updateAppointment(editingAppointment.id, formData);
    setIsSaving(false);
    setEditingAppointment(null);
    loadAppointments();
  };

  const handleCancelConfirm = async () => {
    if (!cancelTarget) return;
    setIsSaving(true);
    await appointmentService.cancelAppointment(cancelTarget.id, "Patient/Hospital requested cancellation");
    setIsSaving(false);
    setCancelTarget(null);
    loadAppointments();
  };

  const columns = [
    {
      key: "patientName",
      label: "Patient & Case",
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block text-xs">{row.patientName}</span>
          <span className="font-mono text-[10px] text-slate-400">{row.caseCode || "Direct Intake"}</span>
        </div>
      )
    },
    {
      key: "hospital",
      label: "Hospital & Clinic",
      render: (row) => (
        <div>
          <span className="font-medium text-slate-800 block truncate max-w-xs text-xs">{row.hospitalName}</span>
          <span className="text-[11px] text-slate-500">{row.department}</span>
        </div>
      )
    },
    {
      key: "doctorName",
      label: "Attending Doctor",
      render: (row) => (
        <span className="text-xs text-slate-700 font-medium">{row.doctorName}</span>
      )
    },
    {
      key: "dateTime",
      label: "Consultation Date & Time",
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-800 block text-xs">{formatDate(row.appointmentDate)}</span>
          <span className="text-[11px] text-teal-700 font-medium">{row.appointmentTime}</span>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge
          variant={
            row.status === "Confirmed"
              ? "emerald"
              : row.status === "Pending Confirmation"
              ? "amber"
              : row.status === "Cancelled"
              ? "rose"
              : "slate"
          }
          size="sm"
        >
          {row.status}
        </Badge>
      )
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" icon={Edit} onClick={() => setEditingAppointment(row)}>
            Edit
          </Button>
          {row.status !== "Cancelled" && (
            <Button
              variant="ghost"
              size="sm"
              className="text-rose-600 hover:bg-rose-50"
              icon={XCircle}
              onClick={() => setCancelTarget(row)}
            >
              Cancel
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Consultation Appointments Agenda"
        subtitle="Tracking hospital clinic visits, doctor confirmations, and liaison bookings"
        breadcrumbs={[{ label: "Appointments" }]}
        actions={
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 cursor-pointer ${
                  viewMode === "list" ? "bg-primary-50 text-primary-800" : "text-slate-500"
                }`}
              >
                <LayoutList className="w-4 h-4" /> List
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 cursor-pointer ${
                  viewMode === "calendar" ? "bg-primary-50 text-primary-800" : "text-slate-500"
                }`}
              >
                <CalendarDays className="w-4 h-4" /> Calendar
              </button>
            </div>

            <Button variant="primary" size="md" icon={Plus} onClick={() => setCreateModalOpen(true)}>
              Schedule Appointment
            </Button>
          </div>
        }
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80">
          <SearchInput value={search} onChange={setSearch} placeholder="Search patient or doctor..." />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[{ value: "All", label: "All Statuses" }, ...Object.values(APPOINTMENT_STATUSES).map((s) => ({ value: s, label: s }))]}
          />
        </div>
      </div>

      {viewMode === "list" ? (
        <DataTable columns={columns} data={appointments} isLoading={isLoading} emptyTitle="No appointments scheduled" />
      ) : (
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm">Consultations Agenda</h4>
            <Badge variant="teal" size="sm">Bangkok Time (ICT)</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((apt) => (
              <div key={apt.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-800">{formatDate(apt.appointmentDate)} • {apt.appointmentTime}</span>
                  <Badge variant={apt.status === "Cancelled" ? "rose" : "emerald"} size="sm">{apt.status}</Badge>
                </div>
                <h5 className="font-semibold text-slate-900 text-sm">{apt.patientName}</h5>
                <p className="text-slate-600">{apt.doctorName}</p>
                <p className="text-slate-500 text-[11px]">{apt.hospitalName} ({apt.department})</p>
                <div className="pt-2 flex justify-end">
                  <Button variant="ghost" size="sm" icon={Edit} onClick={() => setEditingAppointment(apt)}>
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Appointment Modal */}
      <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Schedule New Medical Appointment" maxWidth="max-w-2xl">
        <AppointmentForm
          onSubmit={handleCreateSubmit}
          onCancel={() => setCreateModalOpen(false)}
          isSubmitting={isSaving}
        />
      </Modal>

      {/* Edit Appointment Modal */}
      <Modal isOpen={Boolean(editingAppointment)} onClose={() => setEditingAppointment(null)} title="Edit Consultation Details" maxWidth="max-w-2xl">
        {editingAppointment && (
          <AppointmentForm
            initialValues={editingAppointment}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingAppointment(null)}
            isSubmitting={isSaving}
          />
        )}
      </Modal>

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancelConfirm}
        title="Cancel Appointment"
        message={`Are you sure you want to cancel the appointment for ${cancelTarget?.patientName} with ${cancelTarget?.doctorName}? The status will be changed to Cancelled.`}
        confirmLabel="Confirm Cancellation"
        variant="danger"
        isLoading={isSaving}
      />
    </div>
  );
}
