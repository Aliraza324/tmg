import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

const coordinatorSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role title is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(6, "Valid phone number is required"),
  location: z.string().min(2, "Location is required"),
  languages: z.string().min(2, "Languages are required"),
  specialtyFocus: z.string().min(2, "Specialty focus is required")
});

export default function CoordinatorForm({ initialValues = {}, onSubmit, onCancel, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(coordinatorSchema),
    defaultValues: {
      name: initialValues.name || "",
      role: initialValues.role || "Patient Coordinator",
      email: initialValues.email || "",
      phone: initialValues.phone || "+66 81 ",
      location: initialValues.location || "Bangkok Liaison Office",
      languages: Array.isArray(initialValues.languages)
        ? initialValues.languages.join(", ")
        : initialValues.languages || "Burmese (Native), Thai (Fluent)",
      specialtyFocus: Array.isArray(initialValues.specialtyFocus)
        ? initialValues.specialtyFocus.join(", ")
        : initialValues.specialtyFocus || "Oncology, Cardiology"
    }
  });

  const handleFormSubmit = (data) => {
    const formatted = {
      name: data.name,
      role: data.role,
      email: data.email,
      phone: data.phone,
      location: data.location,
      languages: data.languages.split(",").map((s) => s.trim()).filter(Boolean),
      specialtyFocus: data.specialtyFocus.split(",").map((s) => s.trim()).filter(Boolean)
    };
    onSubmit(formatted);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Full Name"
          required
          placeholder="e.g. Su Myat Noe"
          {...register("name")}
          error={errors.name?.message}
        />

        <Input
          label="Role Title"
          required
          placeholder="e.g. Patient Liaison & Hospital Facilitator"
          {...register("role")}
          error={errors.role?.message}
        />

        <Input
          label="Work Email"
          type="email"
          required
          placeholder="coord@tmghealthcare.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Direct Mobile Phone"
          required
          placeholder="+66 81 234 5678"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <Select
          label="Base Location Desk"
          required
          options={[
            { value: "Bangkok Liaison Office", label: "Bangkok Liaison Office" },
            { value: "Bangkok Hospital HQ Desk", label: "Bangkok Hospital HQ Desk" },
            { value: "Yangon Patient Center", label: "Yangon Patient Center" }
          ]}
          {...register("location")}
          error={errors.location?.message}
        />

        <Input
          label="Specialty Focus (comma separated)"
          required
          placeholder="Oncology, Cardiology"
          {...register("specialtyFocus")}
          error={errors.specialtyFocus?.message}
        />

        <div className="sm:col-span-2">
          <Input
            label="Languages Spoken (comma separated)"
            required
            placeholder="Burmese (Native), Thai (Fluent), English"
            {...register("languages")}
            error={errors.languages?.message}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
        <Button variant="secondary" size="sm" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
          Save Coordinator Profile
        </Button>
      </div>
    </form>
  );
}
