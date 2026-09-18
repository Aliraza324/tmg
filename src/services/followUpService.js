import { MOCK_FOLLOW_UPS } from "../data/followUps";
import { storageService } from "./storageService";
import { caseService } from "./caseService";
import { mockDelay } from "./api";

const STORAGE_KEY = "tmg_follow_ups";

function getStoredFollowUps() {
  return storageService.get(STORAGE_KEY, MOCK_FOLLOW_UPS);
}

function saveStoredFollowUps(followUps) {
  storageService.set(STORAGE_KEY, followUps);
}

export const followUpService = {
  async getFollowUps(filters = {}) {
    await mockDelay(100);
    let results = getStoredFollowUps();

    if (filters.caseId) {
      results = results.filter((f) => f.caseId === filters.caseId);
    }

    if (filters.category && filters.category !== "all") {
      results = results.filter((f) => f.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.status && filters.status !== "All") {
      results = results.filter((f) => f.status === filters.status);
    }

    return results;
  },

  async createFollowUp(data) {
    await mockDelay(150);
    const followUps = getStoredFollowUps();
    const newFollowUp = {
      id: `flw-${Date.now().toString().slice(-4)}`,
      status: "Pending",
      category: data.category || "Upcoming",
      ...data
    };
    followUps.unshift(newFollowUp);
    saveStoredFollowUps(followUps);

    // Update case timeline if associated
    if (newFollowUp.caseId) {
      await caseService.addTimelineEvent(newFollowUp.caseId, {
        stage: `Follow-up Task Scheduled: ${newFollowUp.purpose}`,
        actor: newFollowUp.coordinatorName || "Coordinator"
      });
    }

    return newFollowUp;
  },

  async updateFollowUp(id, updates) {
    await mockDelay(150);
    const followUps = getStoredFollowUps();
    const idx = followUps.findIndex((f) => f.id === id);
    if (idx === -1) throw new Error("Follow-up not found");

    const updated = {
      ...followUps[idx],
      ...updates
    };
    followUps[idx] = updated;
    saveStoredFollowUps(followUps);
    return updated;
  },

  async completeFollowUp(id, outcomeNotes) {
    await mockDelay(150);
    const followUps = getStoredFollowUps();
    const idx = followUps.findIndex((f) => f.id === id);
    if (idx === -1) throw new Error("Follow-up not found");

    const item = followUps[idx];
    const updated = {
      ...item,
      status: "Completed",
      category: "Completed",
      outcome: outcomeNotes || item.outcome || "Completed by coordinator"
    };
    followUps[idx] = updated;
    saveStoredFollowUps(followUps);

    if (item.caseId) {
      await caseService.addTimelineEvent(item.caseId, {
        stage: `Follow-up Completed: ${item.purpose}`,
        actor: item.coordinatorName || "Coordinator"
      });
    }

    return updated;
  },

  async deleteFollowUp(id) {
    await mockDelay(100);
    const followUps = getStoredFollowUps();
    const filtered = followUps.filter((f) => f.id !== id);
    saveStoredFollowUps(filtered);
    return { success: true };
  }
};
