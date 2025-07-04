import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'deviceId', label: 'Device ID' },
  { id: 'date', label: 'Date' },
  { id: 'engineer', label: 'Engineer' },
  { id: 'purpose', label: 'Purpose' },
  { id: 'notes', label: 'Notes' },
  { id: 'attachment', label: 'Attachment' },
];

function ServiceVisitsTable({ visits, onEdit, onDelete, sx }) {
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
          {visits.map((visit) => (
            <TableRow key={visit.id}>
              <TableCell>{visit.deviceId}</TableCell>
              <TableCell>{visit.date}</TableCell>
              <TableCell>{visit.engineer}</TableCell>
              <TableCell>{visit.purpose}</TableCell>
              <TableCell>{visit.notes}</TableCell>
              <TableCell>
                {visit.attachmentUrl ? (
                  visit.attachmentUrl.startsWith('data:application/pdf') ? (
                    <a href={visit.attachmentUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
                  ) : (
                    <Avatar variant="rounded" src={visit.attachmentUrl} alt="Attachment" sx={{ width: 48, height: 48 }} />
                  )
                ) : null}
              </TableCell>
              <TableCell sx={{ color: 'inherit' }}>
                {onEdit && (
                  <IconButton onClick={() => onEdit(visit)} aria-label="edit" size="small">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                )}
                {onDelete && (
                  <IconButton onClick={() => onDelete(visit.id)} aria-label="delete" size="small">
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

export default ServiceVisitsTable; 