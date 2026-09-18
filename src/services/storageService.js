/**
 * Centralized LocalStorage Persistence Service
 * Hides browser persistence mechanics from domain services.
 */

export const storageService = {
  get(key, defaultValue = []) {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        if (defaultValue !== undefined) {
          this.set(key, defaultValue);
        }
        return defaultValue;
      }
      return JSON.parse(item);
    } catch (err) {
      console.warn(`Error reading localStorage key "${key}":`, err);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`Error writing localStorage key "${key}":`, err);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.warn(`Error removing localStorage key "${key}":`, err);
    }
  },

  clearAllTmgData() {
    const keys = [
      "tmg_cases",
      "tmg_patients",
      "tmg_hospitals",
      "tmg_specialties",
      "tmg_appointments",
      "tmg_follow_ups",
      "tmg_documents",
      "tmg_coordinators",
      "tmg_users",
      "tmg_settings"
    ];
    keys.forEach((k) => localStorage.removeItem(k));
  }
};
