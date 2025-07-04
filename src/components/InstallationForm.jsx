import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,  Checkbox, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup
} from '@mui/material';

const checklistItems = [
  'Device powered on',
  'Accessories checked',
  'Initial test passed',
];

const defaultValues = {
  id: '',
  deviceId: '',
  facility: '',
  installationDate: '',
  engineer: '',
  checklist: [],
  trainingCompleted: 'no',
  feedback: '',
  photo: null,
  photoUrl: '',
};

function InstallationForm({ open, onClose, onSubmit, initialValues }) {
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

  const handleChecklistChange = (item) => {
    setValues((prev) => {
      const checked = prev.checklist.includes(item);
      return {
        ...prev,
        checklist: checked
          ? prev.checklist.filter((i) => i !== item)
          : [...prev.checklist, item],
      };
    });
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
    if (!values.facility) newErrors.facility = 'Facility is required';
    if (!values.installationDate) newErrors.installationDate = 'Installation date is required';
    if (!values.engineer) newErrors.engineer = 'Engineer is required';
    if (values.checklist.length !== checklistItems.length) newErrors.checklist = 'All checklist items must be completed';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        ...values,
        id: values.id || `INST${Date.now()}`,
        photoUrl: photoPreview,
      };
      onSubmit(data);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialValues ? 'Edit Installation' : 'Add Installation'}</DialogTitle>
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
            label="Installation Date"
            name="installationDate"
            value={values.installationDate}
            onChange={handleChange}
            type="date"
            fullWidth
            required
            error={!!errors.installationDate}
            helperText={errors.installationDate}
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
          <FormLabel component="legend" sx={{ mt: 2 }}>Checklist</FormLabel>
          <FormGroup row>
            {checklistItems.map((item) => (
              <FormControlLabel
                key={item}
                control={
                  <Checkbox
                    checked={values.checklist.includes(item)}
                    onChange={() => handleChecklistChange(item)}
                  />
                }
                label={item}
              />
            ))}
          </FormGroup>
          {errors.checklist && <div style={{ color: 'red', fontSize: 12 }}>{errors.checklist}</div>}
          <FormLabel component="legend" sx={{ mt: 2 }}>Training Completed</FormLabel>
          <RadioGroup
            row
            name="trainingCompleted"
            value={values.trainingCompleted}
            onChange={handleChange}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          <TextField
            margin="dense"
            label="Feedback"
            name="feedback"
            value={values.feedback}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={2}
          />
          <FormLabel component="legend" sx={{ mt: 2 }}>Unboxing Photo</FormLabel>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ marginTop: 8, marginBottom: 8 }}
          />
          {photoPreview && (
            <img src={photoPreview} alt="Unboxing Preview" style={{ maxWidth: '100%', marginTop: 8 }} />
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

export default InstallationForm; 