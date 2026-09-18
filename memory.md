# TMG Healthcare Platform MVP — Frontend Development Specification (`memory.md`)

*Permanent Frontend Source of Truth & Architecture Specification*
*Last Updated: 2026-09-18*

---

## 1. Project Overview
The **TMG Healthcare Platform** provides cross-border healthcare navigation and dedicated patient coordination support for Myanmar-speaking patients seeking specialized medical care in Thailand. 

TMG functions as an independent, empathetic patient advocate and medical facilitator. It connects patients to premier hospital networks, arranges accredited specialist matching, assists in language-barrier-free communication, coordinates appointment logistics, and tracks comprehensive post-consultation follow-ups.

> **CRITICAL MEDICAL UX DIRECTIVE**: TMG is **NOT** a hospital or telehealth clinic, does **NOT** provide medical diagnoses, treatment plans, prescriptions, or medical guarantees. Terminology must strictly reflect *guidance, patient coordination, assessment, hospital matching, appointment support, and case follow-up*.

---

## 2. Frontend Scope
Strictly frontend application prototype built to production-grade standards.
* **Included**:
  * **Public Patient & Partner Portal**: Home, About, Healthcare Services Directory, Hospitals Directory (with filterable detail pages), Specialties Directory, Guidance Request multi-step onboarding wizard, Privacy Policy, Consent Agreement, and Contact pages.
  * **Internal Staff & Coordinator Dashboard**: Comprehensive Case Management workspace, Patient Directory, Hospital Matching engine, Appointments calendar & agenda, Follow-up tracker, Document management center, Coordinator workload roster, Operational Analytics, Custom Reports, Notifications drawer, Audit log ledger, and Role/System Settings.
  * Realistic mock data simulation with unified repository & service abstractions.
  * Role-based UI simulation (Super Admin, Admin, Coordinator).
  * Robust state management (Redux Toolkit for session/role/filters, TanStack Query architecture for future server state).
  * Comprehensive responsive layouts (Mobile, Tablet, Desktop, Wide screen).
  * Micro-animations via Motion, full accessibility considerations, and localized typography architecture (English + Burmese Unicode Noto Sans Myanmar).
* **Excluded**:
  * No backend server, database connections, GraphQL/REST endpoints, real document file servers, real payment gateways, SMS/email relays, or live LINE/Messenger APIs.

---

