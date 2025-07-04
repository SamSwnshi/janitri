import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContract, updateContract, deleteContract } from '../redux/slices/contractsSlice';
import AMCContractsTable from '../components/AMCContractTable';
import AMCContractForm from '../components/AMCContractForm';
import { Button, Box, Alert } from '@mui/material';

function AMCTracker({ role }) {
  const contracts = useSelector((state) => state.contracts.contracts);
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [editContract, setEditContract] = useState(null);

  const handleAdd = () => {
    setEditContract(null);
    setFormOpen(true);
  };

  const handleEdit = (contract) => {
    setEditContract(contract);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      dispatch(deleteContract(id));
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditContract(null);
  };

  const handleFormSubmit = (contract) => {
    if (editContract) {
      dispatch(updateContract(contract));
    } else {
      dispatch(addContract(contract));
    }
    setFormOpen(false);
    setEditContract(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, gap: { xs: 1, sm: 0 } }}>
        <h2 style={{ fontSize: '1.2rem', margin: 0 }}>AMC/CMC Tracker</h2>
        <Box>
          {role === 'Admin' && (
            <Button variant="contained" color="primary" onClick={handleAdd} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, width: { xs: '100%', sm: 'auto' }, mb: { xs: 1, sm: 0 } }}>
              Add Contract
            </Button>
          )}
        </Box>
      </Box>
      {role !== 'Admin' && (
        <Alert severity="info" sx={{ mb: 2 }}>
          As a Technician, you can only view and export contracts.
        </Alert>
      )}
      <AMCContractsTable
        contracts={contracts}
        onEdit={role === 'Admin' ? handleEdit : undefined}
        onDelete={role === 'Admin' ? handleDelete : undefined}
        sx={{ overflowX: 'auto', color: 'inherit' }}
      />
      {role === 'Admin' && (
        <AMCContractForm
          open={formOpen}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialValues={editContract}
        />
      )}
    </Box>
  );
}

export default AMCTracker; 