import { ROLES } from "./roles";

export const PUBLIC_NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Healthcare", path: "/healthcare" },
  { label: "Hospitals", path: "/hospitals" },
  { label: "Specialties", path: "/specialties" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" }
];

export const DASHBOARD_NAV_ITEMS = [
  {
    category: "Operations",
    items: [
      { label: "Overview", path: "/dashboard", icon: "LayoutDashboard", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.COORDINATOR] },
      { label: "Cases", path: "/cases", icon: "FolderKanban", badgeKey: "activeCases", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.COORDINATOR] },
      { label: "Patients", path: "/patients", icon: "Users", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.COORDINATOR] },
      { label: "Appointments", path: "/appointments", icon: "Calendar", badgeKey: "upcomingAppointments", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.COORDINATOR] },
      { label: "Follow-ups", path: "/follow-ups", icon: "Clock", badgeKey: "dueFollowUps", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.COORDINATOR] },
      { label: "Documents", path: "/documents", icon: "FileText", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.COORDINATOR] }
    ]
  },
  {
    category: "Network Directory",
    items: [
      { label: "Hospitals", path: "/dashboard/hospitals", icon: "Building2", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN] },
      { label: "Specialties", path: "/dashboard/specialties", icon: "Stethoscope", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN] }
    ]
  },
  {
    category: "Management & Intelligence",
    items: [
      { label: "Coordinators", path: "/coordinators", icon: "UserCheck", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN] },
      { label: "Users & Roles", path: "/users", icon: "Shield", roles: [ROLES.SUPER_ADMIN] },
      { label: "Analytics", path: "/analytics", icon: "BarChart3", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN] },
      { label: "Reports", path: "/reports", icon: "FileSpreadsheet", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN] },
      { label: "Audit Logs", path: "/audit-logs", icon: "ShieldAlert", roles: [ROLES.SUPER_ADMIN] }
    ]
  },
  {
    category: "System",
    items: [
      { label: "Notifications", path: "/notifications", icon: "Bell", badgeKey: "unreadNotifications", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.COORDINATOR] },
      { label: "Settings", path: "/settings", icon: "Settings", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.COORDINATOR] }
    ]
  }
];
