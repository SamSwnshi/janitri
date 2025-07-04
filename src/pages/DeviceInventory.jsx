import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDevice, updateDevice, removeDevice } from '../redux/slices/devicesSlice';
import DeviceTable from '../components/DeviceTable';
import DeviceForm from '../components/DeviceForm';
import { Button, Box, Alert } from '@mui/material';

function DeviceInventory({ role }) {
  const devices = useSelector((state) => state.devices.devices);
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [editDevice, setEditDevice] = useState(null);

  const handleAdd = (deviceId) => {
    setEditDevice(deviceId ? { id: deviceId } : null);
    setFormOpen(true);
  };

  const handleEdit = (device) => {
    setEditDevice(device);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      dispatch(removeDevice(id));
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditDevice(null);
  };

  const handleFormSubmit = (device) => {
    if (editDevice && editDevice.id && !device.id) {
      device.id = editDevice.id;
    }
    if (editDevice && editDevice.id && device.id !== editDevice.id) {
      device.id = editDevice.id;
    }
    if (editDevice) {
      dispatch(updateDevice(device));
    } else {
      dispatch(addDevice(device));
    }
    setFormOpen(false);
    setEditDevice(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, gap: { xs: 1, sm: 0 } }}>
        <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Device Inventory Dashboard</h2>
        <Box display="flex" gap={2} sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'flex-end', sm: 'flex-start' } }}>
          {role === 'Admin' && (
            <Button variant="contained" color="primary" onClick={() => handleAdd()} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, width: { xs: '100%', sm: 'auto' } }}>
              Add Device
            </Button>
          )}
        </Box>
      </Box>
      {role !== 'Admin' && (
        <Alert severity="info" sx={{ mb: 2 }}>
          As a Technician, you can only view device inventory.
        </Alert>
      )}
      <DeviceTable
        devices={devices}
        onEdit={role === 'Admin' ? handleEdit : undefined}
        onDelete={role === 'Admin' ? handleDelete : undefined}
        sx={{ overflowX: 'auto' }}
      />
      <DeviceForm
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialValues={editDevice}
      />
    </Box>
  );
}

export default DeviceInventory; 