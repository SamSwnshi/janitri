import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: [],
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      state.alerts.push(action.payload);
    },
    updateAlert: (state, action) => {
      const index = state.alerts.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.alerts[index] = action.payload;
      }
    },
    deleteAlert: (state, action) => {
      state.alerts = state.alerts.filter(a => a.id !== action.payload);
    },
    setAlerts: (state, action) => {
      state.alerts = action.payload;
    },
  },
});

export const { addAlert, updateAlert, deleteAlert, setAlerts } = alertsSlice.actions;
export default alertsSlice.reducer; 