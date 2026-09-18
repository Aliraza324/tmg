import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { caseService } from "../../../services/caseService";
import { patientService } from "../../../services/patientService";
import { coordinatorService } from "../../../services/coordinatorService";
import PageHeader from "../../../components/common/PageHeader";
import Tabs from "../../../components/ui/Tabs";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import Select from "../../../components/ui/Select";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import { CaseStatusBadge, CasePriorityBadge } from "../../../components/common/StatusBadge";
import { CardSkeleton } from "../../../components/common/SkeletonLoader";
import { CASE_STATUSES } from "../../../constants/statuses";

// Form and Tab Sub-Components
import CaseForm from "../../../components/forms/CaseForm";
import CaseOverviewTab from "../../../features/cases/CaseOverviewTab";
import CasePatientTab from "../../../features/cases/CasePatientTab";
import CaseAssessmentTab from "../../../features/cases/CaseAssessmentTab";
import CaseMatchingTab from "../../../features/cases/CaseMatchingTab";
import CaseAppointmentTab from "../../../features/cases/CaseAppointmentTab";
import CaseFollowUpTab from "../../../features/cases/CaseFollowUpTab";
import CaseDocumentsTab from "../../../features/cases/CaseDocumentsTab";
import CaseNotesTab from "../../../features/cases/CaseNotesTab";
import CaseActivityTab from "../../../features/cases/CaseActivityTab";
import CaseConsentTab from "../../../features/cases/CaseConsentTab";

import {
  FolderKanban,
  User,
  Stethoscope,
  Building2,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Activity,
  ShieldCheck,
  UserCheck,
  RefreshCw,
  Edit,
  Archive,
  ArchiveRestore
} from "lucide-react";

