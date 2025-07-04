import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, FormLabel
} from '@mui/material';

const purposeOptions = ['Preventive', 'Breakdown'];

const defaultValues = {
  id: '',
  deviceId: '',
  date: '',
  engineer: '',
  purpose: 'Preventive',
  notes: '',
  attachment: null,
  attachmentUrl: '',
};

function ServiceVisitForm({ open, onClose, onSubmit, initialValues }) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [filePreview, setFilePreview] = useState('');

  useEffect(() => {
    if (initialValues) {
      setValues({ ...defaultValues, ...initialValues });
      setFilePreview(initialValues.attachmentUrl || '');
    } else {
      setValues(defaultValues);
      setFilePreview('');
    }
    setErrors({});
  }, [open, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValues((prev) => ({ ...prev, attachment: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!values.deviceId) newErrors.deviceId = 'Device ID is required';
    if (!values.date) newErrors.date = 'Date is required';
    if (!values.engineer) newErrors.engineer = 'Engineer is required';
    if (!values.purpose) newErrors.purpose = 'Purpose is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        ...values,
        id: values.id || `VISIT${Date.now()}`,
        attachmentUrl: filePreview,
      };
      onSubmit(data);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialValues ? 'Edit Service Visit' : 'Add Service Visit'}</DialogTitle>
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
            label="Engineer"
            name="engineer"
            value={values.engineer}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.engineer}
            helperText={errors.engineer}
          />
          <TextField
            margin="dense"
            label="Purpose"
            name="purpose"
            value={values.purpose}
            onChange={handleChange}
            select
            fullWidth
            required
            error={!!errors.purpose}
            helperText={errors.purpose}
          >
            {purposeOptions.map((option) => (
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
          <FormLabel component="legend" sx={{ mt: 2 }}>Attachment (Photo or PDF)</FormLabel>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            style={{ marginTop: 8, marginBottom: 8 }}
          />
          {filePreview && (
            <div style={{ marginTop: 8 }}>
              {values.attachment && values.attachment.type === 'application/pdf' ? (
                <a href={filePreview} target="_blank" rel="noopener noreferrer">View PDF</a>
              ) : (
                <img src={filePreview} alt="Attachment Preview" style={{ maxWidth: '100%' }} />
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">{initialValues ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ServiceVisitForm; 