import React from "react";
import Select from "../../../components/ui/Select";
import Textarea from "../../../components/ui/Textarea";

export default function StepRequirement({ register, errors }) {
  const specialtyOptions = [
    { value: "Oncology", label: "Medical & Surgical Oncology (Cancer Care)" },
    { value: "Cardiology", label: "Cardiology & Cardiac Surgery (Heart Care)" },
    { value: "Orthopedics", label: "Orthopedics & Spine Surgery" },
    { value: "Neurology", label: "Neurology & Neurosurgery (Brain Care)" },
    { value: "Gastroenterology", label: "Gastroenterology & Liver Disease" },
    { value: "Organ Transplant", label: "Organ Transplant (Kidney / Liver)" },
    { value: "Health Screening", label: "Executive Health Screening & Wellness" },
    { value: "Other", label: "Other / General Medical Consultation" }
  ];

  const serviceOptions = [
    { value: "Doctor Second Opinion", label: "Doctor Second Opinion on Existing Diagnosis" },
    { value: "Surgery / Treatment Plan", label: "Hospital Surgical Treatment & Cost Estimation" },
    { value: "Executive Checkup", label: "Comprehensive Diagnostic Checkup Booking" },
    { value: "Urgent Medical Referral", label: "Fast-Track Hospital Admission / Referral" }
  ];

  const urgencyOptions = [
    { value: "Immediate", label: "Urgent (Within 48 hours / acute condition)" },
    { value: "High", label: "High Priority (Within 1 week)" },
    { value: "Normal", label: "Normal (Within 2-3 weeks / forward planning)" },
    { value: "Routine", label: "Routine / Flexible schedule" }
  ];

  const hospitalOptions = [
    { value: "No Preference", label: "No Preference (Recommend Most Suitable Hospital)" },
    { value: "Bumrungrad International Hospital", label: "Bumrungrad International Hospital" },
    { value: "Bangkok Hospital HQ (BDMS)", label: "Bangkok Hospital Headquarters" },
    { value: "MedPark Hospital", label: "MedPark Hospital" },
    { value: "Samitivej Sukhumvit Hospital", label: "Samitivej Sukhumvit Hospital" },
    { value: "Siriraj Piyamaharajkarun Hospital", label: "Siriraj Piyamaharajkarun Hospital" },
    { value: "Vejthani Hospital", label: "Vejthani Hospital" },
    { value: "Praram 9 Hospital", label: "Praram 9 Hospital" }
  ];

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900">Step 2: Healthcare Requirements</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Tell us about your medical needs so we can identify the appropriate specialist team in Bangkok.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Medical Specialty Required"
          required
          options={specialtyOptions}
          {...register("specialty")}
          error={errors.specialty?.message}
        />

        <Select
          label="Primary Service Needed"
          required
          options={serviceOptions}
          {...register("serviceRequired")}
          error={errors.serviceRequired?.message}
        />

        <Select
          label="Preferred Hospital (Optional)"
          options={hospitalOptions}
          {...register("preferredHospital")}
          error={errors.preferredHospital?.message}
        />

        <Select
          label="Estimated Urgency"
          required
          options={urgencyOptions}
          {...register("urgency")}
          error={errors.urgency?.message}
        />

        <div className="sm:col-span-2">
          <Textarea
            label="Current Symptoms & Medical Summary"
            required
            rows={4}
            placeholder="Briefly describe the patient's existing diagnosis, symptoms, previous treatments received in Myanmar, and what you hope to achieve in Thailand..."
            {...register("additionalInfo")}
            error={errors.additionalInfo?.message}
          />
        </div>
      </div>
    </div>
  );
}
