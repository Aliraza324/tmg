import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

const hospitalSchema = z.object({
  name: z.string().min(2, "Hospital name is required"),
  district: z.string().min(2, "District/area is required"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(6, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  bedCapacity: z.coerce.number().min(1, "Bed capacity is required"),
  leadTimeDays: z.coerce.number().min(1, "Lead time days is required"),
  accreditations: z.string().min(2, "At least one accreditation is required"),
  specialties: z.string().min(2, "Specialties are required (comma separated)"),
  burmeseLiaison: z.string().min(2, "Burmese liaison info is required"),
  overview: z.string().min(10, "Hospital overview must be at least 10 characters"),
  image: z.string().optional()
});

export default function HospitalForm({ initialValues = {}, onSubmit, onCancel, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(hospitalSchema),
    defaultValues: {
      name: initialValues.name || "",
      district: initialValues.district || "Watthana, Bangkok",
      address: initialValues.address || "",
      phone: initialValues.phone || "+66 2 000 0000",
      email: initialValues.email || "international@hospital.com",
      bedCapacity: initialValues.bedCapacity || 300,
      leadTimeDays: initialValues.leadTimeDays || 2,
      accreditations: Array.isArray(initialValues.accreditations)
        ? initialValues.accreditations.join(", ")
        : initialValues.accreditations || "JCI Accredited, HA Thailand",
      specialties: Array.isArray(initialValues.specialties)
        ? initialValues.specialties.join(", ")
        : initialValues.specialties || "Oncology, Cardiology, Orthopedics",
      burmeseLiaison: initialValues.burmeseLiaison || "Dedicated Myanmar Patient Service Counter",
      overview: initialValues.overview || "",
      image: initialValues.image || ""
    }
  });

  const handleFormSubmit = (data) => {
    const formatted = {
      name: data.name,
      city: "Bangkok",
      district: data.district,
      address: data.address,
      phone: data.phone,
      email: data.email,
      bedCapacity: Number(data.bedCapacity),
      leadTimeDays: Number(data.leadTimeDays),
      accreditations: data.accreditations.split(",").map((s) => s.trim()).filter(Boolean),
      specialties: data.specialties.split(",").map((s) => s.trim()).filter(Boolean),
      burmeseLiaison: data.burmeseLiaison,
      overview: data.overview,
      image:
        data.image ||
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80"
    };
    onSubmit(formatted);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <Input
            label="Hospital Name"
            required
            placeholder="e.g. Bumrungrad International Hospital"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>

        <Input
          label="District & Location"
          required
          placeholder="e.g. Watthana (Sukhumvit 3)"
          {...register("district")}
          error={errors.district?.message}
        />

        <Input
          label="Bed Capacity"
          type="number"
          required
          {...register("bedCapacity")}
          error={errors.bedCapacity?.message}
        />

        <div className="sm:col-span-2">
          <Input
            label="Full Physical Address"
            required
            placeholder="Complete street address in Bangkok"
            {...register("address")}
            error={errors.address?.message}
          />
        </div>

        <Input
          label="International Desk Phone"
          required
          placeholder="+66 2 000 0000"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <Input
          label="Referral Email"
          type="email"
          required
          placeholder="liaison@hospital.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Lead Time (Business Days)"
          type="number"
          required
          {...register("leadTimeDays")}
          error={errors.leadTimeDays?.message}
        />

        <Input
          label="Accreditations (comma separated)"
          required
          placeholder="JCI Accredited, HA Thailand"
          {...register("accreditations")}
          error={errors.accreditations?.message}
        />

        <div className="sm:col-span-2">
          <Input
            label="Key Specialties (comma separated)"
            required
            placeholder="Oncology, Cardiology, Orthopedics, Neurology"
            {...register("specialties")}
            error={errors.specialties?.message}
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            label="Burmese Language Service Note"
            required
            placeholder="e.g. Dedicated Myanmar Patient Service Counter on 10th Floor"
            {...register("burmeseLiaison")}
            error={errors.burmeseLiaison?.message}
          />
        </div>
      </div>

      <Textarea
        label="Hospital Overview & Center Highlights"
        required
        rows={3}
        placeholder="Brief description of hospital capabilities, quaternary institutes..."
        {...register("overview")}
        error={errors.overview?.message}
      />

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
        <Button variant="secondary" size="sm" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
          Save Hospital
        </Button>
      </div>
    </form>
  );
}
