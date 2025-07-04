import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContract, updateContract, deleteContract } from '../redux/slices/contractsSlice';
import AMCContractsTable from '../components/AMCContractTable';
import AMCContractForm from '../components/AMCContractForm';
import { Button, Box, Alert } from '@mui/material';

function exportToCSV(contracts) {
  const headers = ['Device ID', 'Contract Type', 'Start Date', 'End Date', 'Status', 'Notes'];
  const rows = contracts.map(c => [c.deviceId, c.contractType, c.startDate, c.endDate, c.status, c.notes]);
  let csvContent = '';
  csvContent += headers.join(',') + '\n';
  rows.forEach(row => {
    csvContent += row.map(val => '"' + (val || '') + '"').join(',') + '\n';
  });
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'amc_cmc_contracts.csv';
  a.click();
  URL.revokeObjectURL(url);
}

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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>AMC/CMC Tracker</h2>
        <Box>
          {role === 'Admin' && (
            <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mr: 2 }}>
              Add Contract
            </Button>
          )}
          <Button variant="outlined" color="secondary" onClick={() => exportToCSV(contracts)}>
            Export to CSV
          </Button>
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