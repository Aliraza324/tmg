import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { caseService } from "../../../services/caseService";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/tables/DataTable";
import TablePagination from "../../../components/tables/TablePagination";
import SearchInput from "../../../components/common/SearchInput";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import CaseForm from "../../../components/forms/CaseForm";
import { CaseStatusBadge, CasePriorityBadge } from "../../../components/common/StatusBadge";
import { CASE_STATUSES, CASE_PRIORITIES } from "../../../constants/statuses";
import { formatDate } from "../../../utils/formatters";
import { ArrowUpRight, Plus, FolderKanban, RotateCcw, Archive } from "lucide-react";

export default function CasesPage() {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [includeArchived, setIncludeArchived] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pageSize = 6;

  const loadCases = () => {
    setIsLoading(true);
    caseService
      .getCases({
        search,
        status: statusFilter,
        priority: priorityFilter,
        specialty: specialtyFilter,
        includeArchived
      })
      .then((data) => {
        setCases(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadCases();
  }, [search, statusFilter, priorityFilter, specialtyFilter, includeArchived]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setSpecialtyFilter("All");
    setIncludeArchived(false);
    setCurrentPage(1);
  };

  const handleAddCase = async (formData) => {
    setIsSubmitting(true);
    await caseService.createCase(formData);
    setIsSubmitting(false);
    setAddModalOpen(false);
    loadCases();
  };

  const columns = [
    {
      key: "caseCode",
      label: "Case ID",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <Link
            to={`/cases/${row.id}`}
            className="font-mono font-bold text-primary-700 hover:underline"
          >
            {row.caseCode}
          </Link>
          {row.isArchived && (
            <span className="text-[10px] bg-slate-100 text-slate-500 font-semibold px-1.5 py-0.5 rounded">
              Archived
            </span>
          )}
        </div>
      )
    },
    {
      key: "patientName",
      label: "Patient",
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block">{row.patientName}</span>
          <span className="text-[11px] text-slate-400">
            {row.gender || "Patient"}, {row.age ? `${row.age} yrs` : ""}
          </span>
        </div>
      )
    },
    {
      key: "specialty",
      label: "Specialty",
      render: (row) => (
        <div>
          <span className="text-slate-800 font-medium block">{row.specialty}</span>
          <span className="text-[11px] text-slate-400">{row.subSpecialty || "General"}</span>
        </div>
      )
    },
    {
      key: "hospitalName",
      label: "Hospital Partner",
      render: (row) => (
        <span className="text-xs text-slate-700 truncate max-w-[160px] block">
          {row.hospitalName || "Matching in progress"}
        </span>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <CaseStatusBadge status={row.status} />
    },
    {
      key: "priority",
      label: "Priority",
      render: (row) => <CasePriorityBadge priority={row.priority} />
    },
    {
      key: "coordinatorName",
      label: "Coordinator",
      render: (row) => (
        <span className="text-xs font-medium text-slate-700">{row.coordinatorName}</span>
      )
    },
    {
      key: "lastActivityDate",
      label: "Last Activity",
      render: (row) => (
        <span className="text-xs text-slate-500">{formatDate(row.lastActivityDate)}</span>
      )
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <Link to={`/cases/${row.id}`}>
          <Button variant="secondary" size="sm" icon={ArrowUpRight}>
            Workspace
          </Button>
        </Link>
      )
    }
  ];

  const paginatedCases = cases.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Case Management Workspace"
        subtitle="Active patient cases undergoing clinical assessment, hospital matching, and coordination"
        breadcrumbs={[{ label: "Cases" }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setAddModalOpen(true)}>
            Add Case
          </Button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col lg:flex-row gap-3 items-center justify-between">
        <div className="w-full lg:w-72">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by ID, patient, specialty..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <div className="w-36">
            <Select
              options={[{ value: "All", label: "All Statuses" }, ...Object.values(CASE_STATUSES).map((s) => ({ value: s, label: s }))]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>

          <div className="w-36">
            <Select
              options={[{ value: "All", label: "All Priorities" }, ...Object.values(CASE_PRIORITIES).map((p) => ({ value: p, label: p }))]}
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            />
          </div>

          <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={includeArchived}
              onChange={(e) => setIncludeArchived(e.target.checked)}
              className="rounded border-slate-300 text-primary-700"
            />
            <span>Show Archived</span>
          </label>

          {(search || statusFilter !== "All" || priorityFilter !== "All" || specialtyFilter !== "All" || includeArchived) && (
            <Button variant="ghost" size="sm" onClick={resetFilters} icon={RotateCcw}>
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Cases Table */}
      <DataTable
        columns={columns}
        data={paginatedCases}
        isLoading={isLoading}
        emptyTitle="No cases match your filters"
        emptyDescription="Try clearing your search query or toggling filters."
        emptyAction={<Button variant="secondary" onClick={resetFilters}>Clear Filters</Button>}
      />

      {cases.length > pageSize && (
        <TablePagination
          currentPage={currentPage}
          totalItems={cases.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Add Case Modal */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Create New Coordination Case" maxWidth="max-w-2xl">
        <CaseForm
          onSubmit={handleAddCase}
          onCancel={() => setAddModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
}
