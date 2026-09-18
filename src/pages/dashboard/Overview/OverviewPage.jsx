import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  Stethoscope,
  Building2,
  Users
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Card, CardHeader, CardContent } from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import { CaseStatusBadge, CasePriorityBadge } from "../../../components/common/StatusBadge";
import Button from "../../../components/ui/Button";
import { caseService } from "../../../services/caseService";
import { appointmentService } from "../../../services/appointmentService";
import { MOCK_FOLLOW_UPS } from "../../../data/followUps";
import { formatDate } from "../../../utils/formatters";

export default function OverviewPage() {
  const [cases, setCases] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([caseService.getCases(), appointmentService.getAppointments()]).then(
      ([cData, aData]) => {
        setCases(cData);
        setAppointments(aData);
        setIsLoading(false);
      }
    );
  }, []);

  const totalCases = cases.length;
  const newCases = cases.filter((c) => c.status === "New").length;
  const activeCases = cases.filter((c) => !["Completed", "Cancelled"].includes(c.status)).length;
  const completedCases = cases.filter((c) => c.status === "Completed").length;
  const upcomingAppointments = appointments.filter((a) => a.status === "Confirmed").length;
  const followUpsDue = MOCK_FOLLOW_UPS.filter((f) => f.category === "Overdue" || f.category === "Today").length;

  const statusChartData = [
    { name: "New", count: cases.filter((c) => c.status === "New").length, color: "#0284c7" },
    { name: "Assessment", count: cases.filter((c) => c.status === "Assessment").length, color: "#6366f1" },
    { name: "Matching", count: cases.filter((c) => c.status === "Hospital Matching").length, color: "#0d9488" },
    { name: "Appointment", count: cases.filter((c) => c.status === "Appointment").length, color: "#f59e0b" },
    { name: "Follow-up", count: cases.filter((c) => c.status === "Follow-up").length, color: "#8b5cf6" },
    { name: "Completed", count: completedCases, color: "#10b981" }
  ];

  const specialtyChartData = [
    { name: "Oncology", count: 3 },
    { name: "Cardiology", count: 2 },
    { name: "Orthopedics", count: 2 },
    { name: "Neurology", count: 1 },
    { name: "Transplant", count: 1 }
  ];

  const referralData = [
    { name: "Web Intake", value: 4, color: "#12646a" },
    { name: "Viber / Chat", value: 2, color: "#14b8a6" },
    { name: "Doctor Referral", value: 2, color: "#64748b" }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clinical Operations Overview"
        subtitle="Operational metrics, patient workflow throughput, and urgent tasks"
        actions={
          <Link to="/cases">
            <Button variant="primary" size="md" icon={FolderKanban}>
              View All Cases
            </Button>
          </Link>
        }
      />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="p-4 border-l-4 border-l-sky-500">
          <span className="text-[11px] font-semibold text-slate-500 block">Total Cases</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{totalCases}</div>
          <span className="text-[10px] text-sky-600 font-medium mt-0.5 block">Seeded inquiries</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-primary-600">
          <span className="text-[11px] font-semibold text-slate-500 block">New Inquiries</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{newCases}</div>
          <span className="text-[10px] text-teal-600 font-medium mt-0.5 block">Requires intake</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-indigo-500">
          <span className="text-[11px] font-semibold text-slate-500 block">Active Cases</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{activeCases}</div>
          <span className="text-[10px] text-indigo-600 font-medium mt-0.5 block">In workflow</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-500">
          <span className="text-[11px] font-semibold text-slate-500 block">Appointments</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{upcomingAppointments}</div>
          <span className="text-[10px] text-amber-600 font-medium mt-0.5 block">Confirmed visits</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-rose-500">
          <span className="text-[11px] font-semibold text-slate-500 block">Follow-ups Due</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{followUpsDue}</div>
          <span className="text-[10px] text-rose-600 font-medium mt-0.5 block">Immediate action</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-emerald-500">
          <span className="text-[11px] font-semibold text-slate-500 block">Completed</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{completedCases}</div>
          <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block">Resolved safely</span>
        </Card>
      </div>

      {/* Operational Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader title="Cases by Lifecycle Status" subtitle="Distribution across current care stages" />
          <CardContent className="h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="count" fill="#12646a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Referral Source Channels" subtitle="Origin of patient inquiries" />
          <CardContent className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={referralData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {referralData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Operational Tables: Recent Inquiries & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <Card>
          <CardHeader
            title="Recent Cases"
            subtitle="Latest patient inquiries requiring coordination"
            action={<Link to="/cases" className="text-xs font-semibold text-primary-700 hover:underline">View All</Link>}
          />
          <div className="divide-y divide-slate-100 overflow-x-auto">
            {cases.slice(0, 4).map((c) => (
              <div key={c.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 transition text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{c.caseCode}</span>
                    <CasePriorityBadge priority={c.priority} />
                  </div>
                  <p className="font-medium text-slate-800 mt-0.5">{c.patientName} • {c.specialty}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CaseStatusBadge status={c.status} />
                  <Link to={`/cases/${c.id}`} className="text-primary-700 hover:text-primary-900 p-1">
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Hospital Appointments */}
        <Card>
          <CardHeader
            title="Upcoming Hospital Appointments"
            subtitle="Scheduled Bangkok consultations"
            action={<Link to="/appointments" className="text-xs font-semibold text-primary-700 hover:underline">View Calendar</Link>}
          />
          <div className="divide-y divide-slate-100 overflow-x-auto">
            {appointments.slice(0, 4).map((apt) => (
              <div key={apt.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 transition text-xs">
                <div>
                  <p className="font-semibold text-slate-900">{apt.patientName}</p>
                  <p className="text-[11px] text-slate-500">{apt.hospitalName} • {apt.doctorName}</p>
                </div>
                <div className="text-right">
                  <span className="font-medium text-slate-800 block">{formatDate(apt.appointmentDate)}</span>
                  <span className="text-[10px] text-teal-700 font-semibold">{apt.appointmentTime}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
