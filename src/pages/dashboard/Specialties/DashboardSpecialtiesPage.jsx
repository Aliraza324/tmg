import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { specialtyService } from "../../../services/specialtyService";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/tables/DataTable";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import Modal from "../../../components/ui/Modal";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import SearchInput from "../../../components/common/SearchInput";
import SpecialtyForm from "../../../components/forms/SpecialtyForm";
import { Stethoscope, ArrowUpRight, Plus, Edit, Power, PowerOff } from "lucide-react";

export default function DashboardSpecialtiesPage() {
  const [specialties, setSpecialties] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState(null);
  const [toggleSpecialtyTarget, setToggleSpecialtyTarget] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadSpecialties = () => {
    setIsLoading(true);
    specialtyService.getSpecialties(search).then((data) => {
      setSpecialties(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadSpecialties();
  }, [search]);

  const handleAddSubmit = async (formData) => {
    setIsSaving(true);
    await specialtyService.createSpecialty(formData);
    setIsSaving(false);
    setAddModalOpen(false);
    loadSpecialties();
  };

  const handleEditSubmit = async (formData) => {
    setIsSaving(true);
    await specialtyService.updateSpecialty(editingSpecialty.id, formData);
    setIsSaving(false);
    setEditingSpecialty(null);
    loadSpecialties();
  };

  const handleToggleConfirm = async () => {
    if (!toggleSpecialtyTarget) return;
    setIsSaving(true);
    await specialtyService.toggleSpecialtyStatus(toggleSpecialtyTarget.id);
    setIsSaving(false);
    setToggleSpecialtyTarget(null);
    loadSpecialties();
  };

  const columns = [
    {
      key: "name",
      label: "Specialty",
      render: (row) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 block text-xs">{row.name}</span>
            <Badge variant={row.status === "Inactive" ? "slate" : "emerald"} size="sm">
              {row.status || "Active"}
            </Badge>
          </div>
          <span className="text-[11px] text-slate-500">{row.category}</span>
          {row.burmeseName && (
            <span className="text-[11px] text-teal-800 block font-myanmar">{row.burmeseName}</span>
          )}
        </div>
      )
    },
    {
      key: "description",
      label: "Clinical Scope",
      render: (row) => (
        <span className="text-xs text-slate-600 truncate max-w-sm block">
          {row.description}
        </span>
      )
    },
    {
      key: "hospitalCount",
      label: "Partner Centers",
      render: (row) => (
        <span className="text-xs font-semibold text-primary-800 bg-primary-50 px-2 py-0.5 rounded">
          {row.hospitalCount || 0} Centers
        </span>
      )
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button variant="ghost" size="sm" icon={Edit} onClick={() => setEditingSpecialty(row)}>
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={row.status === "Inactive" ? "text-emerald-700" : "text-slate-500 hover:text-rose-600"}
            icon={row.status === "Inactive" ? Power : PowerOff}
            onClick={() => setToggleSpecialtyTarget(row)}
          >
            {row.status === "Inactive" ? "Activate" : "Deactivate"}
          </Button>
          <Link to={`/specialties/${row.slug}`} target="_blank">
            <Button variant="secondary" size="sm" icon={ArrowUpRight}>
              View
            </Button>
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clinical Specialties &amp; Services"
        subtitle="Medical domains, treatment lines, and provider hospital mappings"
        breadcrumbs={[{ label: "Specialties" }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setAddModalOpen(true)}>
            Add Specialty
          </Button>
        }
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200 max-w-sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search specialties..." />
      </div>

      <DataTable columns={columns} data={specialties} isLoading={isLoading} />

      {/* Add Specialty Modal */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Add Clinical Specialty" maxWidth="max-w-2xl">
        <SpecialtyForm
          onSubmit={handleAddSubmit}
          onCancel={() => setAddModalOpen(false)}
          isSubmitting={isSaving}
        />
      </Modal>

      {/* Edit Specialty Modal */}
      <Modal isOpen={Boolean(editingSpecialty)} onClose={() => setEditingSpecialty(null)} title="Edit Specialty" maxWidth="max-w-2xl">
        {editingSpecialty && (
          <SpecialtyForm
            initialValues={editingSpecialty}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingSpecialty(null)}
            isSubmitting={isSaving}
          />
        )}
      </Modal>

      {/* Deactivate/Activate Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(toggleSpecialtyTarget)}
        onClose={() => setToggleSpecialtyTarget(null)}
        onConfirm={handleToggleConfirm}
        title={toggleSpecialtyTarget?.status === "Inactive" ? "Activate Specialty" : "Deactivate Specialty"}
        message={
          toggleSpecialtyTarget?.status === "Inactive"
            ? `Reactivate specialty ${toggleSpecialtyTarget?.name}?`
            : `Deactivate specialty ${toggleSpecialtyTarget?.name}? It will be hidden from new intake categories.`
        }
        confirmLabel={toggleSpecialtyTarget?.status === "Inactive" ? "Activate" : "Deactivate"}
        variant={toggleSpecialtyTarget?.status === "Inactive" ? "primary" : "danger"}
        isLoading={isSaving}
      />
    </div>
  );
}
