import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { patientService } from "../../../services/patientService";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/tables/DataTable";
import SearchInput from "../../../components/common/SearchInput";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import Badge from "../../../components/ui/Badge";
import PatientForm from "../../../components/forms/PatientForm";
import { maskPhoneNumber, formatDate } from "../../../utils/formatters";
import { Users, ArrowUpRight, Plus, MapPin } from "lucide-react";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadPatients = () => {
    setIsLoading(true);
    patientService.getPatients(search).then((data) => {
      setPatients(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadPatients();
  }, [search]);

  const handleAddPatient = async (formData) => {
    setIsSubmitting(true);
    await patientService.createPatient(formData);
    setIsSubmitting(false);
    setAddModalOpen(false);
    loadPatients();
  };

  const columns = [
    {
      key: "fullName",
      label: "Patient Name",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Link to={`/patients/${row.id}`} className="font-semibold text-primary-700 hover:underline">
            {row.fullName}
          </Link>
          <Badge variant={row.status === "Inactive" ? "slate" : "emerald"} size="sm">
            {row.status || "Active"}
          </Badge>
        </div>
      )
    },
    {
      key: "gender",
      label: "Demographics",
      render: (row) => (
        <span className="text-xs text-slate-600">
          {row.gender}, {row.age} yrs
        </span>
      )
    },
    {
      key: "primaryDiagnosis",
      label: "Clinical Intake Reason",
      render: (row) => (
        <span className="text-xs text-slate-700 truncate max-w-xs block">
          {row.primaryDiagnosis}
        </span>
      )
    },
    {
      key: "location",
      label: "Origin",
      render: (row) => (
        <span className="text-xs text-slate-600 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-slate-400" /> {row.city}, {row.country}
        </span>
      )
    },
    {
      key: "phone",
      label: "Phone Contact",
      render: (row) => (
        <span className="font-mono text-xs text-slate-600">{maskPhoneNumber(row.phone)}</span>
      )
    },
    {
      key: "preferredLanguage",
      label: "Language",
      render: (row) => (
        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
          {row.preferredLanguage}
        </span>
      )
    },
    {
      key: "registeredDate",
      label: "Intake Date",
      render: (row) => <span className="text-xs text-slate-500">{formatDate(row.registeredDate)}</span>
    },
    {
      key: "actions",
      label: "Action",
      align: "right",
      render: (row) => (
        <Link to={`/patients/${row.id}`}>
          <Button variant="secondary" size="sm" icon={ArrowUpRight}>
            Profile
          </Button>
        </Link>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Directory"
        subtitle="Centralized registry of Myanmar patients receiving cross-border coordination"
        breadcrumbs={[{ label: "Patients" }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setAddModalOpen(true)}>
            Add Patient
          </Button>
        }
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200 max-w-sm">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by patient name, city, phone..."
        />
      </div>

      <DataTable
        columns={columns}
        data={patients}
        isLoading={isLoading}
        emptyTitle="No patients found"
        emptyDescription="Try searching with a different name or township."
      />

      {/* Add Patient Modal */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Register New Patient" maxWidth="max-w-2xl">
        <PatientForm
          onSubmit={handleAddPatient}
          onCancel={() => setAddModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
}
