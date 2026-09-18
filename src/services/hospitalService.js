import { MOCK_HOSPITALS } from "../data/hospitals";
import { storageService } from "./storageService";
import { mockDelay } from "./api";

const STORAGE_KEY = "tmg_hospitals";

function getStoredHospitals() {
  return storageService.get(STORAGE_KEY, MOCK_HOSPITALS);
}

function saveStoredHospitals(hospitals) {
  storageService.set(STORAGE_KEY, hospitals);
}

export const hospitalService = {
  async getHospitals(filters = {}) {
    await mockDelay(100);
    let results = getStoredHospitals();

    if (filters.onlyActive) {
      results = results.filter((h) => h.status !== "Inactive");
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.district.toLowerCase().includes(q) ||
          h.specialties.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (filters.specialty && filters.specialty !== "All") {
      results = results.filter((h) =>
        h.specialties.some((s) => s.toLowerCase() === filters.specialty.toLowerCase())
      );
    }

    return results;
  },

  async getHospitalBySlug(slug) {
    await mockDelay(100);
    const hospitals = getStoredHospitals();
    const hospital = hospitals.find((h) => h.slug === slug || h.id === slug);
    if (!hospital) throw new Error("Hospital not found");
    return { ...hospital };
  },

  async createHospital(hospitalData) {
    await mockDelay(150);
    const hospitals = getStoredHospitals();
    const slug = hospitalData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const newHospital = {
      id: `hosp-${Date.now().toString().slice(-4)}`,
      slug,
      status: "Active",
      rating: 4.8,
      reviewCount: 1,
      accreditations: hospitalData.accreditations || ["HA Thailand"],
      specialties: hospitalData.specialties || ["General Medicine"],
      languagesSupported: hospitalData.languagesSupported || ["Burmese", "English", "Thai"],
      burmeseLiaison: hospitalData.burmeseLiaison || "Myanmar Medical Liaison Desk",
      image:
        hospitalData.image ||
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
      ...hospitalData
    };
    hospitals.unshift(newHospital);
    saveStoredHospitals(hospitals);
    return newHospital;
  },

  async updateHospital(id, updates) {
    await mockDelay(150);
    const hospitals = getStoredHospitals();
    const idx = hospitals.findIndex((h) => h.id === id || h.slug === id);
    if (idx === -1) throw new Error("Hospital not found");

    const oldName = hospitals[idx].name;
    const updated = {
      ...hospitals[idx],
      ...updates
    };
    hospitals[idx] = updated;
    saveStoredHospitals(hospitals);

    // Cross-screen sync: If hospital name changed, update matching cases
    if (updates.name && updates.name !== oldName) {
      const storedCases = storageService.get("tmg_cases", []);
      let casesUpdated = false;
      storedCases.forEach((c) => {
        if (c.hospitalId === id || c.hospitalName === oldName) {
          c.hospitalName = updates.name;
          casesUpdated = true;
        }
      });
      if (casesUpdated) {
        storageService.set("tmg_cases", storedCases);
      }
    }

    return updated;
  },

  async toggleHospitalStatus(id) {
    await mockDelay(100);
    const hospitals = getStoredHospitals();
    const idx = hospitals.findIndex((h) => h.id === id || h.slug === id);
    if (idx === -1) throw new Error("Hospital not found");

    const currentStatus = hospitals[idx].status || "Active";
    hospitals[idx].status = currentStatus === "Active" ? "Inactive" : "Active";
    saveStoredHospitals(hospitals);
    return hospitals[idx];
  }
};
