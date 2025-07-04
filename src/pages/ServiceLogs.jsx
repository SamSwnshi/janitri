import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVisit, updateVisit, deleteVisit } from '../redux/slices/visitsSlice';
import ServiceVisitsTable from '../components/ServiceVisitTable';
import ServiceVisitForm from '../components/ServiceVisitForm';
import { Button, Box, Alert } from '@mui/material';

function ServiceLogs({ role }) {
  const visits = useSelector((state) => state.visits.visits);
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [editVisit, setEditVisit] = useState(null);

  const handleAdd = () => {
    setEditVisit(null);
    setFormOpen(true);
  };

  const handleEdit = (visit) => {
    setEditVisit(visit);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service visit log?')) {
      dispatch(deleteVisit(id));
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditVisit(null);
  };

  const handleFormSubmit = (visit) => {
    if (editVisit) {
      dispatch(updateVisit(visit));
    } else {
      dispatch(addVisit(visit));
    }
    setFormOpen(false);
    setEditVisit(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, gap: { xs: 1, sm: 0 } }}>
        <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Service Visit Logs</h2>
        {role === 'Admin' && (
          <Button variant="contained" color="primary" onClick={handleAdd} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, width: { xs: '100%', sm: 'auto' } }}>
            Add Service Visit
          </Button>
        )}
      </Box>
      {role !== 'Admin' && (
        <Alert severity="info" sx={{ mb: 2 }}>
          As a Technician, you can only view service visit logs.
        </Alert>
      )}
      <ServiceVisitsTable
        visits={visits}
        onEdit={role === 'Admin' ? handleEdit : undefined}
        onDelete={role === 'Admin' ? handleDelete : undefined}
        sx={{ overflowX: 'auto' }}
      />
      {role === 'Admin' && (
        <ServiceVisitForm
          open={formOpen}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialValues={editVisit}
        />
      )}
    </Box>
  );
}

export default ServiceLogs; 