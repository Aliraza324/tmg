import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

const docMetadataSchema = z.object({
  title: z.string().min(2, "Document title is required"),
  category: z.string().min(2, "Category is required"),
  patientName: z.string().min(2, "Patient name is required"),
  caseCode: z.string().optional(),
  description: z.string().optional()
});

export default function DocumentMetadataForm({ initialValues = {}, onSubmit, onCancel, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(docMetadataSchema),
    defaultValues: {
      title: initialValues.title || "",
      category: initialValues.category || "Pathology & Imaging",
      patientName: initialValues.patientName || "",
      caseCode: initialValues.caseCode || "",
      description: initialValues.description || ""
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
      <Input
        label="Document Title"
        required
        placeholder="e.g. Brain MRA Diagnostic Scan"
        {...register("title")}
        error={errors.title?.message}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select
          label="Clinical Category"
          required
          options={[
            { value: "Pathology & Imaging", label: "Pathology & Imaging" },
            { value: "Identity & Referral", label: "Identity & Referral" },
            { value: "Diagnostic Cardiology", label: "Diagnostic Cardiology" },
            { value: "Neuroscience", label: "Neuroscience" },
            { value: "General Medical", label: "General Medical" }
          ]}
          {...register("category")}
          error={errors.category?.message}
        />

        <Input
          label="Associated Patient Name"
          required
          placeholder="e.g. U Kyaw Min"
          {...register("patientName")}
          error={errors.patientName?.message}
        />
      </div>

      <Input
        label="Associated Case ID"
        placeholder="e.g. TMG-2026-000101"
        {...register("caseCode")}
      />

      <Textarea
        label="Clinical Description / Notes"
        rows={2}
        placeholder="Brief description of findings or hospital notes..."
        {...register("description")}
      />

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
        <Button variant="secondary" size="sm" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
          Update Metadata
        </Button>
      </div>
    </form>
  );
}
