import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CssBaseline, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Box, Select, MenuItem, IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DeviceInventory from './pages/DeviceInventory';
import Installations from './pages/Installations';
import ServiceLogs from './pages/ServiceLogs';
import AMCTracker from './pages/AMCTracker';
import Alerts from './pages/Alerts';
import './App.css';

const ROLES = ['Admin', 'Technician'];

function App() {
  const [role, setRole] = useState(() => localStorage.getItem('userRole') || 'Admin');
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('themeMode') || 'light');

  useEffect(() => {
    localStorage.setItem('userRole', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: themeMode,
    },
  }), [themeMode]);

  const handleThemeToggle = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Drawer variant="permanent" sx={{ width: 220, [`& .MuiDrawer-paper`]: { width: 220, boxSizing: 'border-box' } }}>
            <Toolbar />
            <List>
              <ListItem button component={Link} to="/">
                <ListItemText primary="Device Inventory" />
              </ListItem>
              <ListItem button component={Link} to="/installations">
                <ListItemText primary="Installations & Training" />
              </ListItem>
              <ListItem button component={Link} to="/service-logs">
                <ListItemText primary="Service Visit Logs" />
              </ListItem>
              <ListItem button component={Link} to="/amc-tracker">
                <ListItemText primary="AMC/CMC Tracker" />
              </ListItem>
              <ListItem button component={Link} to="/alerts">
                <ListItemText primary="Alerts & Photo Logs" />
              </ListItem>
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" noWrap component="div">
                  Device CRM + Inventory Management
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Tooltip title={themeMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
                    <IconButton color="inherit" onClick={handleThemeToggle}>
                      {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButton>
                  </Tooltip>
                  <Select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    size="small"
                    sx={{ color: 'white', borderColor: 'white', minWidth: 120, background: 'rgba(255,255,255,0.1)' }}
                  >
                    {ROLES.map(r => (
                      <MenuItem key={r} value={r}>{r}</MenuItem>
                    ))}
                  </Select>
                </Box>
              </Toolbar>
            </AppBar>
            <Toolbar />
            <Routes>
              <Route path="/" element={<DeviceInventory role={role} />} />
              <Route path="/installations" element={<Installations role={role} />} />
              <Route path="/service-logs" element={<ServiceLogs role={role} />} />
              <Route path="/amc-tracker" element={<AMCTracker role={role} />} />
              <Route path="/alerts" element={<Alerts role={role} />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
