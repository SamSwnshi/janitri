import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    installations: []
}

const installationsSlice = createSlice({
  name: 'installations',
  initialState,
  reducers: {
    addInstallation: (state, action) => {
      state.installations.push(action.payload);
    },
    updateInstallation: (state, action) => {
      const index = state.installations.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.installations[index] = action.payload;
      }
    },
    deleteInstallation: (state, action) => {
      state.installations = state.installations.filter(i => i.id !== action.payload);
    },
    setInstallations: (state, action) => {
      state.installations = action.payload;
    },
  },
});

export const { addInstallation, updateInstallation, deleteInstallation, setInstallations } = installationsSlice.actions;
export default installationsSlice.reducer; 