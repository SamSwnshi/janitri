import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem
} from '@mui/material';

const contractTypes = ['AMC', 'CMC'];
const statusOptions = ['Active', 'Expiring Soon', 'Expired'];

const defaultValues = {
  id: '',
  deviceId: '',
  contractType: 'AMC',
  startDate: '',
  endDate: '',
  status: 'Active',
  notes: '',
};

function AMCContractForm({ open, onClose, onSubmit, initialValues }) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setValues({ ...defaultValues, ...initialValues });
    } else {
      setValues(defaultValues);
    }
    setErrors({});
  }, [open, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.deviceId) newErrors.deviceId = 'Device ID is required';
    if (!values.contractType) newErrors.contractType = 'Contract type is required';
    if (!values.startDate) newErrors.startDate = 'Start date is required';
    if (!values.endDate) newErrors.endDate = 'End date is required';
    if (!values.status) newErrors.status = 'Status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        ...values,
        id: values.id || `CONTRACT${Date.now()}`,
      };
      onSubmit(data);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialValues ? 'Edit Contract' : 'Add Contract'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            label="Device ID"
            name="deviceId"
            value={values.deviceId}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.deviceId}
            helperText={errors.deviceId}
          />
          <TextField
            margin="dense"
            label="Contract Type"
            name="contractType"
            value={values.contractType}
            onChange={handleChange}
            select
            fullWidth
            required
            error={!!errors.contractType}
            helperText={errors.contractType}
          >
            {contractTypes.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Start Date"
            name="startDate"
            value={values.startDate}
            onChange={handleChange}
            type="date"
            fullWidth
            required
            error={!!errors.startDate}
            helperText={errors.startDate}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="End Date"
            name="endDate"
            value={values.endDate}
            onChange={handleChange}
            type="date"
            fullWidth
            required
            error={!!errors.endDate}
            helperText={errors.endDate}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Status"
            name="status"
            value={values.status}
            onChange={handleChange}
            select
            fullWidth
            required
            error={!!errors.status}
            helperText={errors.status}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Notes"
            name="notes"
            value={values.notes}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">{initialValues ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AMCContractForm; 