import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { ROLES } from "../../constants/roles";

const userSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  role: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required")
});

export default function UserForm({ initialValues = {}, onSubmit, onCancel, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initialValues.name || "",
      email: initialValues.email || "",
      role: initialValues.role || ROLES.COORDINATOR,
      status: initialValues.status || "Active"
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
      <Input
        label="Staff Full Name"
        required
        placeholder="e.g. Dr. Kyaw Thet"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        label="Staff Email Address"
        type="email"
        required
        placeholder="user@tmghealthcare.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select
          label="Assigned System Role"
          required
          options={[
            { value: ROLES.SUPER_ADMIN, label: "Super Admin" },
            { value: ROLES.ADMIN, label: "Admin" },
            { value: ROLES.COORDINATOR, label: "Coordinator" }
          ]}
          {...register("role")}
          error={errors.role?.message}
        />

        <Select
          label="Account Status"
          required
          options={[
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" }
          ]}
          {...register("status")}
          error={errors.status?.message}
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
        <Button variant="secondary" size="sm" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
          Save User Account
        </Button>
      </div>
    </form>
  );
}
