import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'deviceId', label: 'Device ID' },
  { id: 'facility', label: 'Facility' },
  { id: 'installationDate', label: 'Installation Date' },
  { id: 'engineer', label: 'Engineer' },
  { id: 'checklist', label: 'Checklist' },
  { id: 'trainingCompleted', label: 'Training Completed' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'photo', label: 'Photo' },
];

function InstallationsTable({ installations, onEdit, onDelete, sx }) {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto', ...sx }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id}>{col.label}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {installations.map((inst) => (
            <TableRow key={inst.id}>
              <TableCell>{inst.deviceId}</TableCell>
              <TableCell>{inst.facility}</TableCell>
              <TableCell>{inst.installationDate}</TableCell>
              <TableCell>{inst.engineer}</TableCell>
              <TableCell>{inst.checklist ? inst.checklist.join(', ') : ''}</TableCell>
              <TableCell>{inst.trainingCompleted === 'yes' ? 'Yes' : 'No'}</TableCell>
              <TableCell>{inst.feedback}</TableCell>
              <TableCell>
                {inst.photoUrl ? (
                  <Avatar variant="rounded" src={inst.photoUrl} alt="Unboxing" sx={{ width: 48, height: 48 }} />
                ) : null}
              </TableCell>
              <TableCell sx={{ color: 'inherit' }}>
                {onEdit && (
                  <IconButton onClick={() => onEdit(inst)} aria-label="edit" size="small">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                )}
                {onDelete && (
                  <IconButton onClick={() => onDelete(inst.id)} aria-label="delete" size="small">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InstallationsTable; 