## 3. Technology Stack
* **Framework**: React 19 + Vite
* **Styling**: Tailwind CSS v4 with custom theme tokens
* **Routing**: React Router v7 (`react-router-dom`) with code-splitting & lazy-loaded routes
* **Global State**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`) for authentication simulation, active role, notifications, and user preferences
* **Server State Architecture**: TanStack React Query (`@tanstack/react-query`)
* **HTTP Client**: Axios instance abstraction with simulated network latency & mock service adapter
* **Icons**: Lucide React (`lucide-react`)
* **Motion & Animations**: Motion / Framer Motion (`framer-motion`, `motion`)
* **Data Visualization**: Recharts (`recharts`)
* **Form Engine & Validation**: React Hook Form (`react-hook-form`) + Zod (`zod`, `@hookform/resolvers/zod`)
* **Utility Libraries**: `clsx`, `tailwind-merge`
* **Custom UI Loaders**: Framer Motion animated ECG pulse line, circular gradient spinner, staggered dots, and full-page branded loader (`src/components/common/Loader.jsx`).

---

## 4. Folder Structure
```text
src/
├── app/
│   ├── App.jsx               # Application root with router and notification toasts
│   ├── router.jsx            # Centralized lazy routes & auth/role guards
│   ├── store.js              # Redux Toolkit store definition
│   └── providers.jsx         # App-level provider wrapping (Query, Redux, Toast)
├── assets/
│   ├── images/               # Healthcare visual assets & placeholders
│   └── icons/                # Specialized branding icons
├── components/
│   ├── ui/                   # Button, Input, Select, Badge, Card, Modal, Drawer, etc.
│   ├── common/               # PageHeader, Breadcrumbs, EmptyState, SkeletonLoader, StatusBadge
│   ├── forms/                # FormField, DatePicker, FileUpload, MultiStepWizard
│   ├── tables/               # Responsive DataTable, TablePagination, TableFilters
│   ├── modals/               # ConfirmDialog, AppointmentModal, CaseAssignModal, StatusChangeModal
│   ├── charts/               # MetricCard, AnalyticsCharts (Line, Bar, Donut, Area)
│   └── feedback/             # ToastContainer, ErrorBoundary, AlertBanner
├── layouts/
│   ├── PublicLayout.jsx      # Top navigation, trust bar, footer, language selector
│   ├── DashboardLayout.jsx   # Collapsible sidebar, topbar, search, user menu, notifications
│   └── AuthLayout.jsx        # Clean split authentication view
├── pages/
│   ├── public/
│   │   ├── Home/             # Hero, Services, Journey, Directory preview, Testimonials
│   │   ├── About/            # Mission, Medical Advisory, Thai Hospital Network
│   │   ├── Healthcare/       # Service guide & individual service deep dives
│   │   ├── Hospitals/        # Hospital directory, filters, hospital detail profile
│   │   ├── Specialties/      # Medical specialty directory & detail profile
│   │   ├── Services/         # Patient coordination & language assistance services
│   │   ├── GuidanceRequest/  # 5-step interactive guidance request wizard
│   │   ├── Contact/          # Regional offices (Yangon, Bangkok) & emergency guidance
│   │   ├── Privacy/          # Privacy statement & HIPAA/PDPA compliance principles
│   │   └── Consent/          # Informed consent & data processing disclosure
│   ├── auth/
│   │   └── Login/            # Simulated staff login & role switcher
│   └── dashboard/
│       ├── Overview/         # Operational metrics, workload overview, quick actions
│       ├── Cases/            # Case list & 10-tab Case Workspace (/cases/:id)
│       ├── Patients/         # Patient directory & patient profile (/patients/:id)
│       ├── Hospitals/        # Internal hospital network directory & affiliation details
│       ├── Specialties/      # Specialty management & service mapping
│       ├── Appointments/     # Appointment agenda & interactive calendar view
│       ├── FollowUps/        # Overdue, today, and upcoming patient follow-ups
│       ├── Documents/        # Secure document repository simulation & viewer
│       ├── Coordinators/     # Team directory, case load distribution, performance
│       ├── Analytics/        # In-depth trends, hospital conversion, specialty demand
│       ├── Reports/          # Filterable report generator & CSV export simulation
│       ├── Notifications/    # Staff notification inbox & activity alerts
│       ├── AuditLogs/        # Immutable event trail for case & record alterations
│       └── Settings/         # Profile, notification rules, language, security simulation
├── features/
│   ├── cases/                # Case components (Timeline, Matcher, Notes, Activity)
│   ├── patients/             # Patient details, medical summaries, privacy maskers
│   ├── hospitals/            # Hospital accreditation badges, department lists
│   ├── appointments/         # Appointment scheduling forms, status controls
│   └── documents/            # Document card, upload progress simulation, previewer
├── hooks/                    # useAuth, useDebounce, useMediaQuery, useToast, useRole
├── services/                 # Unified mock API services (api.js, caseService.js, etc.)
├── data/                     # Realistic mock datasets (cases, patients, hospitals, etc.)
├── constants/                # Navigation items, status mappings, color tokens
├── utils/                    # Formatters (date, currency, phone masking), classNames (cn)
├── i18n/                     # English & Burmese translation dictionaries and config
└── styles/                   # Design system tokens and custom utilities
```

---

## 5. Design System & Aesthetics
* **Design Philosophy**: Non-AI, trustworthy, medically rigorous, human-centered, accessible. Rejects generic SaaS tropes (purple gradients, bloated glassmorphism, floating blobs, over-sized pill buttons).
* **Tone**: Safe, calm, organized, highly legible, operational, empathic.

### Color System
* **Primary Teal / Deep Healthcare Blue**:
  * `primary-950`: `#062527` (Deepest Navy Teal)
  * `primary-900`: `#0B3B3E` (Brand Dark Slate)
  * `primary-800`: `#0E4F54` (Deep Medical Teal)
  * `primary-700`: `#12646A` (Primary Brand Teal)
  * `primary-600`: `#17828A` (Interactive State)
  * `primary-500`: `#1E9DA6` (Vibrant Accent Teal)
  * `primary-100`: `#E1F4F5` (Soft Teal Surface)
  * `primary-50`:  `#F0FAFA` (Light Subtle Tint)
