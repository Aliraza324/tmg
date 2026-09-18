import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

const specialtySchema = z.object({
  name: z.string().min(2, "Specialty name is required"),
  burmeseName: z.string().optional(),
  category: z.string().min(2, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  commonConditions: z.string().min(2, "Common conditions are required"),
  servicesOffered: z.string().min(2, "Services offered are required")
});

export default function SpecialtyForm({ initialValues = {}, onSubmit, onCancel, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(specialtySchema),
    defaultValues: {
      name: initialValues.name || "",
      burmeseName: initialValues.burmeseName || "",
      category: initialValues.category || "Tertiary Specialized Care",
      description: initialValues.description || "",
      commonConditions: Array.isArray(initialValues.commonConditions)
        ? initialValues.commonConditions.join(", ")
        : initialValues.commonConditions || "",
      servicesOffered: Array.isArray(initialValues.servicesOffered)
        ? initialValues.servicesOffered.join(", ")
        : initialValues.servicesOffered || ""
    }
  });

  const handleFormSubmit = (data) => {
    const formatted = {
      name: data.name,
      burmeseName: data.burmeseName,
      category: data.category,
      description: data.description,
      commonConditions: data.commonConditions.split(",").map((s) => s.trim()).filter(Boolean),
      servicesOffered: data.servicesOffered.split(",").map((s) => s.trim()).filter(Boolean)
    };
    onSubmit(formatted);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Specialty English Name"
          required
          placeholder="e.g. Medical & Surgical Oncology"
          {...register("name")}
          error={errors.name?.message}
        />

        <Input
          label="Burmese Translation (မြန်မာအမည်)"
          placeholder="e.g. ကင်ဆာရောဂါ အထူးကုဌာန"
          {...register("burmeseName")}
        />

        <div className="sm:col-span-2">
          <Input
            label="Clinical Category"
            required
            placeholder="e.g. Tertiary Specialized Care / Surgical"
            {...register("category")}
            error={errors.category?.message}
          />
        </div>
      </div>

      <Textarea
        label="Specialty Description & Scope"
        required
        rows={3}
        placeholder="Clinical scope, treatment modalities, diagnostic tools..."
        {...register("description")}
        error={errors.description?.message}
      />

      <Input
        label="Common Conditions Treated (comma separated)"
        required
        placeholder="Lung Carcinoma, Breast Cancer, Lymphoma"
        {...register("commonConditions")}
        error={errors.commonConditions?.message}
      />

      <Input
        label="Services & Procedures Offered (comma separated)"
        required
        placeholder="PET-CT Staging, Infusion Chemotherapy, Targeted Therapy"
        {...register("servicesOffered")}
        error={errors.servicesOffered?.message}
      />

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
        <Button variant="secondary" size="sm" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
          Save Specialty
        </Button>
      </div>
    </form>
  );
}
