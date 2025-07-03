import { Box } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addDevice, updateDevice, removeDevice } from '../redux/slices/devicesSlice';
import DeviceTable from '../components/DeviceTable'
import DeviceForm from '../components/DeviceForm'

const DeviceInventory = () => {
    const devices = useSelector((state) => state.devices.devices);
  const dispatch = useDispatch();
  return (
    <Box>
        <h2>Device Inventory Dashboard</h2>
        <DeviceTable  devices={devices}/>
        <DeviceForm/>
    </Box>
  )
}

export default DeviceInventory