* **Secondary Slate / Navy**:
  * `slate-900`: `#0F172A` (Headings & Primary Text)
  * `slate-700`: `#334155` (Body Text)
  * `slate-500`: `#64748B` (Muted Captions & Subtitles)
  * `slate-200`: `#E2E8F0` (Default Structural Borders)
  * `slate-100`: `#F1F5F9` (Card Backgrounds & Soft Badges)
  * `slate-50`:  `#F8FAFC` (App Canvas Neutral)
* **Functional & Status Colors**:
  * **Success**: Emerald (`emerald-700`: `#047857`, `emerald-50`: `#ECFDF5`)
  * **Warning / Attention**: Amber (`amber-700`: `#B45309`, `amber-50`: `#FFFBEB`)
  * **Critical / Urgent**: Rose/Red (`rose-700`: `#BE123C`, `rose-50`: `#FFF1F2`)
  * **Informational**: Sky Blue (`sky-700`: `#0369A1`, `sky-50`: `#F0F9FF`)
  * **Pending / Assessment**: Purple/Indigo (`indigo-700`: `#4338CA`, `indigo-50`: `#EEF2FF`)

### Typography
* **Latin Font**: `Inter`, system-ui, -apple-system, sans-serif
* **Burmese Font**: `Noto Sans Myanmar`, `Padauk`, sans-serif
* **Hierarchy**:
  * `xs`: 12px (line-height: 16px) — Badges, table metadata, micro-timestamps
  * `sm`: 14px (line-height: 20px) — Table rows, compact forms, sub-labels
  * `base`: 16px (line-height: 24px) — Standard body text, inputs, buttons
  * `lg`: 18px (line-height: 28px) — Card titles, featured quotes, lead body
  * `xl`: 20px (line-height: 28px) — Modal headers, section subheaders
  * `2xl`: 24px (line-height: 32px) — Section titles, dashboard KPI titles
  * `3xl`: 30px (line-height: 36px) — Page headings
  * `4xl`: 36px (line-height: 40px) — Major hero headers
* **Font Weights**: Regular (400) for body; Medium (500) for controls and table text; SemiBold (600) for cards and headings; Bold (700) sparingly for hero elements.

### Spacing & Layout Rules
* Strict adherence to 4px multiples: `4px` (1), `8px` (2), `12px` (3), `16px` (4), `20px` (5), `24px` (6), `32px` (8), `40px` (10), `48px` (12), `64px` (16), `80px` (20).
* Public page maximum container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
* Dashboard page container: Fluid container with `p-4 sm:p-6 lg:p-8 max-w-[1600px]`.

### Border Radius Rules
* Standard components (Cards, Inputs, Buttons, Modals, Tables): `rounded-lg` (8px) or `rounded-md` (6px).
* Avatars, Status Indicators, Compact Badges: `rounded-full`.
* Strictly avoid oversized bubble/pill cards.

### Elevation & Shadows
* `shadow-sm` for standard cards and table headers.
* `shadow-md` for modals, popovers, and elevated action buttons.
* Rely on crisp `border border-slate-200` with solid surface contrasts rather than heavy diffuse blur shadows.

---

## 6. Component Guidelines & Specifications
* **Buttons**:
  * Primary: High-contrast Medical Teal (`bg-primary-700 text-white hover:bg-primary-800 focus:ring-2 focus:ring-primary-500`).
  * Secondary: Bordered outline (`border border-slate-300 text-slate-700 hover:bg-slate-50`).
  * Ghost: Subdued background (`text-slate-600 hover:bg-slate-100`).
  * Danger: Soft destructive (`bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100`).
  * Loading state: Inline spinner with disabled cursor.
* **Inputs & Controls**:
  * Clear label, subtle helper text, explicit error message below input.
  * Border: `border-slate-300 focus:border-primary-600 focus:ring-1 focus:ring-primary-600`.
  * Height standard: 40px (`h-10 px-3.5`).
* **Tables**:
  * Clean sticky headers, subtle hover rows (`hover:bg-slate-50/70`), numeric column alignments right, text left.
  * Mobile adaptation: Horizontal overflow wrapper or card transformation.
* **Modals & Drawers**:
  * Semi-transparent dark overlay (`bg-slate-900/60 backdrop-blur-xs`), smooth Motion transition, ESC-key dismissible, focus-trapped.

---

