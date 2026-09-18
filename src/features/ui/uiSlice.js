import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en", // 'en' or 'my'
  isSidebarOpen: false,
  toasts: []
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    addToast: (state, action) => {
      const id = Date.now().toString();
      state.toasts.push({
        id,
        type: action.payload.type || "success",
        title: action.payload.title,
        message: action.payload.message
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    }
  }
});

export const { setLanguage, toggleSidebar, setSidebarOpen, addToast, removeToast } = uiSlice.actions;
export default uiSlice.reducer;
