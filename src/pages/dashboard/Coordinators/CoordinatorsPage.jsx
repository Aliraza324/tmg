import React, { useState, useEffect } from "react";
import { coordinatorService } from "../../../services/coordinatorService";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/tables/DataTable";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import Avatar from "../../../components/ui/Avatar";
import Modal from "../../../components/ui/Modal";
import CoordinatorForm from "../../../components/forms/CoordinatorForm";
import { UserCheck, Plus, Star, MapPin, Languages, Edit2 } from "lucide-react";

export default function CoordinatorsPage() {
  const [coordinators, setCoordinators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editCoordinator, setEditCoordinator] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadCoordinators = () => {
    setIsLoading(true);
    coordinatorService.getCoordinators().then((data) => {
      setCoordinators(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadCoordinators();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    await coordinatorService.updateCoordinator(id, { status: newStatus });
    loadCoordinators();
  };

  const handleCreateSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await coordinatorService.createCoordinator(formData);
      setCreateModalOpen(false);
      loadCoordinators();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (formData) => {
    if (!editCoordinator) return;
    setIsSubmitting(true);
    try {
      await coordinatorService.updateCoordinator(editCoordinator.id, formData);
      setEditCoordinator(null);
      loadCoordinators();
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Coordinator",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar} name={row.name} size="md" status={row.status === "Active" ? "online" : "offline"} />
          <div>
            <span className="font-semibold text-slate-900 block text-xs">{row.name}</span>
            <span className="text-[11px] text-slate-500">{row.role}</span>
          </div>
        </div>
      )
    },
    {
      key: "contact",
      label: "Direct Contact & Base",
      render: (row) => (
        <div>
          <span className="text-xs font-mono text-slate-700 block">{row.phone}</span>
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {row.location}
          </span>
        </div>
      )
    },
    {
      key: "languages",
      label: "Language Fluency",
      render: (row) => (
        <span className="text-xs text-slate-600 truncate max-w-xs block">
          {Array.isArray(row.languages) ? row.languages.join(", ") : row.languages}
        </span>
      )
    },
    {
      key: "workload",
      label: "Case Workload",
      render: (row) => (
        <div>
          <span className="text-xs font-bold text-teal-800">{row.activeCasesCount || 0} Active Cases</span>
          <span className="text-[11px] text-slate-400 block">{row.completedCasesCount || 0} completed</span>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge variant={row.status === "Active" ? "emerald" : "slate"} size="sm">
          {row.status}
        </Badge>
      )
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Edit2}
            onClick={() => setEditCoordinator(row)}
          >
            Edit
          </Button>
          <Button
            variant={row.status === "Active" ? "danger" : "secondary"}
            size="sm"
            onClick={() => handleToggleStatus(row.id, row.status)}
          >
            {row.status === "Active" ? "Deactivate" : "Activate"}
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Medical Coordinators Roster"
        subtitle="Bilingual care coordinators, case allocation workloads, and contact availability"
        breadcrumbs={[{ label: "Coordinators" }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setCreateModalOpen(true)}>
            Add Coordinator
          </Button>
        }
      />

      <DataTable columns={columns} data={coordinators} isLoading={isLoading} />

      {/* Add Coordinator Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Register New Coordinator"
        description="Add a new bilingual team member to the coordination roster."
      >
        <CoordinatorForm
          onSubmit={handleCreateSubmit}
          onCancel={() => setCreateModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Edit Coordinator Modal */}
      <Modal
        isOpen={Boolean(editCoordinator)}
        onClose={() => setEditCoordinator(null)}
        title="Edit Coordinator Profile"
        description="Modify coordinator details, contact info, languages, or location desk."
      >
        {editCoordinator && (
          <CoordinatorForm
            initialValues={editCoordinator}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditCoordinator(null)}
            isSubmitting={isSubmitting}
          />
        )}
      </Modal>
    </div>
  );
}
