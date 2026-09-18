import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { patientService } from "../../../services/patientService";
import { caseService } from "../../../services/caseService";
import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import Modal from "../../../components/ui/Modal";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import PatientForm from "../../../components/forms/PatientForm";
import { CaseStatusBadge } from "../../../components/common/StatusBadge";
import { maskPhoneNumber, maskEmail, formatDate } from "../../../utils/formatters";
import { ShieldCheck, Eye, EyeOff, User, Phone, Mail, MapPin, FolderKanban, ArrowUpRight, Edit, UserX, UserCheck } from "lucide-react";

export default function PatientDetailPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [patientCases, setPatientCases] = useState([]);
  const [showSensitive, setShowSensitive] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadPatient = () => {
    setIsLoading(true);
    patientService
      .getPatientById(id)
      .then((p) => {
        setPatient(p);
        caseService.getCases({ includeArchived: true }).then((allCases) => {
          setPatientCases(allCases.filter((c) => c.patientId === p.id || c.patientName === p.fullName));
          setIsLoading(false);
        });
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    loadPatient();
  }, [id]);

  const handleEditSubmit = async (formData) => {
    setIsSaving(true);
    const updated = await patientService.updatePatient(patient.id, formData);
    setPatient(updated);
    setIsSaving(false);
    setEditModalOpen(false);
    loadPatient();
  };

  const handleToggleStatus = async () => {
    setIsSaving(true);
    const updated = await patientService.togglePatientStatus(patient.id);
    setPatient(updated);
    setIsSaving(false);
    setDeactivateModalOpen(false);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading patient record...</div>;
  }

  if (!patient) {
    return (
      <div className="p-8 text-center bg-white rounded-lg border border-slate-200">
        <h3 className="font-bold text-slate-800">Patient Record Not Found</h3>
        <Link to="/patients" className="text-primary-700 hover:underline mt-2 inline-block text-xs">
          Return to Patient Directory
        </Link>
      </div>
    );
  }

  const isInactive = patient.status === "Inactive";

  return (
    <div className="space-y-6">
      <PageHeader
        title={patient.fullName}
        subtitle={`${patient.gender}, ${patient.age} years old • ${patient.city}, ${patient.country}`}
        breadcrumbs={[{ label: "Patients", path: "/patients" }, { label: patient.fullName }]}
        badge={
          <Badge variant={isInactive ? "slate" : "emerald"} size="md">
            ● {patient.status || "Active"}
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="secondary" size="sm" icon={Edit} onClick={() => setEditModalOpen(true)}>
              Edit Patient
            </Button>
            <Button
              variant={isInactive ? "primary" : "secondary"}
              size="sm"
              icon={isInactive ? UserCheck : UserX}
              onClick={() => setDeactivateModalOpen(true)}
            >
              {isInactive ? "Activate" : "Deactivate"}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowSensitive(!showSensitive)}
              icon={showSensitive ? EyeOff : Eye}
            >
              {showSensitive ? "Mask" : "Reveal"}
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 space-y-3 text-xs">
          <h4 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Demographic &amp; Contact Details
          </h4>
          <div className="space-y-2.5 divide-y divide-slate-100">
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">National ID (NRC)</span>
              <span className="font-mono font-medium text-slate-800">
                {showSensitive ? patient.nationalId : "12/DAG***(N)***291"}
              </span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Passport Number</span>
              <span className="font-mono font-medium text-slate-800">
                {showSensitive ? patient.passportNumber : "MD***291"}
              </span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Phone</span>
              <span className="font-mono font-medium text-slate-800">
                {showSensitive ? patient.phone : maskPhoneNumber(patient.phone)}
              </span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Email</span>
              <span className="font-medium text-slate-800">
                {showSensitive ? patient.email : maskEmail(patient.email)}
              </span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Preferred Language</span>
              <span className="font-medium text-slate-800">{patient.preferredLanguage}</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-5 space-y-3">
            <h4 className="font-semibold text-slate-900 text-sm">Primary Clinical Intake Diagnosis</h4>
            <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-100 leading-relaxed">
              {patient.primaryDiagnosis}
            </p>
          </Card>

          <Card className="p-5 space-y-3">
            <h4 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
              Associated Coordination Cases ({patientCases.length})
            </h4>
            <div className="space-y-2.5">
              {patientCases.map((c) => (
                <div key={c.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{c.caseCode}</span>
                      <CaseStatusBadge status={c.status} />
                    </div>
                    <p className="text-slate-600 mt-1">{c.specialty} • {c.hospitalName}</p>
                  </div>
                  <Link to={`/cases/${c.id}`}>
                    <Button variant="secondary" size="sm" icon={ArrowUpRight}>
                      Open Case
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Edit Patient Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Patient Information" maxWidth="max-w-2xl">
        <PatientForm
          initialValues={patient}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditModalOpen(false)}
          isSubmitting={isSaving}
        />
      </Modal>

      {/* Deactivate/Activate Confirmation */}
      <ConfirmDialog
        isOpen={deactivateModalOpen}
        onClose={() => setDeactivateModalOpen(false)}
        onConfirm={handleToggleStatus}
        title={isInactive ? "Activate Patient Record" : "Deactivate Patient Record"}
        message={
          isInactive
            ? `Are you sure you want to reactivate ${patient.fullName}? They will be restored to active queues.`
            : `Are you sure you want to deactivate ${patient.fullName}? Inactive patients cannot be scheduled for new appointments.`
        }
        confirmLabel={isInactive ? "Activate" : "Deactivate"}
        variant={isInactive ? "primary" : "danger"}
        isLoading={isSaving}
      />
    </div>
  );
}
