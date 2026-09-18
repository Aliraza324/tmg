import React, { useState } from "react";
import { MOCK_CASES } from "../../../data/cases";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/tables/DataTable";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import { formatDate } from "../../../utils/formatters";
import { FileSpreadsheet, Download, Filter } from "lucide-react";

export default function ReportsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedHospital, setSelectedHospital] = useState("All");

  const filtered = MOCK_CASES.filter((c) => {
    if (selectedSpecialty !== "All" && c.specialty !== selectedSpecialty) return false;
    if (selectedHospital !== "All" && !c.hospitalName.toLowerCase().includes(selectedHospital.toLowerCase())) return false;
    return true;
  });

  const exportCSV = () => {
    const headers = ["Case Code", "Patient Name", "Specialty", "Hospital", "Status", "Priority", "Coordinator", "Created Date"];
    const rows = filtered.map((c) => [
      c.caseCode,
      `"${c.patientName}"`,
      `"${c.specialty}"`,
      `"${c.hospitalName}"`,
      c.status,
      c.priority,
      `"${c.coordinatorName}"`,
      c.createdDate
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `TMG_Clinical_Report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { key: "caseCode", label: "Case ID" },
    { key: "patientName", label: "Patient" },
    { key: "specialty", label: "Specialty" },
    { key: "hospitalName", label: "Hospital" },
    { key: "status", label: "Status" },
    { key: "priority", label: "Priority" },
    { key: "coordinatorName", label: "Coordinator" },
    {
      key: "createdDate",
      label: "Created",
      render: (r) => formatDate(r.createdDate)
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operational &amp; Case Reports"
        subtitle="Generate, filter, and export clinical coordination datasets"
        breadcrumbs={[{ label: "Reports" }]}
        actions={
          <Button variant="primary" size="md" icon={Download} onClick={exportCSV}>
            Export CSV
          </Button>
        }
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap gap-4 items-center">
        <div className="w-48">
          <Select
            label="Filter Specialty"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            options={[
              { value: "All", label: "All Specialties" },
              { value: "Oncology", label: "Oncology" },
              { value: "Cardiology", label: "Cardiology" },
              { value: "Orthopedics", label: "Orthopedics" },
              { value: "Neurology", label: "Neurology" }
            ]}
          />
        </div>

        <div className="w-56">
          <Select
            label="Filter Hospital"
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            options={[
              { value: "All", label: "All Hospitals" },
              { value: "Bumrungrad", label: "Bumrungrad" },
              { value: "Bangkok", label: "Bangkok Hospital" },
              { value: "MedPark", label: "MedPark" },
              { value: "Siriraj", label: "Siriraj" },
              { value: "Vejthani", label: "Vejthani" }
            ]}
          />
        </div>

        <div className="pt-6">
          <span className="text-xs text-slate-500 font-medium">
            Showing {filtered.length} matching report rows
          </span>
        </div>
      </div>

      <DataTable columns={columns} data={filtered} />
    </div>
  );
}
