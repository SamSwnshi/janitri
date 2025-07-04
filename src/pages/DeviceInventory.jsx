import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDevice, updateDevice, removeDevice } from '../redux/slices/devicesSlice';
import DeviceTable from '../components/DeviceTable';
import DeviceForm from '../components/DeviceForm';
import { Button, Box, Alert, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { QrReader } from 'react-qr-reader';

function DeviceInventory({ role }) {
  const devices = useSelector((state) => state.devices.devices);
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [editDevice, setEditDevice] = useState(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [scannedDeviceId, setScannedDeviceId] = useState('');

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
    setScannedDeviceId('');
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
    setScannedDeviceId('');
  };

  const handleScanQR = () => {
    setQrDialogOpen(true);
  };

  const handleQRResult = (result, error) => {
    if (!!result) {
      setQrDialogOpen(false);
      setScannedDeviceId(result?.text || '');
      setTimeout(() => handleAdd(result?.text || ''), 300);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>Device Inventory Dashboard</h2>
        <Box display="flex" gap={2}>
          {role === 'Admin' && (
            <Button variant="contained" color="primary" onClick={() => handleAdd()}>
              Add Device
            </Button>
          )}
          <IconButton color="primary" onClick={handleScanQR} title="Scan Device QR Code">
            <QrCodeScannerIcon />
          </IconButton>
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
      />
      <DeviceForm
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialValues={editDevice}
        scannedDeviceId={scannedDeviceId}
      />
      <Dialog open={qrDialogOpen} onClose={() => setQrDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Scan Device QR Code</DialogTitle>
        <DialogContent>
          <QrReader
            constraints={{ facingMode: 'environment' }}
            onResult={handleQRResult}
            style={{ width: '100%' }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default DeviceInventory; 