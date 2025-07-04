import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contracts: [],
};

const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    addContract: (state, action) => {
      state.contracts.push(action.payload);
    },
    updateContract: (state, action) => {
      const index = state.contracts.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.contracts[index] = action.payload;
      }
    },
    deleteContract: (state, action) => {
      state.contracts = state.contracts.filter(c => c.id !== action.payload);
    },
    setContracts: (state, action) => {
      state.contracts = action.payload;
    },
  },
});

export const { addContract, updateContract, deleteContract, setContracts } = contractsSlice.actions;
export default contractsSlice.reducer; 