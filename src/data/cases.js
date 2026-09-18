import { CASE_STATUSES, CASE_PRIORITIES } from "../constants/statuses";

export const MOCK_CASES = [
  {
    id: "case-101",
    caseCode: "TMG-2026-000101",
    patientId: "pat-001",
    patientName: "U Kyaw Min",
    gender: "Male",
    age: 58,
    specialty: "Oncology",
    subSpecialty: "Thoracic Oncology",
    hospitalId: "hosp-bumrungrad",
    hospitalName: "Bumrungrad International Hospital",
    assignedDoctor: "Dr. Artit Jinawath (Medical Oncologist)",
    status: CASE_STATUSES.APPOINTMENT,
    priority: CASE_PRIORITIES.URGENT,
    coordinatorId: "coord-01",
    coordinatorName: "Thura Aung",
    createdDate: "2026-09-02T08:30:00Z",
    lastActivityDate: "2026-09-17T14:20:00Z",
    referralSource: "Web Guidance Request",
    preferredLanguage: "Burmese",
    clinicalSummary: "Patient diagnosed in Yangon with locally advanced NSCLC. Requires second opinion on targeted therapy vs. chemo-immunotherapy regimen. Mediastinal lymph node biopsy review required.",
    urgencyReason: "Rapid symptom escalation and cough with hemoptysis over 2 weeks.",
    matchedHospitals: [
      { hospitalId: "hosp-bumrungrad", name: "Bumrungrad International", matchScore: 98, status: "Selected", reason: "Specialized Horizon Regional Cancer Center with next-day tissue biopsy lab." },
      { hospitalId: "hosp-bangkok-hq", name: "Bangkok Hospital HQ", matchScore: 94, status: "Shortlisted", reason: "Wattanosoth Cancer Hospital has cyberknife radiation availability." }
    ],
    timeline: [
      { stage: "Inquiry Received", timestamp: "2026-09-02 08:30", completed: true, actor: "Web System" },
      { stage: "Clinical Assessment", timestamp: "2026-09-03 11:15", completed: true, actor: "Thura Aung" },
      { stage: "Hospital Matching", timestamp: "2026-09-05 14:00", completed: true, actor: "Thura Aung" },
      { stage: "Appointment Scheduled", timestamp: "2026-09-12 10:30", completed: true, actor: "Thura Aung" },
      { stage: "Consultation & Hospital Visit", timestamp: "2026-09-22 (Upcoming)", completed: false, actor: "Hospital Team" },
      { stage: "Post-Treatment Follow-up", timestamp: "Pending", completed: false, actor: "TMG Care Team" }
    ]
  },
  {
    id: "case-102",
    caseCode: "TMG-2026-000102",
    patientId: "pat-002",
    patientName: "Daw Thida Myint",
    gender: "Female",
    age: 51,
    specialty: "Cardiology",
    subSpecialty: "Valvular Heart Disease",
    hospitalId: "hosp-medpark",
    hospitalName: "MedPark Hospital",
    assignedDoctor: "Dr. Damras Tresukosol (Interventional Cardiologist)",
    status: CASE_STATUSES.HOSPITAL_MATCHING,
    priority: CASE_PRIORITIES.HIGH,
    coordinatorId: "coord-01",
    coordinatorName: "Thura Aung",
    createdDate: "2026-09-06T10:15:00Z",
    lastActivityDate: "2026-09-16T11:45:00Z",
    referralSource: "Physician Referral (Mandalay)",
    preferredLanguage: "Burmese",
    clinicalSummary: "Critical calcific aortic stenosis with valve area 0.7 cm2. Family inquiring about TAVI feasibility vs. open surgical AVR in Bangkok.",
    urgencyReason: "Exertional syncope episode reported 10 days ago.",
    matchedHospitals: [
      { hospitalId: "hosp-medpark", name: "MedPark Hospital", matchScore: 96, status: "Under Review", reason: "Renowned Hybrid OR suite and top TAVI proctor specialists." },
      { hospitalId: "hosp-bangkok-hq", name: "Bangkok Hospital HQ", matchScore: 92, status: "Shortlisted", reason: "Bangkok Heart Hospital high-volume center." }
    ],
    timeline: [
      { stage: "Inquiry Received", timestamp: "2026-09-06 10:15", completed: true, actor: "Mandalay Partner Clinic" },
      { stage: "Clinical Assessment", timestamp: "2026-09-08 16:20", completed: true, actor: "Thura Aung" },
      { stage: "Hospital Matching", timestamp: "In Progress", completed: false, actor: "Thura Aung" }
    ]
  },
  {
    id: "case-103",
    caseCode: "TMG-2026-000103",
    patientId: "pat-003",
    patientName: "Ko Aung Zaw",
    gender: "Male",
    age: 38,
    specialty: "Orthopedics",
    subSpecialty: "Spine Surgery",
    hospitalId: "hosp-vejthani",
    hospitalName: "Vejthani Hospital",
    assignedDoctor: "Dr. Chaiwat Piyaskulkaew (Spine Specialist)",
    status: CASE_STATUSES.APPOINTMENT,
    priority: CASE_PRIORITIES.NORMAL,
    coordinatorId: "coord-02",
    coordinatorName: "Su Myat Noe",
    createdDate: "2026-09-08T13:40:00Z",
    lastActivityDate: "2026-09-17T09:00:00Z",
    referralSource: "Viber Inquiry Desk",
    preferredLanguage: "Burmese / Shan",
    clinicalSummary: "L4-L5 left paracentral disc herniation. Conservative therapy failed. Candidate for minimally invasive endoscopic microdiscectomy.",
    urgencyReason: "Elective procedure with significant pain limiting daily occupation.",
    matchedHospitals: [
      { hospitalId: "hosp-vejthani", name: "Vejthani Hospital", matchScore: 95, status: "Selected", reason: "Leading robotic & endoscopic spine institute in Bangkok." }
    ],
    timeline: [
      { stage: "Inquiry Received", timestamp: "2026-09-08 13:40", completed: true, actor: "Su Myat Noe" },
      { stage: "Clinical Assessment", timestamp: "2026-09-09 14:10", completed: true, actor: "Su Myat Noe" },
      { stage: "Hospital Matching", timestamp: "2026-09-11 11:30", completed: true, actor: "Su Myat Noe" },
      { stage: "Appointment Scheduled", timestamp: "2026-09-15 15:45", completed: true, actor: "Su Myat Noe" }
    ]
  },
  {
    id: "case-104",
    caseCode: "TMG-2026-000104",
    patientId: "pat-004",
    patientName: "Ma Khin Hla",
    gender: "Female",
    age: 43,
    specialty: "Neurology",
    subSpecialty: "Interventional Neuroradiology",
    hospitalId: "hosp-bumrungrad",
    hospitalName: "Bumrungrad International Hospital",
    assignedDoctor: "Dr. Sirintara Singhara Na Ayudhaya (Neuro-interventionalist)",
    status: CASE_STATUSES.ASSESSMENT,
    priority: CASE_PRIORITIES.HIGH,
    coordinatorId: "coord-03",
    coordinatorName: "Htet Lin Oo",
    createdDate: "2026-09-12T09:10:00Z",
    lastActivityDate: "2026-09-16T17:30:00Z",
    referralSource: "Web Guidance Request",
    preferredLanguage: "Burmese",
    clinicalSummary: "Incidental finding of 6mm saccular aneurysm of right MCA bifurcation on brain MRA. Evaluating pipeline flow diverter or endovascular coiling.",
    urgencyReason: "Patient highly anxious; physician advises prompt intervention before flight travel.",
    matchedHospitals: [
      { hospitalId: "hosp-bumrungrad", name: "Bumrungrad International", matchScore: 97, status: "Under Review", reason: "Advanced bi-plane neuro-angiography and dedicated neuro ICU." }
    ],
    timeline: [
      { stage: "Inquiry Received", timestamp: "2026-09-12 09:10", completed: true, actor: "Web Intake" },
      { stage: "Clinical Assessment", timestamp: "In Progress", completed: false, actor: "Htet Lin Oo" }
    ]
  },
  {
    id: "case-105",
    caseCode: "TMG-2026-000105",
    patientId: "pat-005",
    patientName: "U Thein Than",
    gender: "Male",
    age: 65,
    specialty: "Gastroenterology",
    subSpecialty: "Hepatobiliary Oncology",
    hospitalId: "hosp-siriraj",
    hospitalName: "Siriraj Piyamaharajkarun Hospital",
    assignedDoctor: "Prof. Dr. Tawesak Tanwandee (Hepatologist)",
    status: CASE_STATUSES.FOLLOW_UP,
    priority: CASE_PRIORITIES.NORMAL,
    coordinatorId: "coord-04",
    coordinatorName: "May Zun Phyo",
    createdDate: "2026-08-10T11:00:00Z",
    lastActivityDate: "2026-09-15T16:00:00Z",
    referralSource: "Direct Contact / Walk-in Yangon",
    preferredLanguage: "Burmese",
    clinicalSummary: "Post-TACE (Transarterial Chemoembolization) for solitary HCC lesion. Completed 1st treatment cycle; checking post-procedure AFP levels and repeat dynamic liver CT.",
    urgencyReason: "Routine 6-week post-embolization scan schedule.",
    matchedHospitals: [
      { hospitalId: "hosp-siriraj", name: "Siriraj Piyamaharajkarun", matchScore: 99, status: "Selected", reason: "National center of excellence for liver disease." }
    ],
    timeline: [
      { stage: "Inquiry Received", timestamp: "2026-08-10 11:00", completed: true, actor: "Yangon Intake" },
      { stage: "Assessment", timestamp: "2026-08-12 14:00", completed: true, actor: "May Zun Phyo" },
      { stage: "Hospital Matching", timestamp: "2026-08-15 10:00", completed: true, actor: "May Zun Phyo" },
      { stage: "Appointment & TACE", timestamp: "2026-08-28 09:00", completed: true, actor: "Siriraj Team" },
      { stage: "Follow-up Surveillance", timestamp: "Active", completed: false, actor: "May Zun Phyo" }
    ]
  },
  {
    id: "case-106",
    caseCode: "TMG-2026-000106",
    patientId: "pat-006",
    patientName: "Daw Nilar Soe",
    gender: "Female",
    age: 34,
    specialty: "Endocrinology",
    subSpecialty: "Endocrine Surgery",
    hospitalId: "hosp-samitivej",
    hospitalName: "Samitivej Sukhumvit Hospital",
    assignedDoctor: "Dr. Somkiat Lalitwongsa",
    status: CASE_STATUSES.COMPLETED,
    priority: CASE_PRIORITIES.LOW,
    coordinatorId: "coord-02",
    coordinatorName: "Su Myat Noe",
    createdDate: "2026-07-15T08:00:00Z",
    lastActivityDate: "2026-09-01T12:00:00Z",
    referralSource: "Family Recommendation",
    preferredLanguage: "Burmese",
    clinicalSummary: "Underwent transoral endoscopic thyroidectomy vestibular approach (scarless thyroid surgery). Histopathology confirmed benign follicular adenoma.",
    urgencyReason: "Complete recovery. Patient discharged and safely back in Yangon.",
    matchedHospitals: [
      { hospitalId: "hosp-samitivej", name: "Samitivej Sukhumvit", matchScore: 95, status: "Selected", reason: "Advanced cosmetic scarless thyroid surgery team." }
    ],
    timeline: [
      { stage: "Inquiry", timestamp: "2026-07-15", completed: true, actor: "Su Myat Noe" },
      { stage: "Assessment", timestamp: "2026-07-18", completed: true, actor: "Su Myat Noe" },
      { stage: "Surgery Done", timestamp: "2026-08-04", completed: true, actor: "Samitivej Team" },
      { stage: "Case Closed", timestamp: "2026-09-01", completed: true, actor: "Su Myat Noe" }
    ]
  },
  {
    id: "case-107",
    caseCode: "TMG-2026-000107",
    patientId: "pat-007",
    patientName: "Ko Sai Lon",
    gender: "Male",
    age: 46,
    specialty: "Organ Transplant",
    subSpecialty: "Renal Transplantation",
    hospitalId: "hosp-praram9",
    hospitalName: "Praram 9 Hospital",
    assignedDoctor: "Prof. Dr. Vasant Sumethkul (Transplant Nephrologist)",
    status: CASE_STATUSES.NEW,
    priority: CASE_PRIORITIES.URGENT,
    coordinatorId: "coord-03",
    coordinatorName: "Htet Lin Oo",
    createdDate: "2026-09-17T07:15:00Z",
    lastActivityDate: "2026-09-17T07:15:00Z",
    referralSource: "Web Guidance Request",
    preferredLanguage: "Burmese / Shan",
    clinicalSummary: "ESRD on hemodialysis 3 times weekly. Living related donor (brother) available. Seeking HLA tissue cross-matching protocol and legal medical coordination.",
    urgencyReason: "Dialysis vascular access thrombosis history; urgency in establishing transplant workup plan.",
    matchedHospitals: [],
    timeline: [
      { stage: "Inquiry Received", timestamp: "2026-09-17 07:15", completed: true, actor: "Web Intake Form" },
      { stage: "Clinical Assessment", timestamp: "Pending Initial Call", completed: false, actor: "Htet Lin Oo" }
    ]
  },
  {
    id: "case-108",
    caseCode: "TMG-2026-000108",
    patientId: "pat-008",
    patientName: "Ma May Thu",
    gender: "Female",
    age: 30,
    specialty: "Health Screening",
    subSpecialty: "Preventive Executive Health",
    hospitalId: "hosp-bangkok-hq",
    hospitalName: "Bangkok Hospital Headquarters (BDMS)",
    assignedDoctor: "Royal Life Anti-Aging Center Physician",
    status: CASE_STATUSES.COMPLETED,
    priority: CASE_PRIORITIES.LOW,
    coordinatorId: "coord-04",
    coordinatorName: "May Zun Phyo",
    createdDate: "2026-09-01T14:30:00Z",
    lastActivityDate: "2026-09-10T17:00:00Z",
    referralSource: "Corporate Partner Group",
    preferredLanguage: "English / Burmese",
    clinicalSummary: "Executive comprehensive wellness profile, low-dose lung CT, cardiac calcium score, and genetic cancer risk screen.",
    urgencyReason: "Elective checkup during planned Bangkok business trip.",
    matchedHospitals: [
      { hospitalId: "hosp-bangkok-hq", name: "Bangkok Hospital HQ", matchScore: 97, status: "Selected", reason: "BDMS Royal Life wellness package." }
    ],
    timeline: [
      { stage: "Inquiry", timestamp: "2026-09-01", completed: true, actor: "May Zun Phyo" },
      { stage: "Checkup Completed", timestamp: "2026-09-08", completed: true, actor: "Bangkok Hospital" },
      { stage: "Report Delivered", timestamp: "2026-09-10", completed: true, actor: "May Zun Phyo" }
    ]
  }
];
