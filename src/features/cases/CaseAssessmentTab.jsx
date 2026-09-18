import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import Select from "../../components/ui/Select";
import { Stethoscope, CheckCircle2, AlertTriangle, Send } from "lucide-react";

export default function CaseAssessmentTab({ caseData }) {
  const [assessmentNote, setAssessmentNote] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState(caseData.priority);
  const [savedNotes, setSavedNotes] = useState([
    {
      id: "note-1",
      author: caseData.coordinatorName || "Coordinator",
      timestamp: "2026-09-12 11:30 AM",
      content:
        "Pathology slides from Yangon General Hospital reviewed. Squamous cell vs adenocarcinoma markers confirmed TTF-1 positive. Recommending medical oncology multidisciplinary tumor board review at Bumrungrad or Wattanosoth BDMS."
    }
  ]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!assessmentNote.trim()) return;
    setSavedNotes([
      {
        id: `note-${Date.now()}`,
        author: caseData.coordinatorName || "Current Staff",
        timestamp: new Date().toLocaleString(),
        content: assessmentNote
      },
      ...savedNotes
    ]);
    setAssessmentNote("");
  };

  return (
    <div className="space-y-6">
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-primary-700" />
            <h4 className="font-semibold text-slate-900 text-sm">Clinical Intake &amp; Triage Assessment</h4>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-teal-50 text-teal-800 font-semibold">
            Specialty: {caseData.specialty}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
          {caseData.clinicalSummary}
        </p>
      </Card>

      {/* Coordinator Clinical Assessment Log */}
      <Card className="p-5 space-y-4">
        <h4 className="font-semibold text-slate-900 text-sm">Coordinator Clinical Review Notes</h4>

        <form onSubmit={handleAddNote} className="space-y-3">
          <Textarea
            placeholder="Add clinical observations, physician questions, or translation notes..."
            rows={3}
            value={assessmentNote}
            onChange={(e) => setAssessmentNote(e.target.value)}
          />
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="sm" icon={Send} iconPosition="left">
              Log Clinical Note
            </Button>
          </div>
        </form>

        <div className="space-y-3 pt-3 border-t border-slate-100">
          {savedNotes.map((n) => (
            <div key={n.id} className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-500">
                <span className="font-semibold text-slate-800">{n.author}</span>
                <span>{n.timestamp}</span>
              </div>
              <p className="text-slate-700 leading-relaxed">{n.content}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
