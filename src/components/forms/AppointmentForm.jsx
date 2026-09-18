import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import { APPOINTMENT_STATUSES } from "../../constants/statuses";

const appointmentSchema = z.object({
  patientName: z.string().min(2, "Patient name is required"),
  caseCode: z.string().optional(),
  hospitalName: z.string().min(2, "Hospital name is required"),
  department: z.string().min(2, "Department/clinic is required"),
  doctorName: z.string().min(2, "Doctor name is required"),
  appointmentDate: z.string().min(4, "Date is required"),
  appointmentTime: z.string().min(2, "Time is required"),
  status: z.string().min(1, "Status is required"),
  locationDetail: z.string().optional(),
  interpreterAssigned: z.string().optional(),
  notes: z.string().optional()
});

export default function AppointmentForm({ initialValues = {}, onSubmit, onCancel, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientName: initialValues.patientName || "",
      caseCode: initialValues.caseCode || "",
      hospitalName: initialValues.hospitalName || "Bumrungrad International Hospital",
      department: initialValues.department || "Outpatient Specialist Clinic",
      doctorName: initialValues.doctorName || "",
      appointmentDate: initialValues.appointmentDate || new Date().toISOString().split("T")[0],
      appointmentTime: initialValues.appointmentTime || "10:00 AM",
      status: initialValues.status || "Confirmed",
      locationDetail: initialValues.locationDetail || "Bangkok Campus Counter",
      interpreterAssigned: initialValues.interpreterAssigned || "TMG Bilingual Liaison",
      notes: initialValues.notes || ""
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Patient Full Name"
          required
          placeholder="e.g. U Kyaw Min"
          {...register("patientName")}
          error={errors.patientName?.message}
        />

        <Input
          label="Associated Case ID (Optional)"
          placeholder="e.g. TMG-2026-000101"
          {...register("caseCode")}
        />

        <Input
          label="Attending Physician"
          required
          placeholder="e.g. Dr. Artit Jinawath"
          {...register("doctorName")}
          error={errors.doctorName?.message}
        />

        <Select
          label="Hospital Partner"
          required
          options={[
            { value: "Bumrungrad International Hospital", label: "Bumrungrad International" },
            { value: "Bangkok Hospital Headquarters (BDMS)", label: "Bangkok Hospital HQ" },
            { value: "MedPark Hospital", label: "MedPark Hospital" },
            { value: "Samitivej Sukhumvit Hospital", label: "Samitivej Sukhumvit" },
            { value: "Siriraj Piyamaharajkarun Hospital", label: "Siriraj Piyamaharajkarun" },
            { value: "Vejthani Hospital", label: "Vejthani Hospital" },
            { value: "Praram 9 Hospital", label: "Praram 9 Hospital" }
          ]}
          {...register("hospitalName")}
          error={errors.hospitalName?.message}
        />

        <Input
          label="Clinic / Department"
          required
          placeholder="e.g. Horizon Regional Cancer Center, 3rd Floor"
          {...register("department")}
          error={errors.department?.message}
        />

        <Select
          label="Status"
          required
          options={Object.values(APPOINTMENT_STATUSES).map((s) => ({ value: s, label: s }))}
          {...register("status")}
          error={errors.status?.message}
        />

        <Input
          label="Consultation Date"
          type="date"
          required
          {...register("appointmentDate")}
          error={errors.appointmentDate?.message}
        />

        <Input
          label="Appointment Time"
          required
          placeholder="e.g. 09:30 AM"
          {...register("appointmentTime")}
          error={errors.appointmentTime?.message}
        />

        <Input
          label="Counter / Room Location"
          placeholder="e.g. Building A, 3rd Floor, Counter 3B"
          {...register("locationDetail")}
        />

        <Input
          label="Assigned Medical Interpreter"
          placeholder="e.g. Daw Aye Myat (TMG Liaison)"
          {...register("interpreterAssigned")}
        />
      </div>

      <Textarea
        label="Clinical Briefing & Preparation Notes"
        rows={2}
        placeholder="Fasting instructions, documents to bring, airport arrival notes..."
        {...register("notes")}
      />

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
        <Button variant="secondary" size="sm" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
          Save Appointment
        </Button>
      </div>
    </form>
  );
}
