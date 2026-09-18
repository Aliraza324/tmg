import React, { useState } from "react";
import { MOCK_DOCUMENTS } from "../../data/documents";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import { formatFileSize, formatDate } from "../../utils/formatters";
import { FileText, Download, Eye, UploadCloud, Shield, Trash2 } from "lucide-react";

export default function CaseDocumentsTab({ caseData }) {
  const [previewDoc, setPreviewDoc] = useState(null);
  const caseDocs = MOCK_DOCUMENTS.filter((d) => d.caseId === caseData.id || d.caseCode === caseData.caseCode);
  const displayDocs = caseDocs.length > 0 ? caseDocs : MOCK_DOCUMENTS.slice(0, 2);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">Medical Records &amp; Diagnostic Files</h4>
          <p className="text-xs text-slate-500 mt-0.5">Confidential DICOM imaging, pathology slides, and referrals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayDocs.map((doc) => (
          <Card key={doc.id} className="p-4 flex flex-col justify-between space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h5 className="font-semibold text-slate-900 text-xs truncate">{doc.title}</h5>
                  {doc.isSensitive && <Shield className="w-3.5 h-3.5 text-teal-600 shrink-0" title="Sensitive Clinical File" />}
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{doc.fileName}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {formatFileSize(doc.fileSizeBytes)} • Uploaded {formatDate(doc.uploadedDate)}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 line-clamp-2">
              {doc.description}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                icon={Eye}
                onClick={() => setPreviewDoc(doc)}
              >
                Preview
              </Button>
              <Button
                variant="outlineTeal"
                size="sm"
                icon={Download}
                onClick={() => alert(`Simulating secure download for "${doc.fileName}"`)}
              >
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Document Preview Modal */}
      <Modal
        isOpen={Boolean(previewDoc)}
        onClose={() => setPreviewDoc(null)}
        title={previewDoc?.title}
        description={`File: ${previewDoc?.fileName} (${previewDoc ? formatFileSize(previewDoc.fileSizeBytes) : ""})`}
      >
        <div className="space-y-4 text-xs text-slate-700">
          <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-teal-950 flex items-center gap-2">
            <Shield className="w-4 h-4 text-teal-700 shrink-0" />
            <span>Encrypted clinical record viewer (Prototype simulation mode)</span>
          </div>

          <div className="h-64 rounded-lg bg-slate-100 border border-slate-200 flex flex-col items-center justify-center p-6 text-center">
            {previewDoc?.previewUrl ? (
              <img
                src={previewDoc.previewUrl}
                alt="Document preview"
                className="max-h-full rounded object-contain"
              />
            ) : (
              <>
                <FileText className="w-12 h-12 text-slate-400 mb-2" />
                <p className="font-semibold text-slate-800">{previewDoc?.title}</p>
                <p className="text-slate-500 text-[11px] mt-1 max-w-sm">{previewDoc?.description}</p>
              </>
            )}
          </div>

          <div className="flex justify-end">
            <Button variant="secondary" size="sm" onClick={() => setPreviewDoc(null)}>
              Close Viewer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
