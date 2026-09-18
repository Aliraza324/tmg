import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { markAsRead, markAllAsRead } from "../../../features/notifications/notificationSlice";
import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import { formatDateTime } from "../../../utils/formatters";
import { Bell, CheckCheck, FolderKanban, Calendar, Clock, FileText, ArrowRight } from "lucide-react";

export default function NotificationsPage() {
  const notifications = useSelector((state) => state.notifications.notifications);
  const dispatch = useDispatch();

  const iconMap = {
    Case: FolderKanban,
    Appointment: Calendar,
    "Follow-up": Clock,
    Document: FileText
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Notifications &amp; Alerts Center"
        subtitle="Real-time case assignments, doctor appointment confirmations, and follow-up deadlines"
        breadcrumbs={[{ label: "Notifications" }]}
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon={CheckCheck}
            onClick={() => dispatch(markAllAsRead())}
          >
            Mark All Read
          </Button>
        }
      />

      <div className="space-y-3">
        {notifications.map((item) => {
          const Icon = iconMap[item.category] || Bell;
          return (
            <Card
              key={item.id}
              className={`p-4 transition flex items-start justify-between gap-4 ${
                !item.read ? "bg-teal-50/20 border-primary-300" : "bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    !item.read
                      ? "bg-primary-100 text-primary-800"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-semibold text-slate-900 text-xs">{item.title}</h5>
                    {!item.read && <span className="w-2 h-2 rounded-full bg-teal-600" />}
                    <Badge variant="slate" size="sm">{item.category}</Badge>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.message}</p>
                  <span className="text-[10px] text-slate-400 block pt-0.5">
                    {formatDateTime(item.timestamp)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!item.read && (
                  <button
                    onClick={() => dispatch(markAsRead(item.id))}
                    className="text-xs text-primary-700 hover:underline font-medium"
                  >
                    Mark read
                  </button>
                )}
                {item.link && (
                  <Link to={item.link}>
                    <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
                      View
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