export default function CaseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [patient, setPatient] = useState(null);
  const [coordinators, setCoordinators] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedNewStatus, setSelectedNewStatus] = useState("");
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedNewCoordId, setSelectedNewCoordId] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const loadCase = () => {
    setIsLoading(true);
    caseService
      .getCaseById(id)
      .then((c) => {
        setCaseData(c);
        setSelectedNewStatus(c.status);
        setSelectedNewCoordId(c.coordinatorId);
        if (c.patientId) {
          patientService.getPatientById(c.patientId).then(setPatient).catch(() => {});
        }
        coordinatorService.getCoordinators().then(setCoordinators);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    loadCase();
  }, [id]);

  const handleUpdateStatus = async () => {
    if (!selectedNewStatus) return;
    const updated = await caseService.updateCaseStatus(caseData.id, selectedNewStatus);
    setCaseData(updated);
    setStatusModalOpen(false);
  };

  const handleAssignCoordinator = async () => {
    const coord = coordinators.find((c) => c.id === selectedNewCoordId);
    if (!coord) return;
    const updated = await caseService.assignCoordinator(caseData.id, coord);
    setCaseData(updated);
    setAssignModalOpen(false);
  };

  const handleEditSubmit = async (formData) => {
    setIsSaving(true);
    const updated = await caseService.updateCase(caseData.id, formData);
    setCaseData(updated);
    setIsSaving(false);
    setEditModalOpen(false);
  };

  const handleArchiveConfirm = async () => {
    setIsSaving(true);
    await caseService.archiveCase(caseData.id, "Archived from case detail workspace");
    setIsSaving(false);
    setArchiveModalOpen(false);
    navigate("/cases");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="p-8 text-center bg-white rounded-lg border border-slate-200">
        <h3 className="font-bold text-slate-800">Case Not Found</h3>
        <Link to="/cases" className="text-primary-700 hover:underline mt-2 inline-block text-xs">
          Return to Cases List
        </Link>
      </div>
    );
  }

  const tabsList = [
    { id: "overview", label: "Overview", icon: FolderKanban },
    { id: "patient", label: "Patient", icon: User },
    { id: "assessment", label: "Assessment", icon: Stethoscope },
    { id: "matching", label: "Hospital Matching", icon: Building2 },
    { id: "appointment", label: "Appointment", icon: Calendar },
    { id: "followup", label: "Follow-up", icon: Clock },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "notes", label: "Notes", icon: MessageSquare },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "consent", label: "Consent", icon: ShieldCheck }
  ];

  return (
    <div className="space-y-6">
      {caseData.isArchived && (
        <div className="p-3.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold flex items-center justify-between">
          <span>This case is ARCHIVED. Clinical records are locked for audit preservation.</span>
          <Button variant="outlineTeal" size="sm" onClick={() => caseService.unarchiveCase(caseData.id).then(setCaseData)}>
            Restore Case
          </Button>
        </div>
      )}

      <PageHeader
        title={caseData.caseCode}
        subtitle={`${caseData.patientName} • ${caseData.specialty} • ${caseData.hospitalName || "Matching Pending"}`}
        breadcrumbs={[{ label: "Cases", path: "/cases" }, { label: caseData.caseCode }]}
        badge={<CaseStatusBadge status={caseData.status} />}
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="secondary" size="sm" icon={Edit} onClick={() => setEditModalOpen(true)}>
              Edit Case
            </Button>
            <Button variant="secondary" size="sm" icon={UserCheck} onClick={() => setAssignModalOpen(true)}>
              Assign ({caseData.coordinatorName || "Unassigned"})
            </Button>
            <Button variant="primary" size="sm" icon={RefreshCw} onClick={() => setStatusModalOpen(true)}>
              Change Status
            </Button>
            {!caseData.isArchived && (
              <Button variant="danger" size="sm" icon={Archive} onClick={() => setArchiveModalOpen(true)}>
                Archive
              </Button>
            )}
          </div>
        }
      />

      <Tabs tabs={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      <div className="pt-2">
        {activeTab === "overview" && <CaseOverviewTab caseData={caseData} />}
        {activeTab === "patient" && <CasePatientTab caseData={caseData} patient={patient} />}
        {activeTab === "assessment" && <CaseAssessmentTab caseData={caseData} />}
        {activeTab === "matching" && (
          <CaseMatchingTab
            caseData={caseData}
            onUpdateCase={(updates) => caseService.updateCase(caseData.id, updates).then(setCaseData)}
          />
        )}
        {activeTab === "appointment" && <CaseAppointmentTab caseData={caseData} />}
        {activeTab === "followup" && <CaseFollowUpTab caseData={caseData} />}
        {activeTab === "documents" && <CaseDocumentsTab caseData={caseData} />}
        {activeTab === "notes" && <CaseNotesTab caseData={caseData} />}
        {activeTab === "activity" && <CaseActivityTab caseData={caseData} />}
        {activeTab === "consent" && <CaseConsentTab caseData={caseData} />}
      </div>

      {/* Edit Case Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Case Details" maxWidth="max-w-2xl">
        <CaseForm
          initialValues={caseData}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditModalOpen(false)}
          isSubmitting={isSaving}
        />
      </Modal>

      {/* Change Status Modal */}
      <Modal isOpen={statusModalOpen} onClose={() => setStatusModalOpen(false)} title="Update Case Lifecycle Status">
        <div className="space-y-4 text-xs">
          <Select
            label="Target Status"
            value={selectedNewStatus}
            onChange={(e) => setSelectedNewStatus(e.target.value)}
            options={Object.values(CASE_STATUSES).map((s) => ({ value: s, label: s }))}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setStatusModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleUpdateStatus}>Save Status</Button>
          </div>
        </div>
      </Modal>

      {/* Assign Coordinator Modal */}
      <Modal isOpen={assignModalOpen} onClose={() => setAssignModalOpen(false)} title="Assign Case Coordinator">
        <div className="space-y-4 text-xs">
          <Select
            label="Select Coordinator"
            value={selectedNewCoordId}
            onChange={(e) => setSelectedNewCoordId(e.target.value)}
            options={coordinators.map((c) => ({
              value: c.id,
              label: `${c.name} (${c.specialtyFocus.join(", ")}) — ${c.activeCasesCount} active`
            }))}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setAssignModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleAssignCoordinator}>Confirm Assignment</Button>
          </div>
        </div>
      </Modal>

      {/* Archive Confirmation Dialog */}
      <ConfirmDialog
        isOpen={archiveModalOpen}
        onClose={() => setArchiveModalOpen(false)}
        onConfirm={handleArchiveConfirm}
        title="Archive Case Record"
        message={`Are you sure you want to archive case ${caseData.caseCode}? The case will be removed from active lists while preserving historical audit logs.`}
        confirmLabel="Archive Case"
        variant="danger"
        isLoading={isSaving}
      />
    </div>
  );
}
