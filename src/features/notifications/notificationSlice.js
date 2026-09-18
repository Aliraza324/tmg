import { createSlice } from "@reduxjs/toolkit";
import { MOCK_NOTIFICATIONS } from "../../data/notifications";

const initialState = {
  notifications: [...MOCK_NOTIFICATIONS]
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const notif = state.notifications.find((n) => n.id === action.payload);
      if (notif) notif.read = true;
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: `notif-${Date.now()}`,
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload
      });
    }
  }
});

export const { markAsRead, markAllAsRead, addNotification } = notificationSlice.actions;
export const selectUnreadCount = (state) =>
  state.notifications.notifications.filter((n) => !n.read).length;

export default notificationSlice.reducer;
