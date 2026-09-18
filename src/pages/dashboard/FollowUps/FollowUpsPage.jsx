import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { followUpService } from "../../../services/followUpService";
import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import Tabs from "../../../components/ui/Tabs";
import Modal from "../../../components/ui/Modal";
import FollowUpForm from "../../../components/forms/FollowUpForm";
import { formatDate } from "../../../utils/formatters";
import { Clock, CheckCircle2, AlertCircle, Phone, ArrowUpRight, Plus, Edit, Trash2 } from "lucide-react";

export default function FollowUpsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [followUps, setFollowUps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingFollowUp, setEditingFollowUp] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadFollowUps = () => {
    setIsLoading(true);
    followUpService.getFollowUps().then((data) => {
      setFollowUps(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadFollowUps();
  }, []);

  const handleCreateSubmit = async (formData) => {
    setIsSaving(true);
    await followUpService.createFollowUp(formData);
    setIsSaving(false);
    setCreateModalOpen(false);
    loadFollowUps();
  };

  const handleEditSubmit = async (formData) => {
    setIsSaving(true);
    await followUpService.updateFollowUp(editingFollowUp.id, formData);
    setIsSaving(false);
    setEditingFollowUp(null);
    loadFollowUps();
  };

  const handleMarkComplete = async (id) => {
    await followUpService.completeFollowUp(id, "Marked complete by coordinator");
    loadFollowUps();
  };

  const filtered =
    activeTab === "all"
      ? followUps
      : followUps.filter((f) => f.category.toLowerCase() === activeTab.toLowerCase());

  const tabs = [
    { id: "all", label: "All Tasks", count: followUps.length },
    { id: "today", label: "Due Today", count: followUps.filter((f) => f.category === "Today").length },
    { id: "overdue", label: "Overdue", count: followUps.filter((f) => f.category === "Overdue").length },
    { id: "upcoming", label: "Upcoming", count: followUps.filter((f) => f.category === "Upcoming").length },
    { id: "completed", label: "Completed", count: followUps.filter((f) => f.category === "Completed").length }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Follow-up &amp; Continuity Care"
        subtitle="Post-consultation check-ins, medication refills, and remote Myanmar surveillance"
        breadcrumbs={[{ label: "Follow-ups" }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setCreateModalOpen(true)}>
            Create Follow-Up Task
          </Button>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {isLoading ? (
        <div className="p-8 text-center text-xs text-slate-500">Loading follow-up tasks...</div>
      ) : filtered.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
          No follow-up tasks in this category.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <Card key={item.id} className="p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.patientName}</span>
                    <span className="font-mono text-xs text-primary-700 font-semibold">{item.caseCode}</span>
                    <Badge
                      variant={
                        item.category === "Overdue"
                          ? "rose"
                          : item.category === "Today"
                          ? "amber"
                          : item.category === "Completed"
                          ? "emerald"
                          : "teal"
                      }
                      size="sm"
                    >
                      {item.category}
                    </Badge>
                  </div>
                  <h5 className="font-semibold text-slate-800 text-xs mt-1">{item.purpose}</h5>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Coordinator: {item.coordinatorName} • Scheduled: {formatDate(item.scheduledDate)}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="ghost" size="sm" icon={Edit} onClick={() => setEditingFollowUp(item)}>
                    Edit
                  </Button>
                  {item.status !== "Completed" ? (
                    <Button
                      variant="outlineTeal"
                      size="sm"
                      icon={CheckCircle2}
                      onClick={() => handleMarkComplete(item.id)}
                    >
                      Mark Done
                    </Button>
                  ) : (
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Completed
                    </span>
                  )}
                  {item.caseId && (
                    <Link to={`/cases/${item.caseId}`}>
                      <Button variant="secondary" size="sm" icon={ArrowUpRight}>
                        Case
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                <div>
                  <span className="text-slate-500 font-medium block">Outcome &amp; Patient Notes:</span>
                  <p className="text-slate-800 mt-0.5">{item.outcome || "Pending conversation"}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Next Clinical Action:</span>
                  <p className="text-primary-800 font-medium mt-0.5">{item.nextAction}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Follow-Up Modal */}
      <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Create Patient Follow-Up Task" maxWidth="max-w-2xl">
        <FollowUpForm
          onSubmit={handleCreateSubmit}
          onCancel={() => setCreateModalOpen(false)}
          isSubmitting={isSaving}
        />
      </Modal>

      {/* Edit Follow-Up Modal */}
      <Modal isOpen={Boolean(editingFollowUp)} onClose={() => setEditingFollowUp(null)} title="Edit Follow-Up Details" maxWidth="max-w-2xl">
        {editingFollowUp && (
          <FollowUpForm
            initialValues={editingFollowUp}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingFollowUp(null)}
            isSubmitting={isSaving}
          />
        )}
      </Modal>
    </div>
  );
}
