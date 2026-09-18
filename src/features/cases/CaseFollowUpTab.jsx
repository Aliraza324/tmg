import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { formatDate } from "../../utils/formatters";
import { Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react";

export default function CaseFollowUpTab({ caseData }) {
  const [followUps, setFollowUps] = useState([
    {
      id: "flw-1",
      scheduledDate: "2026-09-18",
      category: "Today",
      coordinatorName: caseData.coordinatorName || "Thura Aung",
      purpose: "Check travel documents and confirm Bangkok airport wheelchair transfer",
      outcome: "Waiting on confirmation call with patient daughter",
      nextAction: "Send driver contact to patient WhatsApp",
      status: "Pending"
    },
    {
      id: "flw-2",
      scheduledDate: "2026-09-24",
      category: "Upcoming",
      coordinatorName: caseData.coordinatorName || "Thura Aung",
      purpose: "Post-consultation debriefing and translation of treatment plan",
      outcome: "Scheduled post clinic visit",
      nextAction: "Deliver Burmese translated summary to family",
      status: "Upcoming"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">Post-Care &amp; Travel Follow-Up Tasks</h4>
          <p className="text-xs text-slate-500 mt-0.5">Tracking continuity of care and proactive patient outreach.</p>
        </div>
      </div>

      <div className="space-y-4">
        {followUps.map((item) => (
          <Card key={item.id} className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{item.purpose}</span>
                  <Badge
                    variant={
                      item.category === "Overdue"
                        ? "rose"
                        : item.category === "Today"
                        ? "amber"
                        : "teal"
                    }
                    size="sm"
                  >
                    {item.category}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Scheduled for {formatDate(item.scheduledDate)} • Coordinator: {item.coordinatorName}
                </p>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                {item.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              <div>
                <span className="text-slate-500 font-medium block">Current Observation / Outcome:</span>
                <p className="text-slate-800 mt-0.5">{item.outcome || "Pending outcome"}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Next Coordination Action:</span>
                <p className="text-primary-800 font-medium mt-0.5">{item.nextAction}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
