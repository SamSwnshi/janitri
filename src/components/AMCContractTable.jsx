import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'deviceId', label: 'Device ID' },
  { id: 'contractType', label: 'Contract Type' },
  { id: 'startDate', label: 'Start Date' },
  { id: 'endDate', label: 'End Date' },
  { id: 'status', label: 'Status' },
  { id: 'notes', label: 'Notes' },
];

function getRowStyle(status) {
  if (status === 'Expired') return { backgroundColor: '#ffebee' };
  if (status === 'Expiring Soon') return { backgroundColor: '#fffde7' };
  return {};
}

function AMCContractsTable({ contracts, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
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
          {contracts.map((contract) => (
            <TableRow key={contract.id} style={getRowStyle(contract.status)}>
              <TableCell>{contract.deviceId}</TableCell>
              <TableCell>{contract.contractType}</TableCell>
              <TableCell>{contract.startDate}</TableCell>
              <TableCell>{contract.endDate}</TableCell>
              <TableCell>{contract.status}</TableCell>
              <TableCell>{contract.notes}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(contract)} aria-label="edit" size="small">
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton onClick={() => onDelete(contract.id)} aria-label="delete" size="small">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AMCContractsTable; 