import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import Avatar from "../../components/ui/Avatar";
import { Send, MessageSquare } from "lucide-react";

export default function CaseNotesTab({ caseData }) {
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState([
    {
      id: "n-1",
      author: caseData.coordinatorName || "Thura Aung",
      role: "Lead Medical Coordinator",
      time: "2026-09-14 02:40 PM",
      text: "Conferred with Bumrungrad Horizon Center liaison. Doctor Artit confirmed availability for Tuesday morning slot. Family requests Myanmar wheelchair assistance upon arrival."
    },
    {
      id: "n-2",
      author: "Daw Khin Myat",
      role: "Operations Lead",
      time: "2026-09-10 11:15 AM",
      text: "Medical referral letter received from Yangon partner. Initial deposit requirements forwarded to patient son."
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    setNotes([
      {
        id: `n-${Date.now()}`,
        author: "Current Staff",
        role: "Coordinator",
        time: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
        text: noteContent
      },
      ...notes
    ]);
    setNoteContent("");
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h4 className="font-semibold text-slate-900 text-sm">Internal Staff &amp; Coordinator Collaboration Notes</h4>
        <p className="text-xs text-slate-500 mt-0.5">Private coordinator discussion thread not visible to patients.</p>
      </div>

      <Card className="p-4 space-y-3">
        <form onSubmit={handleSend} className="space-y-3">
          <Textarea
            rows={2}
            placeholder="Type internal coordination update or handover note..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="sm" icon={Send} iconPosition="left">
              Post Note
            </Button>
          </div>
        </form>
      </Card>

      <div className="space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs flex items-start gap-3 text-xs">
            <Avatar name={note.author} size="sm" />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900">{note.author}</span>
                  <span className="text-slate-400 text-[11px] ml-1.5">• {note.role}</span>
                </div>
                <span className="text-[11px] text-slate-400">{note.time}</span>
              </div>
              <p className="text-slate-700 leading-relaxed pt-0.5">{note.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
