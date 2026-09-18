export const MOCK_AUDIT_LOGS = [
  {
    id: "log-001",
    timestamp: "2026-09-17T14:20:00Z",
    userName: "Thura Aung",
    userRole: "Senior Medical Coordinator",
    action: "STATUS_UPDATED",
    resourceType: "Case",
    resourceId: "TMG-2026-000101",
    description: "Status changed from 'Hospital Matching' to 'Appointment' after Bumrungrad clinic confirmation.",
    ipAddress: "171.96.184.22 (Bangkok)"
  },
  {
    id: "log-002",
    timestamp: "2026-09-17T07:15:00Z",
    userName: "System (Public Intake)",
    userRole: "System Bot",
    action: "CASE_CREATED",
    resourceType: "Case",
    resourceId: "TMG-2026-000107",
    description: "New guidance request submitted online by patient Ko Sai Lon. Assigned default priority 'Urgent'.",
    ipAddress: "103.119.62.14 (Yangon)"
  },
  {
    id: "log-003",
    timestamp: "2026-09-16T15:30:00Z",
    userName: "Su Myat Noe",
    userRole: "Patient Liaison",
    action: "APPOINTMENT_SCHEDULED",
    resourceType: "Appointment",
    resourceId: "apt-02",
    description: "Appointment created for Ko Aung Zaw at Vejthani Spine Center with Dr. Chaiwat Piyaskulkaew.",
    ipAddress: "171.96.184.22 (Bangkok)"
  },
  {
    id: "log-004",
    timestamp: "2026-09-15T15:20:00Z",
    userName: "Ko Aung Zaw",
    userRole: "Patient",
    action: "DOCUMENT_UPLOADED",
    resourceType: "Document",
    resourceId: "doc-04",
    description: "Uploaded diagnostic file 'AungZaw_LSpine_MRI_Scan.jpg' (2.4 MB).",
    ipAddress: "103.119.60.10 (Taunggyi)"
  },
  {
    id: "log-005",
    timestamp: "2026-09-12T10:00:00Z",
    userName: "Admin Daw Khin",
    userRole: "Admin",
    action: "COORDINATOR_ASSIGNED",
    resourceType: "Case",
    resourceId: "TMG-2026-000104",
    description: "Assigned coordinator Htet Lin Oo to Ma Khin Hla (Neurology case).",
    ipAddress: "171.96.184.22 (Bangkok)"
  },
  {
    id: "log-006",
    timestamp: "2026-09-10T17:00:00Z",
    userName: "May Zun Phyo",
    userRole: "Follow-up Specialist",
    action: "CASE_COMPLETED",
    resourceType: "Case",
    resourceId: "TMG-2026-000108",
    description: "Case marked as completed. Executive screening report delivered to Ma May Thu.",
    ipAddress: "171.96.184.22 (Bangkok)"
  }
];
