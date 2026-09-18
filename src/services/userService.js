import { storageService } from "./storageService";
import { ROLES } from "../constants/roles";
import { mockDelay } from "./api";

const STORAGE_KEY = "tmg_users";

const DEFAULT_USERS = [
  {
    id: "usr-01",
    name: "Dr. Kyaw Thet",
    email: "superadmin@tmghealthcare.com",
    role: ROLES.SUPER_ADMIN,
    status: "Active",
    createdAt: "2026-01-10"
  },
  {
    id: "usr-02",
    name: "Daw Khin Myat",
    email: "operations.lead@tmghealthcare.com",
    role: ROLES.ADMIN,
    status: "Active",
    createdAt: "2026-02-15"
  },
  {
    id: "usr-03",
    name: "Thura Aung",
    email: "thura.aung@tmghealthcare.com",
    role: ROLES.COORDINATOR,
    status: "Active",
    createdAt: "2026-03-01"
  },
  {
    id: "usr-04",
    name: "Su Myat Noe",
    email: "su.myatnoe@tmghealthcare.com",
    role: ROLES.COORDINATOR,
    status: "Active",
    createdAt: "2026-03-15"
  }
];

function getStoredUsers() {
  return storageService.get(STORAGE_KEY, DEFAULT_USERS);
}

function saveStoredUsers(users) {
  storageService.set(STORAGE_KEY, users);
}

export const userService = {
  async getUsers() {
    await mockDelay(100);
    return getStoredUsers();
  },

  async createUser(userData) {
    await mockDelay(150);
    const users = getStoredUsers();
    const newUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0],
      ...userData
    };
    users.unshift(newUser);
    saveStoredUsers(users);
    return newUser;
  },

  async updateUser(id, updates) {
    await mockDelay(150);
    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error("User not found");

    const updated = {
      ...users[idx],
      ...updates
    };
    users[idx] = updated;
    saveStoredUsers(users);
    return updated;
  },

  async toggleUserStatus(id) {
    await mockDelay(100);
    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error("User not found");

    const currentStatus = users[idx].status || "Active";
    users[idx].status = currentStatus === "Active" ? "Inactive" : "Active";
    saveStoredUsers(users);
    return users[idx];
  }
};
