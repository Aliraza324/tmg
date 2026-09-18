import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function StepConsent({ register, errors }) {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900">Step 4: Informed Consent &amp; Privacy Authorization</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Please review and accept our medical coordination facilitation terms before submission.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-3 leading-relaxed">
        <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
          <ShieldCheck className="w-4 h-4 text-primary-700" />
          <span>Patient Advocacy &amp; Coordination Agreement</span>
        </div>
        <p>
          I confirm that TMG Healthcare is engaged solely for cross-border medical coordination, document translation, and hospital liaison. I acknowledge that TMG does not practice medicine, prescribe drugs, or guarantee clinical outcomes. All clinical diagnostics, surgeries, and fees are determined directly by Thai hospitals.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 rounded border-slate-300 text-primary-700 focus:ring-primary-500"
            {...register("consentCoordination")}
          />
          <span className="text-xs text-slate-700 leading-snug">
            I authorize TMG Healthcare coordinators to share my medical summaries with accredited partner hospital departments in Bangkok to request clinical opinions and cost estimations.
            {errors.consentCoordination && (
              <span className="block text-rose-600 font-medium mt-0.5">
                {errors.consentCoordination.message}
              </span>
            )}
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 rounded border-slate-300 text-primary-700 focus:ring-primary-500"
            {...register("consentPrivacy")}
          />
          <span className="text-xs text-slate-700 leading-snug">
            I have read and agree to the{" "}
            <Link to="/privacy" target="_blank" className="text-primary-700 underline font-semibold">
              TMG Patient Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/consent" target="_blank" className="text-primary-700 underline font-semibold">
              Informed Consent Agreement
            </Link>
            .
            {errors.consentPrivacy && (
              <span className="block text-rose-600 font-medium mt-0.5">
                {errors.consentPrivacy.message}
              </span>
            )}
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 rounded border-slate-300 text-primary-700 focus:ring-primary-500"
            {...register("consentMessaging")}
          />
          <span className="text-xs text-slate-700 leading-snug">
            I consent to receiving follow-up coordination messages via Viber, WhatsApp, Phone call, or Email.
          </span>
        </label>
      </div>
    </div>
  );
}
