import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';

const statusOptions = ['Online', 'Offline', 'Maintenance'];
const amcOptions = ['Active', 'Expiring Soon', 'Expired'];

const defaultValues = {
  id: '',
  type: '',
  facility: '',
  status: 'Online',
  battery: '',
  lastService: '',
  amcStatus: 'Active',
};

function DeviceForm({ open, onClose, onSubmit, initialValues, scannedDeviceId }) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setValues({ ...defaultValues, ...initialValues });
    } else if (scannedDeviceId) {
      setValues({ ...defaultValues, id: scannedDeviceId });
    } else {
      setValues(defaultValues);
    }
    setErrors({});
  }, [open, initialValues, scannedDeviceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.id) newErrors.id = 'ID is required';
    if (!values.type) newErrors.type = 'Type is required';
    if (!values.facility) newErrors.facility = 'Facility is required';
    if (values.battery === '' || isNaN(values.battery) || values.battery < 0 || values.battery > 100) newErrors.battery = 'Battery % must be 0-100';
    if (!values.lastService) newErrors.lastService = 'Last Service date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(values);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialValues ? 'Edit Device' : 'Add Device'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            label="Device ID"
            name="id"
            value={values.id}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.id}
            helperText={errors.id}
            disabled={!!initialValues}
          />
          <TextField
            margin="dense"
            label="Type"
            name="type"
            value={values.type}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.type}
            helperText={errors.type}
          />
          <TextField
            margin="dense"
            label="Facility"
            name="facility"
            value={values.facility}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.facility}
            helperText={errors.facility}
          />
          <TextField
            margin="dense"
            label="Status"
            name="status"
            value={values.status}
            onChange={handleChange}
            select
            fullWidth
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Battery %"
            name="battery"
            value={values.battery}
            onChange={handleChange}
            type="number"
            fullWidth
            required
            error={!!errors.battery}
            helperText={errors.battery}
          />
          <TextField
            margin="dense"
            label="Last Service"
            name="lastService"
            value={values.lastService}
            onChange={handleChange}
            type="date"
            fullWidth
            required
            error={!!errors.lastService}
            helperText={errors.lastService}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="AMC/CMC Status"
            name="amcStatus"
            value={values.amcStatus}
            onChange={handleChange}
            select
            fullWidth
          >
            {amcOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">{initialValues ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default DeviceForm; 