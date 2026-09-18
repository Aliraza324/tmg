import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import { CASE_PRIORITIES, CASE_STATUSES } from "../../constants/statuses";

const caseSchema = z.object({
  patientName: z.string().min(2, "Patient name is required"),
  specialty: z.string().min(1, "Specialty is required"),
  subSpecialty: z.string().optional(),
  hospitalName: z.string().optional(),
  assignedDoctor: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  priority: z.string().min(1, "Priority is required"),
  coordinatorName: z.string().min(1, "Coordinator is required"),
  clinicalSummary: z.string().min(10, "Clinical summary must be at least 10 characters"),
  urgencyReason: z.string().optional()
});

export default function CaseForm({ initialValues = {}, onSubmit, onCancel, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      patientName: initialValues.patientName || "",
      specialty: initialValues.specialty || "Oncology",
      subSpecialty: initialValues.subSpecialty || "",
      hospitalName: initialValues.hospitalName || "",
      assignedDoctor: initialValues.assignedDoctor || "",
      status: initialValues.status || "New",
      priority: initialValues.priority || "Normal",
      coordinatorName: initialValues.coordinatorName || "Thura Aung",
      clinicalSummary: initialValues.clinicalSummary || "",
      urgencyReason: initialValues.urgencyReason || ""
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Patient Name"
          required
          {...register("patientName")}
          error={errors.patientName?.message}
        />

        <Select
          label="Medical Specialty"
          required
          options={[
            { value: "Oncology", label: "Oncology & Cancer Care" },
            { value: "Cardiology", label: "Cardiology & Cardiac Surgery" },
            { value: "Orthopedics", label: "Orthopedics & Spine" },
            { value: "Neurology", label: "Neurology & Brain" },
            { value: "Gastroenterology", label: "Gastroenterology & Liver" },
            { value: "Organ Transplant", label: "Organ Transplant" },
            { value: "Health Screening", label: "Health Screening & Wellness" }
          ]}
          {...register("specialty")}
          error={errors.specialty?.message}
        />

        <Input
          label="Sub-Specialty Focus"
          placeholder="e.g. Thoracic Oncology"
          {...register("subSpecialty")}
        />

        <Select
          label="Assigned Hospital"
          options={[
            { value: "", label: "None / Matching in Progress" },
            { value: "Bumrungrad International Hospital", label: "Bumrungrad International" },
            { value: "Bangkok Hospital Headquarters (BDMS)", label: "Bangkok Hospital HQ" },
            { value: "MedPark Hospital", label: "MedPark Hospital" },
            { value: "Samitivej Sukhumvit Hospital", label: "Samitivej Sukhumvit" },
            { value: "Siriraj Piyamaharajkarun Hospital", label: "Siriraj Piyamaharajkarun" },
            { value: "Vejthani Hospital", label: "Vejthani Hospital" },
            { value: "Praram 9 Hospital", label: "Praram 9 Hospital" }
          ]}
          {...register("hospitalName")}
        />

        <Input
          label="Attending Doctor / Specialist"
          placeholder="e.g. Dr. Artit Jinawath"
          {...register("assignedDoctor")}
        />

        <Select
          label="Assigned Coordinator"
          required
          options={[
            { value: "Thura Aung", label: "Thura Aung" },
            { value: "Su Myat Noe", label: "Su Myat Noe" },
            { value: "Htet Lin Oo", label: "Htet Lin Oo" },
            { value: "May Zun Phyo", label: "May Zun Phyo" }
          ]}
          {...register("coordinatorName")}
          error={errors.coordinatorName?.message}
        />

        <Select
          label="Priority"
          required
          options={Object.values(CASE_PRIORITIES).map((p) => ({ value: p, label: p }))}
          {...register("priority")}
          error={errors.priority?.message}
        />

        <Select
          label="Lifecycle Status"
          required
          options={Object.values(CASE_STATUSES).map((s) => ({ value: s, label: s }))}
          {...register("status")}
          error={errors.status?.message}
        />
      </div>

      <Textarea
        label="Clinical Summary & Intake Diagnosis"
        required
        rows={3}
        placeholder="Clinical narrative, current symptoms, and requirements..."
        {...register("clinicalSummary")}
        error={errors.clinicalSummary?.message}
      />

      <Input
        label="Urgency Justification / Reason"
        placeholder="Reason for urgency escalation..."
        {...register("urgencyReason")}
      />

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
        <Button variant="secondary" size="sm" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
          Save Case Changes
        </Button>
      </div>
    </form>
  );
}
