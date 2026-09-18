import { MOCK_CASES } from "../data/cases";
import { storageService } from "./storageService";
import { mockDelay } from "./api";

const STORAGE_KEY = "tmg_cases";

function getStoredCases() {
  return storageService.get(STORAGE_KEY, MOCK_CASES);
}

function saveStoredCases(cases) {
  storageService.set(STORAGE_KEY, cases);
}

export const caseService = {
  async getCases(filters = {}) {
    await mockDelay(150);
    let results = getStoredCases();

    // Default: exclude archived cases unless requested
    if (!filters.includeArchived) {
      results = results.filter((c) => !c.isArchived);
    } else if (filters.onlyArchived) {
      results = results.filter((c) => c.isArchived);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (c) =>
          c.caseCode.toLowerCase().includes(q) ||
          c.patientName.toLowerCase().includes(q) ||
          c.specialty.toLowerCase().includes(q) ||
          (c.hospitalName && c.hospitalName.toLowerCase().includes(q))
      );
    }

    if (filters.status && filters.status !== "All") {
      results = results.filter((c) => c.status === filters.status);
    }

    if (filters.priority && filters.priority !== "All") {
      results = results.filter((c) => c.priority === filters.priority);
    }

    if (filters.coordinatorId && filters.coordinatorId !== "All") {
      results = results.filter((c) => c.coordinatorId === filters.coordinatorId);
    }

    if (filters.specialty && filters.specialty !== "All") {
      results = results.filter((c) => c.specialty === filters.specialty);
    }

    return results;
  },

  async getCaseById(id) {
    await mockDelay(100);
    const cases = getStoredCases();
    const found = cases.find((c) => c.id === id || c.caseCode === id);
    if (!found) throw new Error("Case not found");
    return { ...found };
  },

  async createCase(caseData) {
    await mockDelay(200);
    const cases = getStoredCases();
    const newId = `case-${Date.now().toString().slice(-4)}`;
    const newCode = `TMG-2026-${String(cases.length + 101).padStart(6, "0")}`;
    const newCase = {
      id: newId,
      caseCode: newCode,
      createdDate: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
      status: caseData.status || "New",
      priority: caseData.urgency === "Immediate" ? "Urgent" : caseData.priority || "Normal",
      coordinatorId: caseData.coordinatorId || "coord-01",
      coordinatorName: caseData.coordinatorName || "Thura Aung",
      matchedHospitals: caseData.matchedHospitals || [],
      isArchived: false,
      timeline: [
        {
          stage: "Inquiry Received",
          timestamp: new Date().toLocaleString([], { dateStyle: "short", timeStyle: "short" }),
          completed: true,
          actor: "Intake Form"
        },
        {
          stage: "Clinical Assessment",
          timestamp: "Pending",
          completed: false,
          actor: caseData.coordinatorName || "Thura Aung"
        }
      ],
      ...caseData
    };
    cases.unshift(newCase);
    saveStoredCases(cases);
    return newCase;
  },

  async updateCase(id, updates) {
    await mockDelay(150);
    const cases = getStoredCases();
    const idx = cases.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error("Case not found");

    const existing = cases[idx];
    const updated = {
      ...existing,
      ...updates,
      lastActivityDate: new Date().toISOString()
    };

    // Add timeline event if key clinical milestones changed
    if (updates.status && updates.status !== existing.status) {
      updated.timeline = [
        ...(updated.timeline || []),
        {
          stage: `Status Changed to ${updates.status}`,
          timestamp: new Date().toLocaleString([], { dateStyle: "short", timeStyle: "short" }),
          completed: true,
          actor: updates.actor || "Staff Coordinator"
        }
      ];
    }

    cases[idx] = updated;
    saveStoredCases(cases);
    return updated;
  },

  async updateCaseStatus(id, newStatus, actorName = "Staff") {
    return this.updateCase(id, { status: newStatus, actor: actorName });
  },

  async assignCoordinator(id, coordinator) {
    return this.updateCase(id, {
      coordinatorId: coordinator.id,
      coordinatorName: coordinator.name,
      actor: coordinator.name
    });
  },

  async archiveCase(id, reason = "Archived by staff") {
    await mockDelay(150);
    const cases = getStoredCases();
    const idx = cases.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error("Case not found");

    cases[idx] = {
      ...cases[idx],
      isArchived: true,
      archiveReason: reason,
      archivedAt: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
      timeline: [
        ...(cases[idx].timeline || []),
        {
          stage: "Case Archived",
          timestamp: new Date().toLocaleString([], { dateStyle: "short", timeStyle: "short" }),
          completed: true,
          actor: "Super Admin / Staff"
        }
      ]
    };
    saveStoredCases(cases);
    return cases[idx];
  },

  async unarchiveCase(id) {
    await mockDelay(150);
    const cases = getStoredCases();
    const idx = cases.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error("Case not found");

    cases[idx] = {
      ...cases[idx],
      isArchived: false,
      archiveReason: null,
      lastActivityDate: new Date().toISOString()
    };
    saveStoredCases(cases);
    return cases[idx];
  },

  async addTimelineEvent(caseId, event) {
    const cases = getStoredCases();
    const idx = cases.findIndex((c) => c.id === caseId);
    if (idx !== -1) {
      cases[idx].timeline = [
        ...(cases[idx].timeline || []),
        {
          timestamp: new Date().toLocaleString([], { dateStyle: "short", timeStyle: "short" }),
          completed: true,
          ...event
        }
      ];
      cases[idx].lastActivityDate = new Date().toISOString();
      saveStoredCases(cases);
    }
  }
};
