import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addInstallation, updateInstallation, deleteInstallation } from '../redux/slices/installationsSlice';
import InstallationsTable from '../components/InstallationTable';
import InstallationForm from '../components/InstallationForm';
import { Button, Box, Alert } from '@mui/material';

function Installations({ role }) {
  const installations = useSelector((state) => state.installations.installations);
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [editInstallation, setEditInstallation] = useState(null);

  const handleAdd = () => {
    setEditInstallation(null);
    setFormOpen(true);
  };

  const handleEdit = (installation) => {
    setEditInstallation(installation);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this installation log?')) {
      dispatch(deleteInstallation(id));
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditInstallation(null);
  };

  const handleFormSubmit = (installation) => {
    if (editInstallation) {
      dispatch(updateInstallation(installation));
    } else {
      dispatch(addInstallation(installation));
    }
    setFormOpen(false);
    setEditInstallation(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, gap: { xs: 1, sm: 0 } }}>
        <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Installations & Training Module</h2>
        {role === 'Admin' && (
          <Button variant="contained" color="primary" onClick={handleAdd} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, width: { xs: '100%', sm: 'auto' } }}>
            Add Installation
          </Button>
        )}
      </Box>
      {role !== 'Admin' && (
        <Alert severity="info" sx={{ mb: 2 }}>
          As a Technician, you can only view installation and training logs.
        </Alert>
      )}
      <InstallationsTable
        installations={installations}
        onEdit={role === 'Admin' ? handleEdit : undefined}
        onDelete={role === 'Admin' ? handleDelete : undefined}
        sx={{ overflowX: 'auto' }}
      />
      {role === 'Admin' && (
        <InstallationForm
          open={formOpen}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialValues={editInstallation}
        />
      )}
    </Box>
  );
}

export default Installations; 