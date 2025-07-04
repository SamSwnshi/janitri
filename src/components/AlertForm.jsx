import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, FormLabel
} from '@mui/material';

const statusOptions = ['Open', 'Resolved'];

const defaultValues = {
  id: '',
  deviceId: '',
  date: '',
  description: '',
  photo: null,
  photoUrl: '',
  status: 'Open',
};

function AlertForm({ open, onClose, onSubmit, initialValues }) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState('');

  useEffect(() => {
    if (initialValues) {
      setValues({ ...defaultValues, ...initialValues });
      setPhotoPreview(initialValues.photoUrl || '');
    } else {
      setValues(defaultValues);
      setPhotoPreview('');
    }
    setErrors({});
  }, [open, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValues((prev) => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!values.deviceId) newErrors.deviceId = 'Device ID is required';
    if (!values.date) newErrors.date = 'Date is required';
    if (!values.description) newErrors.description = 'Description is required';
    if (!values.status) newErrors.status = 'Status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        ...values,
        id: values.id || `ALERT${Date.now()}`,
        photoUrl: photoPreview,
      };
      onSubmit(data);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialValues ? 'Edit Alert' : 'Add Alert'}</DialogTitle>
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
            label="Date"
            name="date"
            value={values.date}
            onChange={handleChange}
            type="date"
            fullWidth
            required
            error={!!errors.date}
            helperText={errors.date}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Issue Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.description}
            helperText={errors.description}
            multiline
            minRows={2}
          />
          <FormLabel component="legend" sx={{ mt: 2 }}>Photo Upload</FormLabel>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ marginTop: 8, marginBottom: 8 }}
          />
          {photoPreview && (
            <img src={photoPreview} alt="Alert Preview" style={{ maxWidth: '100%', marginTop: 8 }} />
          )}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">{initialValues ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AlertForm; 