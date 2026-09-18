import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

const patientSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.string().min(4, "Date of birth is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().min(6, "Valid phone number is required"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  preferredLanguage: z.string().min(1, "Preferred language is required"),
  primaryDiagnosis: z.string().min(5, "Clinical diagnosis is required"),
  emergencyName: z.string().optional(),
  emergencyPhone: z.string().optional()
});

export default function PatientForm({ initialValues = {}, onSubmit, onCancel, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      fullName: initialValues.fullName || "",
      gender: initialValues.gender || "Male",
      dateOfBirth: initialValues.dateOfBirth || "1980-01-01",
      city: initialValues.city || "Yangon",
      country: initialValues.country || "Myanmar",
      phone: initialValues.phone || "",
      email: initialValues.email || "",
      preferredLanguage: initialValues.preferredLanguage || "Burmese",
      primaryDiagnosis: initialValues.primaryDiagnosis || "",
      emergencyName: initialValues.emergencyContact?.name || "",
      emergencyPhone: initialValues.emergencyContact?.phone || ""
    }
  });

  const handleFormSubmit = (data) => {
    const formatted = {
      fullName: data.fullName,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      age: new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear() || 40,
      city: data.city,
      country: data.country,
      phone: data.phone,
      email: data.email,
      preferredLanguage: data.preferredLanguage,
      primaryDiagnosis: data.primaryDiagnosis,
      emergencyContact: {
        name: data.emergencyName || "Family Next of Kin",
        phone: data.emergencyPhone || data.phone,
        relation: "Relative"
      }
    };
    onSubmit(formatted);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <Input
            label="Patient Full Name"
            required
            placeholder="e.g. U Kyaw Min"
            {...register("fullName")}
            error={errors.fullName?.message}
          />
        </div>

        <Select
          label="Gender"
          required
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" }
          ]}
          {...register("gender")}
          error={errors.gender?.message}
        />

        <Input
          label="Date of Birth"
          type="date"
          required
          {...register("dateOfBirth")}
          error={errors.dateOfBirth?.message}
        />

        <Input
          label="Current City / Township"
          required
          placeholder="e.g. Yangon, Mandalay"
          {...register("city")}
          error={errors.city?.message}
        />

        <Input
          label="Country"
          required
          {...register("country")}
          error={errors.country?.message}
        />

        <Input
          label="Phone Number"
          required
          placeholder="+95 9 123 456 789"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="patient@example.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Select
          label="Preferred Communication Language"
          required
          options={[
            { value: "Burmese", label: "Burmese (မြန်မာစာ)" },
            { value: "English", label: "English" },
            { value: "Burmese / Shan", label: "Burmese / Shan" },
            { value: "English / Burmese", label: "English / Burmese" }
          ]}
          {...register("preferredLanguage")}
          error={errors.preferredLanguage?.message}
        />
      </div>

      <Textarea
        label="Primary Clinical Diagnosis / Intake Reason"
        required
        rows={2}
        placeholder="Primary illness or medical condition summary..."
        {...register("primaryDiagnosis")}
        error={errors.primaryDiagnosis?.message}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
        <Input
          label="Emergency Contact Name"
          placeholder="e.g. Daw Khin Myint (Spouse)"
          {...register("emergencyName")}
        />
        <Input
          label="Emergency Contact Phone"
          placeholder="e.g. +95 9 123 456 789"
          {...register("emergencyPhone")}
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
        <Button variant="secondary" size="sm" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
          Save Patient Information
        </Button>
      </div>
    </form>
  );
}
