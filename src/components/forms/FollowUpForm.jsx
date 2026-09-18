import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

const followUpSchema = z.object({
  patientName: z.string().min(2, "Patient name is required"),
  caseCode: z.string().optional(),
  scheduledDate: z.string().min(4, "Date is required"),
  category: z.string().min(1, "Category is required"),
  coordinatorName: z.string().min(1, "Coordinator is required"),
  purpose: z.string().min(5, "Task purpose is required"),
  outcome: z.string().optional(),
  nextAction: z.string().min(2, "Next action is required"),
  status: z.string().min(1, "Status is required")
});

export default function FollowUpForm({ initialValues = {}, onSubmit, onCancel, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(followUpSchema),
    defaultValues: {
      patientName: initialValues.patientName || "",
      caseCode: initialValues.caseCode || "",
      scheduledDate: initialValues.scheduledDate || new Date().toISOString().split("T")[0],
      category: initialValues.category || "Upcoming",
      coordinatorName: initialValues.coordinatorName || "Thura Aung",
      purpose: initialValues.purpose || "",
      outcome: initialValues.outcome || "",
      nextAction: initialValues.nextAction || "Contact patient via Viber",
      status: initialValues.status || "Pending"
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Patient Name"
          required
          placeholder="e.g. U Kyaw Min"
          {...register("patientName")}
          error={errors.patientName?.message}
        />

        <Input
          label="Associated Case ID"
          placeholder="e.g. TMG-2026-000101"
          {...register("caseCode")}
        />

        <Input
          label="Follow-Up Due Date"
          type="date"
          required
          {...register("scheduledDate")}
          error={errors.scheduledDate?.message}
        />

        <Select
          label="Schedule Category"
          required
          options={[
            { value: "Upcoming", label: "Upcoming" },
            { value: "Today", label: "Today" },
            { value: "Overdue", label: "Overdue" },
            { value: "Completed", label: "Completed" }
          ]}
          {...register("category")}
          error={errors.category?.message}
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
          label="Status"
          required
          options={[
            { value: "Pending", label: "Pending" },
            { value: "Completed", label: "Completed" }
          ]}
          {...register("status")}
          error={errors.status?.message}
        />
      </div>

      <Textarea
        label="Follow-Up Purpose & Checklist"
        required
        rows={2}
        placeholder="e.g. Check arrival flight, verify post-discharge recovery, arrange blood test..."
        {...register("purpose")}
        error={errors.purpose?.message}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Current Outcome / Response"
          placeholder="e.g. Patient reports pain improving, no fever"
          {...register("outcome")}
        />
        <Input
          label="Next Clinical Action"
          required
          placeholder="e.g. Send translation summary to patient WhatsApp"
          {...register("nextAction")}
          error={errors.nextAction?.message}
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
        <Button variant="secondary" size="sm" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
          Save Follow-Up
        </Button>
      </div>
    </form>
  );
}
