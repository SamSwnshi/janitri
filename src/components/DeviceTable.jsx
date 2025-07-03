import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const columns = [
    { id: 'type', label: 'Type' },
  { id: 'id', label: 'ID' },
  { id: 'facility', label: 'Facility' },
  { id: 'status', label: 'Status' },
  { id: 'battery', label: 'Battery %' },
  { id: 'lastService', label: 'Last Service' },
  { id: 'amcStatus', label: 'AMC/CMC Status' },
]
const DeviceTable = ({ devices, onEdit, onDelete }) => {
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
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.type}</TableCell>
              <TableCell>{device.id}</TableCell>
              <TableCell>{device.facility}</TableCell>
              <TableCell>{device.status}</TableCell>
              <TableCell>{device.battery}</TableCell>
              <TableCell>{device.lastService}</TableCell>
              <TableCell>{device.amcStatus}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(device)} aria-label="edit" size="small">
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton onClick={() => onDelete(device.id)} aria-label="delete" size="small">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DeviceTable
