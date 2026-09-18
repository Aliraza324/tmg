import React from "react";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

export default function StepPatientInfo({ register, errors }) {
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other / Prefer not to say" }
  ];

  const languageOptions = [
    { value: "Burmese", label: "Burmese (မြန်မာစာ)" },
    { value: "English", label: "English" },
    { value: "Shan", label: "Shan / Burmese" },
    { value: "Other", label: "Other" }
  ];

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900">Step 1: Patient Demographic Information</h3>
        <p className="text-xs text-slate-500 mt-0.5">Please provide accurate personal contact details for coordination.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input
            label="Patient Full Name (as per Passport)"
            required
            placeholder="e.g. U Kyaw Min"
            {...register("fullName")}
            error={errors.fullName?.message}
          />
        </div>

        <Select
          label="Gender"
          required
          options={genderOptions}
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
          placeholder="e.g. Yangon, Mandalay, Taunggyi"
          {...register("city")}
          error={errors.city?.message}
        />

        <Input
          label="Country of Residence"
          required
          defaultValue="Myanmar"
          {...register("country")}
          error={errors.country?.message}
        />

        <Input
          label="Mobile Phone (Viber / WhatsApp preferred)"
          required
          placeholder="e.g. +95 9 421 084 192"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. patient@example.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <div className="sm:col-span-2">
          <Select
            label="Preferred Communication Language"
            required
            options={languageOptions}
            {...register("preferredLanguage")}
            error={errors.preferredLanguage?.message}
          />
        </div>
      </div>
    </div>
  );
}
