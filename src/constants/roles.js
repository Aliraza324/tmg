export const ROLES = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  COORDINATOR: "Coordinator"
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: {
    canViewAllCases: true,
    canManageCoordinators: true,
    canViewAuditLogs: true,
    canManageSystemSettings: true,
    canViewAnalytics: true,
    canExportReports: true,
    canManageHospitals: true
  },
  [ROLES.ADMIN]: {
    canViewAllCases: true,
    canManageCoordinators: true,
    canViewAuditLogs: false,
    canManageSystemSettings: false,
    canViewAnalytics: true,
    canExportReports: true,
    canManageHospitals: true
  },
  [ROLES.COORDINATOR]: {
    canViewAllCases: false, // Filter to assigned cases or view-only
    canManageCoordinators: false,
    canViewAuditLogs: false,
    canManageSystemSettings: false,
    canViewAnalytics: false,
    canExportReports: false,
    canManageHospitals: false
  }
};
