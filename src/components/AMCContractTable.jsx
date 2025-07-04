import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

const columns = [
  { id: 'deviceId', label: 'Device ID' },
  { id: 'contractType', label: 'Contract Type' },
  { id: 'startDate', label: 'Start Date' },
  { id: 'endDate', label: 'End Date' },
  { id: 'status', label: 'Status' },
  { id: 'notes', label: 'Notes' },
];

function getRowStyle(status, theme) {
  if (status === 'Expired') {
    return { backgroundColor: theme.palette.mode === 'dark' ? '#3a2323' : '#ffebee' };
  }
  if (status === 'Expiring Soon') {
    return { backgroundColor: theme.palette.mode === 'dark' ? '#33331a' : '#fffde7' };
  }
  return {};
}

function AMCContractsTable({ contracts, onEdit, onDelete, sx }) {
  const theme = useTheme();
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
          {contracts.map((contract) => (
            <TableRow key={contract.id} style={getRowStyle(contract.status, theme)}>
              <TableCell sx={{ color: 'inherit' }}>{contract.deviceId}</TableCell>
              <TableCell sx={{ color: 'inherit' }}>{contract.contractType}</TableCell>
              <TableCell sx={{ color: 'inherit' }}>{contract.startDate}</TableCell>
              <TableCell sx={{ color: 'inherit' }}>{contract.endDate}</TableCell>
              <TableCell sx={{ color: 'inherit' }}>{contract.status}</TableCell>
              <TableCell sx={{ color: 'inherit' }}>{contract.notes}</TableCell>
              <TableCell sx={{ color: 'inherit' }}>
                {onEdit && (
                  <IconButton onClick={() => onEdit(contract)} aria-label="edit" size="small">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                )}
                {onDelete && (
                  <IconButton onClick={() => onDelete(contract.id)} aria-label="delete" size="small">
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

export default AMCContractsTable; 