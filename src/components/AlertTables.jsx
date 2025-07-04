import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'deviceId', label: 'Device ID' },
  { id: 'date', label: 'Date' },
  { id: 'description', label: 'Description' },
  { id: 'photo', label: 'Photo' },
  { id: 'status', label: 'Status' },
];

function getRowStyle(status) {
  if (status === 'Open') return { backgroundColor: '#fffde7' };
  return {};
}

function AlertsTable({ alerts, onEdit, onDelete, sx }) {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto', ...sx }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id} sx={{ color: 'inherit' }}>{col.label}</TableCell>
            ))}
            <TableCell sx={{ color: 'inherit' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.id} style={getRowStyle(alert.status)}>
              <TableCell sx={{ color: 'inherit' }}>{alert.deviceId}</TableCell>
              <TableCell sx={{ color: 'inherit' }}>{alert.date}</TableCell>
              <TableCell sx={{ color: 'inherit' }}>{alert.description}</TableCell>
              <TableCell sx={{ color: 'inherit' }}>
                {alert.photoUrl ? (
                  <Avatar variant="rounded" src={alert.photoUrl} alt="Alert Photo" sx={{ width: 48, height: 48 }} />
                ) : null}
              </TableCell>
              <TableCell sx={{ color: 'inherit' }}>{alert.status}</TableCell>
              <TableCell sx={{ color: 'inherit' }}>
                {onEdit && (
                  <IconButton onClick={() => onEdit(alert)} aria-label="edit" size="small">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                )}
                {onDelete && (
                  <IconButton onClick={() => onDelete(alert.id)} aria-label="delete" size="small">
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

export default AlertsTable; 