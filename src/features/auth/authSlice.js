import { createSlice } from "@reduxjs/toolkit";
import { ROLES } from "../../constants/roles";
import { storageService } from "../../services/storageService";

const STORAGE_KEY = "tmg_auth_user";

const DEFAULT_USER = {
  id: "user-01",
  name: "Thura Aung",
  email: "thura.aung@tmghealthcare.com",
  phone: "+66 82 491 5821",
  role: ROLES.SUPER_ADMIN, // Default to Super Admin for full prototype review
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
};

const savedUser = storageService.get(STORAGE_KEY, DEFAULT_USER);

const initialState = {
  user: savedUser,
  isAuthenticated: true
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload;
        storageService.set(STORAGE_KEY, state.user);
      }
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload
        };
        storageService.set(STORAGE_KEY, state.user);
      }
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      storageService.set(STORAGE_KEY, state.user);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      storageService.remove(STORAGE_KEY);
    }
  }
});

export const { setRole, updateProfile, login, logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectUserRole = (state) => state.auth.user?.role || ROLES.COORDINATOR;

export default authSlice.reducer;
