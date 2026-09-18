import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { hospitalService } from "../../../services/hospitalService";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/tables/DataTable";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import Modal from "../../../components/ui/Modal";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import SearchInput from "../../../components/common/SearchInput";
import HospitalForm from "../../../components/forms/HospitalForm";
import { Building2, ArrowUpRight, Plus, Star, Edit, Power, PowerOff } from "lucide-react";

export default function DashboardHospitalsPage() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);
  const [toggleHospitalTarget, setToggleHospitalTarget] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadHospitals = () => {
    setIsLoading(true);
    hospitalService.getHospitals({ search }).then((data) => {
      setHospitals(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadHospitals();
  }, [search]);

  const handleAddSubmit = async (formData) => {
    setIsSaving(true);
    await hospitalService.createHospital(formData);
    setIsSaving(false);
    setAddModalOpen(false);
    loadHospitals();
  };

  const handleEditSubmit = async (formData) => {
    setIsSaving(true);
    await hospitalService.updateHospital(editingHospital.id, formData);
    setIsSaving(false);
    setEditingHospital(null);
    loadHospitals();
  };

  const handleToggleConfirm = async () => {
    if (!toggleHospitalTarget) return;
    setIsSaving(true);
    await hospitalService.toggleHospitalStatus(toggleHospitalTarget.id);
    setIsSaving(false);
    setToggleHospitalTarget(null);
    loadHospitals();
  };

  const columns = [
    {
      key: "name",
      label: "Hospital Name",
      render: (row) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 block text-xs">{row.name}</span>
            <Badge variant={row.status === "Inactive" ? "slate" : "emerald"} size="sm">
              {row.status || "Active"}
            </Badge>
          </div>
          <span className="text-[11px] text-slate-500">{row.district}, Bangkok</span>
        </div>
      )
    },
    {
      key: "accreditations",
      label: "Accreditations",
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.accreditations?.slice(0, 2).map((acc) => (
            <Badge key={acc} variant="slate" size="sm">
              {acc}
            </Badge>
          ))}
        </div>
      )
    },
    {
      key: "capacity",
      label: "Beds & Lead Time",
      render: (row) => (
        <span className="text-xs text-slate-600">
          {row.bedCapacity} beds • {row.leadTimeDays}d lead
        </span>
      )
    },
    {
      key: "burmeseLiaison",
      label: "Burmese Language Desk",
      render: (row) => (
        <span className="text-xs text-teal-800 font-medium truncate max-w-xs block">
          {row.burmeseLiaison}
        </span>
      )
    },
    {
      key: "rating",
      label: "Rating",
      render: (row) => (
        <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-current" /> {row.rating}
        </span>
      )
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button variant="ghost" size="sm" icon={Edit} onClick={() => setEditingHospital(row)}>
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={row.status === "Inactive" ? "text-emerald-700" : "text-slate-500 hover:text-rose-600"}
            icon={row.status === "Inactive" ? Power : PowerOff}
            onClick={() => setToggleHospitalTarget(row)}
          >
            {row.status === "Inactive" ? "Activate" : "Deactivate"}
          </Button>
          <Link to={`/hospitals/${row.slug}`} target="_blank">
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
        title="Partner Hospital Network"
        subtitle="Accredited hospital network affiliations, department leads, and liaison contact numbers"
        breadcrumbs={[{ label: "Hospitals" }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setAddModalOpen(true)}>
            Add Partner Hospital
          </Button>
        }
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200 max-w-sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search hospitals..." />
      </div>

      <DataTable columns={columns} data={hospitals} isLoading={isLoading} />

      {/* Add Hospital Modal */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Add Partner Hospital" maxWidth="max-w-2xl">
        <HospitalForm
          onSubmit={handleAddSubmit}
          onCancel={() => setAddModalOpen(false)}
          isSubmitting={isSaving}
        />
      </Modal>

      {/* Edit Hospital Modal */}
      <Modal isOpen={Boolean(editingHospital)} onClose={() => setEditingHospital(null)} title="Edit Hospital Information" maxWidth="max-w-2xl">
        {editingHospital && (
          <HospitalForm
            initialValues={editingHospital}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingHospital(null)}
            isSubmitting={isSaving}
          />
        )}
      </Modal>

      {/* Deactivate/Activate Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(toggleHospitalTarget)}
        onClose={() => setToggleHospitalTarget(null)}
        onConfirm={handleToggleConfirm}
        title={toggleHospitalTarget?.status === "Inactive" ? "Activate Hospital" : "Deactivate Hospital"}
        message={
          toggleHospitalTarget?.status === "Inactive"
            ? `Reactivate ${toggleHospitalTarget?.name}? It will become available for new case matching.`
            : `Deactivate ${toggleHospitalTarget?.name}? It will be hidden from new case matching while preserving existing cases.`
        }
        confirmLabel={toggleHospitalTarget?.status === "Inactive" ? "Activate" : "Deactivate"}
        variant={toggleHospitalTarget?.status === "Inactive" ? "primary" : "danger"}
        isLoading={isSaving}
      />
    </div>
  );
}
