import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAlert, updateAlert, deleteAlert } from '../redux/slices/alertsSlice';
import AlertsTable from '../components/AlertTables';
import AlertForm from '../components/AlertForm';
import { Button, Box, Alert as MuiAlert } from '@mui/material';

function Alerts({ role }) {
  const alerts = useSelector((state) => state.alerts.alerts);
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [editAlert, setEditAlert] = useState(null);

  const handleAdd = () => {
    setEditAlert(null);
    setFormOpen(true);
  };

  const handleEdit = (alert) => {
    setEditAlert(alert);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      dispatch(deleteAlert(id));
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditAlert(null);
  };

  const handleFormSubmit = (alert) => {
    if (editAlert) {
      dispatch(updateAlert(alert));
    } else {
      dispatch(addAlert(alert));
    }
    setFormOpen(false);
    setEditAlert(null);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>Alerts & Photo Logs</h2>
        {role === 'Admin' && (
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add Alert
          </Button>
        )}
      </Box>
      {role !== 'Admin' && (
        <MuiAlert severity="info" sx={{ mb: 2 }}>
          As a Technician, you can only view alerts and photo logs.
        </MuiAlert>
      )}
      <AlertsTable
        alerts={alerts}
        onEdit={role === 'Admin' ? handleEdit : undefined}
        onDelete={role === 'Admin' ? handleDelete : undefined}
        sx={{ overflowX: 'auto', color: 'inherit' }}
      />
      {role === 'Admin' && (
        <AlertForm
          open={formOpen}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialValues={editAlert}
        />
      )}
    </Box>
  );
}

export default Alerts; 