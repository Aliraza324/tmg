import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import { Skeleton } from "../components/common/SkeletonLoader";

// Lazy-loaded Public Pages
const HomePage = lazy(() => import("../pages/public/Home/HomePage"));
const AboutPage = lazy(() => import("../pages/public/About/AboutPage"));
const HealthcarePage = lazy(() => import("../pages/public/Healthcare/HealthcarePage"));
const HealthcareDetailPage = lazy(() => import("../pages/public/Healthcare/HealthcareDetailPage"));
const HospitalsPage = lazy(() => import("../pages/public/Hospitals/HospitalsPage"));
const HospitalDetailPage = lazy(() => import("../pages/public/Hospitals/HospitalDetailPage"));
const SpecialtiesPage = lazy(() => import("../pages/public/Specialties/SpecialtiesPage"));
const SpecialtyDetailPage = lazy(() => import("../pages/public/Specialties/SpecialtyDetailPage"));
const ServicesPage = lazy(() => import("../pages/public/Services/ServicesPage"));
const ContactPage = lazy(() => import("../pages/public/Contact/ContactPage"));
const PrivacyPage = lazy(() => import("../pages/public/Privacy/PrivacyPage"));
const ConsentPage = lazy(() => import("../pages/public/Consent/ConsentPage"));
const GuidanceRequestPage = lazy(() => import("../pages/public/GuidanceRequest/GuidanceRequestPage"));

// Lazy-loaded Auth Pages
const LoginPage = lazy(() => import("../pages/auth/Login/LoginPage"));

// Lazy-loaded Dashboard Pages
const OverviewPage = lazy(() => import("../pages/dashboard/Overview/OverviewPage"));
const CasesPage = lazy(() => import("../pages/dashboard/Cases/CasesPage"));
const CaseDetailPage = lazy(() => import("../pages/dashboard/Cases/CaseDetailPage"));
const PatientsPage = lazy(() => import("../pages/dashboard/Patients/PatientsPage"));
const PatientDetailPage = lazy(() => import("../pages/dashboard/Patients/PatientDetailPage"));
const DashboardHospitalsPage = lazy(() => import("../pages/dashboard/Hospitals/DashboardHospitalsPage"));
const DashboardSpecialtiesPage = lazy(() => import("../pages/dashboard/Specialties/DashboardSpecialtiesPage"));
const AppointmentsPage = lazy(() => import("../pages/dashboard/Appointments/AppointmentsPage"));
const FollowUpsPage = lazy(() => import("../pages/dashboard/FollowUps/FollowUpsPage"));
const DocumentsPage = lazy(() => import("../pages/dashboard/Documents/DocumentsPage"));
const CoordinatorsPage = lazy(() => import("../pages/dashboard/Coordinators/CoordinatorsPage"));
const AnalyticsPage = lazy(() => import("../pages/dashboard/Analytics/AnalyticsPage"));
const ReportsPage = lazy(() => import("../pages/dashboard/Reports/ReportsPage"));
const NotificationsPage = lazy(() => import("../pages/dashboard/Notifications/NotificationsPage"));
const AuditLogsPage = lazy(() => import("../pages/dashboard/AuditLogs/AuditLogsPage"));
const UsersPage = lazy(() => import("../pages/dashboard/Users/UsersPage"));
const SettingsPage = lazy(() => import("../pages/dashboard/Settings/SettingsPage"));

import { PageLoader } from "../components/common/Loader";

// Route Fallback Loader
function RouteFallback() {
  return (
    <div className="p-8 max-w-5xl mx-auto flex items-center justify-center min-h-[420px]">
      <PageLoader
        title="TMG Healthcare Platform"
        subtitle="Loading clinical modules & medical coordination assets..."
      />
    </div>
  );
}

export const router = createBrowserRouter([
  // Public Portal Routes
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Suspense fallback={<RouteFallback />}><HomePage /></Suspense> },
      { path: "about", element: <Suspense fallback={<RouteFallback />}><AboutPage /></Suspense> },
      { path: "healthcare", element: <Suspense fallback={<RouteFallback />}><HealthcarePage /></Suspense> },
      { path: "healthcare/:slug", element: <Suspense fallback={<RouteFallback />}><HealthcareDetailPage /></Suspense> },
      { path: "hospitals", element: <Suspense fallback={<RouteFallback />}><HospitalsPage /></Suspense> },
      { path: "hospitals/:slug", element: <Suspense fallback={<RouteFallback />}><HospitalDetailPage /></Suspense> },
      { path: "specialties", element: <Suspense fallback={<RouteFallback />}><SpecialtiesPage /></Suspense> },
      { path: "specialties/:slug", element: <Suspense fallback={<RouteFallback />}><SpecialtyDetailPage /></Suspense> },
      { path: "services", element: <Suspense fallback={<RouteFallback />}><ServicesPage /></Suspense> },
      { path: "contact", element: <Suspense fallback={<RouteFallback />}><ContactPage /></Suspense> },
      { path: "guidance-request", element: <Suspense fallback={<RouteFallback />}><GuidanceRequestPage /></Suspense> },
      { path: "privacy", element: <Suspense fallback={<RouteFallback />}><PrivacyPage /></Suspense> },
      { path: "consent", element: <Suspense fallback={<RouteFallback />}><ConsentPage /></Suspense> }
    ]
  },

  // Auth Routes
  {
    path: "/auth/login",
    element: <Suspense fallback={<RouteFallback />}><LoginPage /></Suspense>
  },
  {
    path: "/login",
    element: <Navigate to="/auth/login" replace />
  },

  // Internal Dashboard Routes
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <Suspense fallback={<RouteFallback />}><OverviewPage /></Suspense> },
      { path: "cases", element: <Suspense fallback={<RouteFallback />}><CasesPage /></Suspense> },
      { path: "cases/:id", element: <Suspense fallback={<RouteFallback />}><CaseDetailPage /></Suspense> },
      { path: "patients", element: <Suspense fallback={<RouteFallback />}><PatientsPage /></Suspense> },
      { path: "patients/:id", element: <Suspense fallback={<RouteFallback />}><PatientDetailPage /></Suspense> },
      { path: "dashboard/hospitals", element: <Suspense fallback={<RouteFallback />}><DashboardHospitalsPage /></Suspense> },
      { path: "dashboard/specialties", element: <Suspense fallback={<RouteFallback />}><DashboardSpecialtiesPage /></Suspense> },
      { path: "appointments", element: <Suspense fallback={<RouteFallback />}><AppointmentsPage /></Suspense> },
      { path: "follow-ups", element: <Suspense fallback={<RouteFallback />}><FollowUpsPage /></Suspense> },
      { path: "documents", element: <Suspense fallback={<RouteFallback />}><DocumentsPage /></Suspense> },
      { path: "coordinators", element: <Suspense fallback={<RouteFallback />}><CoordinatorsPage /></Suspense> },
      { path: "analytics", element: <Suspense fallback={<RouteFallback />}><AnalyticsPage /></Suspense> },
      { path: "reports", element: <Suspense fallback={<RouteFallback />}><ReportsPage /></Suspense> },
      { path: "notifications", element: <Suspense fallback={<RouteFallback />}><NotificationsPage /></Suspense> },
      { path: "audit-logs", element: <Suspense fallback={<RouteFallback />}><AuditLogsPage /></Suspense> },
      { path: "users", element: <Suspense fallback={<RouteFallback />}><UsersPage /></Suspense> },
      { path: "settings", element: <Suspense fallback={<RouteFallback />}><SettingsPage /></Suspense> }
    ]
  },

  // Catch-all 404 redirect to Home
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);
