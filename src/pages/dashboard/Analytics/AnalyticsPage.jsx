import React from "react";
import PageHeader from "../../../components/common/PageHeader";
import { Card, CardHeader, CardContent } from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid
} from "recharts";

export default function AnalyticsPage() {
  const monthlyInquiries = [
    { month: "May", inquiries: 24, appointments: 18 },
    { month: "Jun", inquiries: 32, appointments: 25 },
    { month: "Jul", inquiries: 45, appointments: 34 },
    { month: "Aug", inquiries: 58, appointments: 42 },
    { month: "Sep (MTD)", inquiries: 64, appointments: 49 }
  ];

  const specialtyDistribution = [
    { name: "Oncology", cases: 28, fill: "#12646a" },
    { name: "Cardiology", cases: 22, fill: "#17828a" },
    { name: "Orthopedics", cases: 19, fill: "#4baeb5" },
    { name: "Neurology", cases: 12, fill: "#87ccd0" },
    { name: "Organ Transplant", cases: 9, fill: "#0e4f54" },
    { name: "Gastroenterology", cases: 14, fill: "#0b3b3e" }
  ];

  const hospitalShares = [
    { name: "Bumrungrad", value: 34, color: "#12646a" },
    { name: "Bangkok Hospital HQ", value: 26, color: "#1e9da6" },
    { name: "MedPark", value: 18, color: "#4baeb5" },
    { name: "Vejthani", value: 12, color: "#64748b" },
    { name: "Others", value: 10, color: "#cbd5e1" }
  ];

  const coordinatorThroughput = [
    { name: "Thura A.", active: 14, completed: 132 },
    { name: "Su Myat N.", active: 11, completed: 98 },
    { name: "Htet Lin O.", active: 9, completed: 76 },
    { name: "May Zun P.", active: 8, completed: 64 }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operational Analytics &amp; Clinical Insights"
        subtitle="Patient acquisition trends, hospital throughput, specialty distribution, and team load"
        breadcrumbs={[{ label: "Analytics" }]}
      />

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <span className="text-xs text-slate-500 font-semibold">Total Inquiries (2026)</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">223</div>
          <span className="text-[11px] text-emerald-600 font-medium">↑ 18% vs last quarter</span>
        </Card>
        <Card className="p-4">
          <span className="text-xs text-slate-500 font-semibold">Consultation Rate</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">76.4%</div>
          <span className="text-[11px] text-slate-500">Inquiry to clinic booking</span>
        </Card>
        <Card className="p-4">
          <span className="text-xs text-slate-500 font-semibold">Avg. Booking Lead Time</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">1.8 Days</div>
          <span className="text-[11px] text-teal-600">From intake to hospital slot</span>
        </Card>
        <Card className="p-4">
          <span className="text-xs text-slate-500 font-semibold">Patient Retention Score</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">98.2%</div>
          <span className="text-[11px] text-emerald-600 font-medium">Post-care follow-up adherence</span>
        </Card>
      </div>

      {/* 2-Column Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Inquiry &amp; Appointment Volume Growth" subtitle="Monthly throughput trajectory" />
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyInquiries}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Area type="monotone" dataKey="inquiries" stroke="#12646a" fill="#12646a" fillOpacity={0.15} />
                <Area type="monotone" dataKey="appointments" stroke="#10b981" fill="#10b981" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Specialty Demand Distribution" subtitle="Volume of inquiries by medical field" />
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={specialtyDistribution} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="cases" fill="#12646a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Hospital Partner Referral Share" subtitle="Patient placement across accredited centers" />
          <CardContent className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={hospitalShares} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {hospitalShares.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Coordinator Team Throughput" subtitle="Active vs completed case breakdown" />
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coordinatorThroughput}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="active" fill="#12646a" name="Active Cases" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="#10b981" name="Completed Cases" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