## 7. Statuses & Workflow System
### Case Lifecycle
1. `New` (Fresh patient inquiry from web/chat)
2. `Assessment` (Coordinator reviews medical notes, urgency, language needs)
3. `Hospital Matching` (Coordinating suitable hospitals & specialist departments)
4. `Appointment` (Scheduling consultation date, doctor confirmation, visa letters)
5. `Follow-up` (Post-visit review, prescription coordination, second opinions)
6. `Completed` (Case resolved and patient returned safely)
7. `On Hold` / `Cancelled` (Patient deferred or unresponsive)

### Priority Matrix
* `Urgent` (Immediate hospitalization / critical oncology / acute cardiac) -> Crimson badge with alert icon
* `High` (Expedited consultation within 3-5 days) -> Amber badge
* `Normal` (Standard elective treatment / health checkup) -> Teal/Slate badge
* `Low` (General query / forward planning) -> Neutral slate badge

---

## 8. Role-Based Access Simulation (RBAC)
* **Super Admin**: Full access to all modules, system configuration, audit logs, and coordinator management.
* **Admin**: Access to all operational modules, analytics, hospital management, patient data, and reports.
* **Coordinator**: Restricted to operational workflow: My Assigned Cases, Appointments, Follow-ups, Documents, and Case Notes. Coordinator is blocked from full audit logs and user administration.
* Role switcher provided in the Topbar / Auth dropdown for effortless evaluation of role permissions.

---

## 9. Sensitive Information & Medical Privacy UI
* Patient identifiers (NRC numbers, phone numbers, passport scans) must include privacy mask toggles (`+95 *** *** 482` with click-to-reveal).
* Medical documents carry sensitive data banners and security badges.
* Clear patient consent tracking recorded per case with timestamp and policy revision.

---

## 10. File Size Limit & Code Conventions
* **Max 300 lines per file**: Large files must be decomposed into modular components, sub-views, custom hooks, and utility helpers.
* **Naming Conventions**:
  * PascalCase for React components (`HospitalCard.jsx`).
  * camelCase for hooks, utilities, and services (`caseService.js`, `useDebounce.js`).
  * UPPER_SNAKE_CASE for constants (`CASE_STATUSES.js`).
* **Clean Code Guidelines**:
  * No God components.
  * Zero hardcoded inline styling.
  * Full keyboard accessibility support.
  * Explicit loading skeletons and empty states for every collection.

---

## 11. Current Implementation Status
- [x] Phase 1: Project review and initial workspace audit
- [x] Phase 2: Specification artifact (`memory.md`) created
- [x] Phase 3: Dependencies installation (`react-router-dom`, `@reduxjs/toolkit`, `react-redux`, `@tanstack/react-query`, `axios`, `lucide-react`, `recharts`, `react-hook-form`, `zod`, `@hookform/resolvers`, `clsx`, `tailwind-merge`)
- [x] Phase 4: Design tokens, CSS setup, shared UI component library (Button, Input, Select, Badge, Card, Modal, Drawer, Tabs, DataTable, StatusBadge)
- [x] Phase 5: Centralized Mock Data & Service Repositories (cases, patients, hospitals, specialties, appointments, follow-ups, documents, coordinators, audit logs)
- [x] Phase 6: Public Portal pages (Home, About, Healthcare, Hospitals, Specialties, Services, Contact, Privacy, Consent)
- [x] Phase 7: Guidance Request multi-step onboarding wizard (5 steps with React Hook Form + Zod)
- [x] Phase 8: Dashboard shell & navigation (Sidebar, Topbar, RBAC Role Switcher: Super Admin, Admin, Coordinator)
- [x] Phase 9: Dashboard Overview & Analytics (KPI stats, Recharts operational charts)
- [x] Phase 10: Case Management (List, Filters, 10-tab Case Workspace, Hospital Matching)
- [x] Phase 11: Patient Directory & Profile views (privacy masking toggles)
- [x] Phase 12: Appointments (List & Interactive Calendar view) & Follow-up Tracker
- [x] Phase 13: Document Center, Coordinator Management, Audit Logs, Settings
- [x] Phase 14: Mobile responsiveness, Accessibility, Polish & Production Build Verification

---

## 12. Future Backend Integration Roadmap
* Replace `src/services/*.js` mock returns with real Axios REST endpoints.
* Attach JWT token interceptors in `src/services/api.js`.
* Replace mock file drop simulation with Amazon S3 / Cloudflare R2 pre-signed URLs.
* Connect WebSocket for real-time coordinator case notifications.
