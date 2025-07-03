import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  devices: [
    {
      id: "DVC001",
      type: "ECG Monitor",
      facility: "City Hospital",
      status: "Online",
      battery: 85,
      lastService: "2024-05-10",
      amcStatus: "Active",
    },
    {
      id: "DVC002",
      type: "Infusion Pump",
      facility: "Metro Clinic",
      status: "Maintenance",
      battery: 60,
      lastService: "2024-04-22",
      amcStatus: "Expiring Soon",
    },
    {
      id: "DVC003",
      type: "Ventilator",
      facility: "Green Valley Health",
      status: "Offline",
      battery: 0,
      lastService: "2024-03-15",
      amcStatus: "Expired",
    },
  ],
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    addDevice: (state, action) => {
      state.devices.push(action.payload);
    },
    updateDevice: (state, action) => {
      const index = state.devices.findIndex(
        (device) => device.id === action.payload.id
      );
      if (index !== -1) {
        state.devices[index] = action.payload;
      }
    },
    removeDevice: (state, action) => {
      state.devices = state.devices.filter(
        (device) => device.id !== action.payload
      );
    },
  },
});

export const {addDevice,updateDevice,removeDevice} = devicesSlice.actions;
export default devicesSlice.reducer;
