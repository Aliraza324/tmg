import React, { useState } from "react";
import { UploadCloud, FileText, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "../../../components/ui/Button";
import { formatFileSize } from "../../../utils/formatters";

export default function StepDocuments({ uploadedFiles, setUploadedFiles }) {
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  const maxSizeBytes = 15 * 1024 * 1024; // 15MB

  const handleFiles = (filesList) => {
    setErrorMsg("");
    const newFiles = [];

    for (let i = 0; i < filesList.length; i++) {
      const file = filesList[i];
      if (file.size > maxSizeBytes) {
        setErrorMsg(`File "${file.name}" exceeds 15MB limit.`);
        continue;
      }
      newFiles.push({
        id: `mock-${Date.now()}-${i}`,
        name: file.name,
        size: file.size,
        type: file.name.split(".").pop().toUpperCase(),
        uploadedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      });
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (id) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900">Step 3: Medical Reports &amp; Imaging Upload</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Attach existing doctor summaries, biopsy reports, or blood tests. Supported formats: PDF, JPG, PNG, DOCX (Max 15MB each).
        </p>
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-colors ${
          dragActive
            ? "border-primary-600 bg-primary-50/50"
            : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center mx-auto text-primary-700 mb-3">
          <UploadCloud className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-slate-800">
          Drag and drop your medical files here
        </p>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          or click below to browse from your device
        </p>

        <label className="inline-block cursor-pointer">
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files);
            }}
          />
          <span className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs">
            Browse Files
          </span>
        </label>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-semibold text-slate-700">
            Attached Files ({uploadedFiles.length})
          </h4>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 text-xs"
              >
                <div className="flex items-center gap-3 truncate">
                  <div className="w-8 h-8 rounded bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="font-semibold text-slate-800 truncate max-w-xs">{file.name}</p>
                    <p className="text-[11px] text-slate-500">{formatFileSize(file.size)} • {file.type}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(file.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition rounded"
                  title="Remove file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-[11px] text-slate-400 italic">
        * Don't have reports right now? You can skip this step and share them via Viber or WhatsApp with your assigned coordinator later.
      </p>
    </div>
  );
}
