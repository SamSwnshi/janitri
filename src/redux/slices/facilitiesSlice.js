import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  facilities: [],
};

const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState,
  reducers: {
    addFacility: (state, action) => {
      state.facilities.push(action.payload);
    },
    updateFacility: (state, action) => {
      const index = state.facilities.findIndex(f => f.id === action.payload.id);
      if (index !== -1) {
        state.facilities[index] = action.payload;
      }
    },
    deleteFacility: (state, action) => {
      state.facilities = state.facilities.filter(f => f.id !== action.payload);
    },
    setFacilities: (state, action) => {
      state.facilities = action.payload;
    },
  },
});

export const { addFacility, updateFacility, deleteFacility, setFacilities } = facilitiesSlice.actions;
export default facilitiesSlice.reducer; 