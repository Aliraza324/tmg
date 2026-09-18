import { MOCK_APPOINTMENTS } from "../data/appointments";
import { storageService } from "./storageService";
import { caseService } from "./caseService";
import { mockDelay } from "./api";

const STORAGE_KEY = "tmg_appointments";

function getStoredAppointments() {
  return storageService.get(STORAGE_KEY, MOCK_APPOINTMENTS);
}

function saveStoredAppointments(appointments) {
  storageService.set(STORAGE_KEY, appointments);
}

export const appointmentService = {
  async getAppointments(filters = {}) {
    await mockDelay(100);
    let results = getStoredAppointments();

    if (filters.caseId) {
      results = results.filter((a) => a.caseId === filters.caseId);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (a) =>
          a.patientName.toLowerCase().includes(q) ||
          a.hospitalName.toLowerCase().includes(q) ||
          a.doctorName.toLowerCase().includes(q)
      );
    }

    if (filters.status && filters.status !== "All") {
      results = results.filter((a) => a.status === filters.status);
    }

    return results;
  },

  async getAppointmentById(id) {
    await mockDelay(100);
    const appointments = getStoredAppointments();
    const found = appointments.find((a) => a.id === id);
    if (!found) throw new Error("Appointment not found");
    return { ...found };
  },

  async createAppointment(appointmentData) {
    await mockDelay(150);
    const appointments = getStoredAppointments();
    const newApt = {
      id: `apt-${Date.now().toString().slice(-4)}`,
      status: appointmentData.status || "Confirmed",
      ...appointmentData
    };
    appointments.unshift(newApt);
    saveStoredAppointments(appointments);

    // Timeline event on associated case
    if (newApt.caseId) {
      await caseService.addTimelineEvent(newApt.caseId, {
        stage: `Appointment Scheduled (${newApt.hospitalName})`,
        actor: newApt.coordinatorName || "Coordinator"
      });
    }

    return newApt;
  },

  async updateAppointment(id, updates) {
    await mockDelay(150);
    const appointments = getStoredAppointments();
    const idx = appointments.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error("Appointment not found");

    const updated = {
      ...appointments[idx],
      ...updates
    };
    appointments[idx] = updated;
    saveStoredAppointments(appointments);

    // Sync timeline on case if date/time rescheduled
    if (updates.appointmentDate && updates.appointmentDate !== appointments[idx].appointmentDate) {
      if (updated.caseId) {
        await caseService.addTimelineEvent(updated.caseId, {
          stage: `Appointment Rescheduled to ${updated.appointmentDate}`,
          actor: "Coordinator"
        });
      }
    }

    return updated;
  },

  async updateAppointmentStatus(id, newStatus) {
    return this.updateAppointment(id, { status: newStatus });
  },

  async cancelAppointment(id, reason = "Cancelled by coordinator") {
    await mockDelay(150);
    const updated = await this.updateAppointment(id, {
      status: "Cancelled",
      cancellationReason: reason
    });

    if (updated.caseId) {
      await caseService.addTimelineEvent(updated.caseId, {
        stage: `Appointment Cancelled: ${reason}`,
        actor: "Coordinator"
      });
    }

    return updated;
  }
};
