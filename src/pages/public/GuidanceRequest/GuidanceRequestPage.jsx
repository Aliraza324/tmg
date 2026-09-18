import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { caseService } from "../../../services/caseService";
import { patientService } from "../../../services/patientService";
import { Card } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import StepPatientInfo from "./StepPatientInfo";
import StepRequirement from "./StepRequirement";
import StepDocuments from "./StepDocuments";
import StepConsent from "./StepConsent";
import StepSuccess from "./StepSuccess";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";

// Form validation schema using Zod
const guidanceSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  gender: z.string().min(1, "Please select gender"),
  dateOfBirth: z.string().min(4, "Date of birth is required"),
  city: z.string().min(2, "City / Township is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().min(6, "Valid phone number is required"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  preferredLanguage: z.string().min(1, "Please select preferred language"),
  specialty: z.string().min(1, "Please select medical specialty"),
  serviceRequired: z.string().min(1, "Please select service required"),
  preferredHospital: z.string().optional(),
  urgency: z.string().min(1, "Please indicate urgency"),
  additionalInfo: z.string().min(10, "Please provide brief medical background details (at least 10 characters)"),
  consentCoordination: z.boolean().refine((val) => val === true, "Coordination consent is required"),
  consentPrivacy: z.boolean().refine((val) => val === true, "Privacy acceptance is required"),
  consentMessaging: z.boolean().optional()
});

const STEPS = [
  { id: 1, label: "Patient Info" },
  { id: 2, label: "Requirement" },
  { id: 3, label: "Documents" },
  { id: 4, label: "Consent" },
  { id: 5, label: "Confirmation" }
];

export default function GuidanceRequestPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCase, setSubmittedCase] = useState(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(guidanceSchema),
    mode: "onBlur",
    defaultValues: {
      country: "Myanmar",
      preferredLanguage: "Burmese",
      preferredHospital: "No Preference",
      urgency: "Normal",
      consentCoordination: true,
      consentPrivacy: true,
      consentMessaging: true
    }
  });

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger([
        "fullName",
        "gender",
        "dateOfBirth",
        "city",
        "country",
        "phone",
        "email",
        "preferredLanguage"
      ]);
    } else if (currentStep === 2) {
      isValid = await trigger([
        "specialty",
        "serviceRequired",
        "preferredHospital",
        "urgency",
        "additionalInfo"
      ]);
    } else if (currentStep === 3) {
      isValid = true; // Document upload is optional at intake
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const patient = await patientService.createPatient({
        fullName: data.fullName,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        city: data.city,
        country: data.country,
        phone: data.phone,
        email: data.email,
        preferredLanguage: data.preferredLanguage,
        primaryDiagnosis: `${data.specialty}: ${data.additionalInfo.slice(0, 50)}...`
      });

      const newCase = await caseService.createCase({
        patientId: patient.id,
        patientName: data.fullName,
        gender: data.gender,
        specialty: data.specialty,
        preferredHospital: data.preferredHospital,
        urgency: data.urgency,
        preferredLanguage: data.preferredLanguage,
        referralSource: "Web Guidance Request",
        clinicalSummary: data.additionalInfo
      });

      setSubmittedCase(newCase);
      setCurrentStep(5);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Wizard Header */}
      <div className="text-center space-y-2">
        <Badge variant="teal" size="md">Free Clinical Navigation</Badge>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Request Medical Guidance &amp; Hospital Matching
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Confidential cross-border clinical assessment connecting you with trusted specialists in Bangkok.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      {currentStep < 5 && (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            {STEPS.slice(0, 4).map((step, idx) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              return (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCompleted
                          ? "bg-emerald-600 text-white"
                          : isCurrent
                          ? "bg-primary-700 text-white ring-4 ring-primary-100"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                    </div>
                    <span
                      className={`hidden sm:inline text-xs font-semibold ${
                        isCurrent ? "text-primary-900" : "text-slate-500"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div
                      className={`flex-1 h-0.5 mx-3 ${
                        isCompleted ? "bg-emerald-500" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Wizard Form Container */}
      <Card className="p-6 sm:p-8 shadow-sm">
        {currentStep === 5 ? (
          <StepSuccess
            referenceCode={submittedCase?.caseCode}
            patientName={submittedCase?.patientName}
            coordinatorName={submittedCase?.coordinatorName}
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 1 && <StepPatientInfo register={register} errors={errors} />}
            {currentStep === 2 && <StepRequirement register={register} errors={errors} />}
            {currentStep === 3 && (
              <StepDocuments
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
              />
            )}
            {currentStep === 4 && <StepConsent register={register} errors={errors} />}

            {/* Step Controls Footer */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={prevStep}
                  disabled={isSubmitting}
                  icon={ArrowLeft}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={nextStep}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  icon={ShieldCheck}
                  iconPosition="left"
                >
                  Submit Guidance Request
                </Button>
              )}
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
