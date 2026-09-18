import React from "react";
import { Card } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import { MapPin, Phone, Mail, Clock, MessageSquare, AlertCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="teal" size="md">Direct Patient Support</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Contact TMG Patient Services</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Our bilingual coordinators are available at our regional liaison offices in Bangkok and Yangon to assist with hospital inquiries, report assessments, and travel logistics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bangkok Office */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg">Bangkok Liaison Desk (Thailand)</h3>
            <Badge variant="emerald" size="sm">Hospital Concierge</Badge>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Located near central Sukhumvit hospital corridor for direct patient check-ins and emergency hospital accompaniment.
          </p>

          <div className="space-y-3 text-xs text-slate-700 pt-2 border-t border-slate-100">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
              <span>Level 14, Interchange 21 Tower, Sukhumvit Rd, Khlong Toei Nuea, Watthana, Bangkok 10110</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-primary-700 shrink-0" />
              <span>+66 82 491 5821 / +66 2 066 8800</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-primary-700 shrink-0" />
              <span>bangkok.liaison@tmghealthcare.com</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-primary-700 shrink-0" />
              <span>Mon – Sat: 08:30 AM – 06:00 PM (ICT)</span>
            </div>
          </div>
        </Card>

        {/* Yangon Office */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg">Yangon Intake Center (Myanmar)</h3>
            <Badge variant="teal" size="sm">Intake &amp; Document Review</Badge>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            In-person patient consultation, medical disc duplication, document translation, and visa invitation handling.
          </p>

          <div className="space-y-3 text-xs text-slate-700 pt-2 border-t border-slate-100">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
              <span>No. 42, Sayar San Road, Bahan Township, Yangon, Myanmar</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-primary-700 shrink-0" />
              <span>+95 9 798 124 551 / +95 1 540 291</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-primary-700 shrink-0" />
              <span>Viber / Telegram: +95 9 798 124 551</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-primary-700 shrink-0" />
              <span>Mon – Sat: 09:00 AM – 05:30 PM (MMT)</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block">Emergency Medical Situations:</strong>
          <span>
            If the patient is suffering acute loss of consciousness, cardiac arrest, or uncontrollable hemorrhage in Thailand, call national emergency ambulance service <strong>1669</strong> immediately. TMG is a coordination agency and does not dispatch emergency paramedics.
          </span>
        </div>
      </div>
    </div>
  );
}
