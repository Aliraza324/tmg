import { MOCK_PATIENTS } from "../data/patients";
import { storageService } from "./storageService";
import { mockDelay } from "./api";

const STORAGE_KEY = "tmg_patients";

function getStoredPatients() {
  return storageService.get(STORAGE_KEY, MOCK_PATIENTS);
}

function saveStoredPatients(patients) {
  storageService.set(STORAGE_KEY, patients);
}

export const patientService = {
  async getPatients(search = "", options = {}) {
    await mockDelay(100);
    let results = getStoredPatients();

    if (options.onlyActive) {
      results = results.filter((p) => p.status !== "Inactive");
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.fullName.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          (p.primaryDiagnosis && p.primaryDiagnosis.toLowerCase().includes(q))
      );
    }
    return results;
  },

  async getPatientById(id) {
    await mockDelay(100);
    const patients = getStoredPatients();
    const patient = patients.find((p) => p.id === id);
    if (!patient) throw new Error("Patient not found");
    return { ...patient };
  },

  async createPatient(patientData) {
    await mockDelay(150);
    const patients = getStoredPatients();
    const newPatient = {
      id: `pat-${Date.now().toString().slice(-4)}`,
      registeredDate: new Date().toISOString().split("T")[0],
      status: "Active",
      ...patientData
    };
    patients.unshift(newPatient);
    saveStoredPatients(patients);
    return newPatient;
  },

  async updatePatient(id, updates) {
    await mockDelay(150);
    const patients = getStoredPatients();
    const idx = patients.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Patient not found");

    const oldName = patients[idx].fullName;
    const updated = {
      ...patients[idx],
      ...updates
    };
    patients[idx] = updated;
    saveStoredPatients(patients);

    // Cross-screen sync: If patient name or contact changed, update matching cases
    if (updates.fullName && updates.fullName !== oldName) {
      const storedCases = storageService.get("tmg_cases", []);
      let casesUpdated = false;
      storedCases.forEach((c) => {
        if (c.patientId === id || c.patientName === oldName) {
          c.patientName = updates.fullName;
          casesUpdated = true;
        }
      });
      if (casesUpdated) {
        storageService.set("tmg_cases", storedCases);
      }
    }

    return updated;
  },

  async togglePatientStatus(id) {
    await mockDelay(100);
    const patients = getStoredPatients();
    const idx = patients.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Patient not found");

    const currentStatus = patients[idx].status || "Active";
    patients[idx].status = currentStatus === "Active" ? "Inactive" : "Active";
    saveStoredPatients(patients);
    return patients[idx];
  }
};
