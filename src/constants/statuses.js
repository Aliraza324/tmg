export const CASE_STATUSES = {
  NEW: "New",
  ASSESSMENT: "Assessment",
  HOSPITAL_MATCHING: "Hospital Matching",
  APPOINTMENT: "Appointment",
  FOLLOW_UP: "Follow-up",
  COMPLETED: "Completed",
  ON_HOLD: "On Hold",
  CANCELLED: "Cancelled"
};

export const CASE_PRIORITIES = {
  URGENT: "Urgent",
  HIGH: "High",
  NORMAL: "Normal",
  LOW: "Low"
};

export const APPOINTMENT_STATUSES = {
  REQUESTED: "Requested",
  PENDING_CONFIRMATION: "Pending Confirmation",
  CONFIRMED: "Confirmed",
  RESCHEDULED: "Rescheduled",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  NO_SHOW: "No-show"
};

export const STATUS_CONFIG = {
  [CASE_STATUSES.NEW]: {
    label: "New",
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    dot: "bg-sky-500"
  },
  [CASE_STATUSES.ASSESSMENT]: {
    label: "Assessment",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    dot: "bg-indigo-500"
  },
  [CASE_STATUSES.HOSPITAL_MATCHING]: {
    label: "Hospital Matching",
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-200",
    dot: "bg-teal-600"
  },
  [CASE_STATUSES.APPOINTMENT]: {
    label: "Appointment",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500"
  },
  [CASE_STATUSES.FOLLOW_UP]: {
    label: "Follow-up",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    dot: "bg-purple-500"
  },
  [CASE_STATUSES.COMPLETED]: {
    label: "Completed",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-600"
  },
  [CASE_STATUSES.ON_HOLD]: {
    label: "On Hold",
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    dot: "bg-slate-400"
  },
  [CASE_STATUSES.CANCELLED]: {
    label: "Cancelled",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    dot: "bg-rose-500"
  }
};

export const PRIORITY_CONFIG = {
  [CASE_PRIORITIES.URGENT]: {
    label: "Urgent",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    icon: "AlertCircle"
  },
  [CASE_PRIORITIES.HIGH]: {
    label: "High",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: "Clock"
  },
  [CASE_PRIORITIES.NORMAL]: {
    label: "Normal",
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-200",
    icon: "Activity"
  },
  [CASE_PRIORITIES.LOW]: {
    label: "Low",
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-200",
    icon: "CheckCircle"
  }
};
