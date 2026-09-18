import React, { useState, useEffect } from "react";
import { documentService } from "../../../services/documentService";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/tables/DataTable";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import SearchInput from "../../../components/common/SearchInput";
import DocumentMetadataForm from "../../../components/forms/DocumentMetadataForm";
import { formatFileSize, formatDate } from "../../../utils/formatters";
import { FileText, Download, Eye, Trash2, Plus, ShieldCheck, ShieldAlert, Edit2 } from "lucide-react";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState("All");

  // Preview, edit, and upload modals
  const [previewDoc, setPreviewDoc] = useState(null);
  const [editDoc, setEditDoc] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadPatient, setUploadPatient] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Pathology & Imaging");

  const loadDocuments = () => {
    setIsLoading(true);
    documentService
      .getDocuments({ search, fileType: fileTypeFilter })
      .then((data) => {
        setDocuments(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadDocuments();
  }, [search, fileTypeFilter]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this clinical document record?")) {
      await documentService.deleteDocument(id);
      loadDocuments();
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadTitle) return;
    await documentService.uploadDocument({
      title: uploadTitle,
      fileName: `${uploadTitle.replace(/\s+/g, "_")}.pdf`,
      patientName: uploadPatient || "Ko Sai Lon",
      caseCode: "TMG-2026-000107",
      category: uploadCategory,
      description: "Uploaded by coordinator during hospital pre-admission briefing."
    });
    setUploadModalOpen(false);
    setUploadTitle("");
    loadDocuments();
  };

  const handleEditSubmit = async (values) => {
    if (!editDoc) return;
    setIsSubmitting(true);
    try {
      await documentService.updateDocumentMetadata(editDoc.id, values);
      setEditDoc(null);
      loadDocuments();
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      key: "title",
      label: "Document Title",
      render: (row) => (
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded bg-primary-50 text-primary-700 flex items-center justify-center shrink-0 mt-0.5">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-slate-900 block text-xs">{row.title}</span>
            <span className="text-[11px] text-slate-400 font-mono">{row.fileName}</span>
          </div>
        </div>
      )
    },
    {
      key: "patientName",
      label: "Patient & Case",
      render: (row) => (
        <div>
          <span className="font-medium text-slate-800 text-xs block">{row.patientName}</span>
          <span className="font-mono text-[10px] text-slate-400">{row.caseCode}</span>
        </div>
      )
    },
    {
      key: "category",
      label: "Category",
      render: (row) => (
        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
          {row.category}
        </span>
      )
    },
    {
      key: "fileSize",
      label: "Size & Type",
      render: (row) => (
        <span className="text-xs text-slate-500">
          {formatFileSize(row.fileSizeBytes)} • {row.fileType}
        </span>
      )
    },
    {
      key: "security",
      label: "Privacy",
      render: (row) =>
        row.isSensitive ? (
          <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded flex items-center gap-1 w-max">
            <ShieldCheck className="w-3 h-3 text-teal-700" /> Sensitive File
          </span>
        ) : (
          <span className="text-xs text-slate-400">Standard</span>
        )
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => setPreviewDoc(row)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert(`Simulating download for "${row.fileName}"`)}
            className="p-1.5 text-slate-500 hover:text-primary-700 hover:bg-slate-100 rounded"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => setEditDoc(row)}
            className="p-1.5 text-slate-500 hover:text-primary-700 hover:bg-slate-100 rounded"
            title="Edit Metadata"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clinical Document Repository"
        subtitle="Secure encrypted storage simulation for diagnostic scans, pathology, and travel files"
        breadcrumbs={[{ label: "Documents" }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setUploadModalOpen(true)}>
            Upload Document
          </Button>
        }
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80">
          <SearchInput value={search} onChange={setSearch} placeholder="Search documents or patients..." />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={fileTypeFilter}
            onChange={(e) => setFileTypeFilter(e.target.value)}
            options={[
              { value: "All", label: "All Formats" },
              { value: "PDF", label: "PDF Documents" },
              { value: "JPG", label: "JPG Scans" },
              { value: "PNG", label: "PNG Images" }
            ]}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={documents}
        isLoading={isLoading}
        emptyTitle="No documents match criteria"
      />

      {/* Upload Simulation Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Clinical Record"
        description="Attach medical reports to a patient case."
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
          <Input
            label="Document Title"
            required
            value={uploadTitle}
            onChange={(e) => setUploadTitle(e.target.value)}
            placeholder="e.g. Brain MRA Scan & Radiology Report"
          />
          <Input
            label="Associated Patient Name"
            value={uploadPatient}
            onChange={(e) => setUploadPatient(e.target.value)}
            placeholder="e.g. U Kyaw Min"
          />
          <Select
            label="Category"
            value={uploadCategory}
            onChange={(e) => setUploadCategory(e.target.value)}
            options={[
              { value: "Pathology & Imaging", label: "Pathology & Imaging" },
              { value: "Identity & Referral", label: "Identity & Referral" },
              { value: "Diagnostic Cardiology", label: "Diagnostic Cardiology" },
              { value: "Neuroscience", label: "Neuroscience" }
            ]}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Document
            </Button>
          </div>
        </form>
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={Boolean(previewDoc)}
        onClose={() => setPreviewDoc(null)}
        title={previewDoc?.title}
        description={previewDoc?.fileName}
      >
        <div className="space-y-4 text-xs text-slate-700">
          <div className="h-60 rounded bg-slate-100 flex flex-col items-center justify-center p-4 text-center">
            {previewDoc?.previewUrl ? (
              <img src={previewDoc.previewUrl} alt="Preview" className="max-h-full rounded object-contain" />
            ) : (
              <>
                <FileText className="w-12 h-12 text-slate-400 mb-2" />
                <p className="font-semibold text-slate-800">{previewDoc?.title}</p>
                <p className="text-slate-500 text-[11px] mt-1">{previewDoc?.description}</p>
              </>
            )}
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" size="sm" onClick={() => setPreviewDoc(null)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Metadata Modal */}
      <Modal
        isOpen={Boolean(editDoc)}
        onClose={() => setEditDoc(null)}
        title="Edit Document Metadata"
        description="Update clinical categorization, patient association, or notes."
      >
        {editDoc && (
          <DocumentMetadataForm
            initialValues={editDoc}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditDoc(null)}
            isSubmitting={isSubmitting}
          />
        )}
      </Modal>
    </div>
  );
}
