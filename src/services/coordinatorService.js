import { MOCK_COORDINATORS } from "../data/coordinators";
import { storageService } from "./storageService";
import { mockDelay } from "./api";

const STORAGE_KEY = "tmg_coordinators";

function getStoredCoordinators() {
  return storageService.get(STORAGE_KEY, MOCK_COORDINATORS);
}

function saveStoredCoordinators(coordinators) {
  storageService.set(STORAGE_KEY, coordinators);
}

export const coordinatorService = {
  async getCoordinators(options = {}) {
    await mockDelay(100);
    let results = getStoredCoordinators();

    if (options.onlyActive) {
      results = results.filter((c) => c.status !== "Inactive");
    }

    return results;
  },

  async getCoordinatorById(id) {
    await mockDelay(100);
    const coordinators = getStoredCoordinators();
    const found = coordinators.find((c) => c.id === id);
    if (!found) throw new Error("Coordinator not found");
    return { ...found };
  },

  async createCoordinator(coordData) {
    await mockDelay(150);
    const coordinators = getStoredCoordinators();
    const newCoord = {
      id: `coord-${Date.now().toString().slice(-4)}`,
      activeCasesCount: 0,
      completedCasesCount: 0,
      rating: 5.0,
      status: "Active",
      avatar:
        coordData.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      ...coordData
    };
    coordinators.push(newCoord);
    saveStoredCoordinators(coordinators);
    return newCoord;
  },

  async updateCoordinator(id, updates) {
    await mockDelay(150);
    const coordinators = getStoredCoordinators();
    const idx = coordinators.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error("Coordinator not found");

    const oldName = coordinators[idx].name;
    const updated = {
      ...coordinators[idx],
      ...updates
    };
    coordinators[idx] = updated;
    saveStoredCoordinators(coordinators);

    // Cross-screen sync: If coordinator name changed, update matching cases
    if (updates.name && updates.name !== oldName) {
      const storedCases = storageService.get("tmg_cases", []);
      let casesUpdated = false;
      storedCases.forEach((c) => {
        if (c.coordinatorId === id || c.coordinatorName === oldName) {
          c.coordinatorName = updates.name;
          casesUpdated = true;
        }
      });
      if (casesUpdated) {
        storageService.set("tmg_cases", storedCases);
      }
    }

    return updated;
  },

  async toggleCoordinatorStatus(id) {
    await mockDelay(100);
    const coordinators = getStoredCoordinators();
    const idx = coordinators.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error("Coordinator not found");

    const currentStatus = coordinators[idx].status || "Active";
    coordinators[idx].status = currentStatus === "Active" ? "Inactive" : "Active";
    saveStoredCoordinators(coordinators);
    return coordinators[idx];
  }
};
