import { MOCK_SPECIALTIES } from "../data/specialties";
import { storageService } from "./storageService";
import { mockDelay } from "./api";

const STORAGE_KEY = "tmg_specialties";

function getStoredSpecialties() {
  return storageService.get(STORAGE_KEY, MOCK_SPECIALTIES);
}

function saveStoredSpecialties(specialties) {
  storageService.set(STORAGE_KEY, specialties);
}

export const specialtyService = {
  async getSpecialties(search = "", options = {}) {
    await mockDelay(100);
    let results = getStoredSpecialties();

    if (options.onlyActive) {
      results = results.filter((s) => s.status !== "Inactive");
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          (s.commonConditions && s.commonConditions.some((c) => c.toLowerCase().includes(q)))
      );
    }
    return results;
  },

  async getSpecialtyBySlug(slug) {
    await mockDelay(100);
    const specialties = getStoredSpecialties();
    const found = specialties.find((s) => s.slug === slug || s.id === slug);
    if (!found) throw new Error("Specialty not found");
    return { ...found };
  },

  async createSpecialty(specialtyData) {
    await mockDelay(150);
    const specialties = getStoredSpecialties();
    const slug = specialtyData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const newSpecialty = {
      id: `spec-${Date.now().toString().slice(-4)}`,
      slug,
      status: "Active",
      hospitalCount: 0,
      commonConditions: specialtyData.commonConditions || [],
      servicesOffered: specialtyData.servicesOffered || [],
      icon: "Stethoscope",
      ...specialtyData
    };
    specialties.unshift(newSpecialty);
    saveStoredSpecialties(specialties);
    return newSpecialty;
  },

  async updateSpecialty(id, updates) {
    await mockDelay(150);
    const specialties = getStoredSpecialties();
    const idx = specialties.findIndex((s) => s.id === id || s.slug === id);
    if (idx === -1) throw new Error("Specialty not found");

    const updated = {
      ...specialties[idx],
      ...updates
    };
    specialties[idx] = updated;
    saveStoredSpecialties(specialties);
    return updated;
  },

  async toggleSpecialtyStatus(id) {
    await mockDelay(100);
    const specialties = getStoredSpecialties();
    const idx = specialties.findIndex((s) => s.id === id || s.slug === id);
    if (idx === -1) throw new Error("Specialty not found");

    const currentStatus = specialties[idx].status || "Active";
    specialties[idx].status = currentStatus === "Active" ? "Inactive" : "Active";
    saveStoredSpecialties(specialties);
    return specialties[idx];
  }
};
