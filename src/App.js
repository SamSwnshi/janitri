import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";
import Alerts from "./pages/Alerts";
import DeviceInventory from "./pages/DeviceInventory";
import AMCTracker from "./pages/AMCTracker";
import Installation from "./pages/Installations";
import ServiceLogs from "./pages/ServiceLogs";

const ROLES = ['Admin','Technician']
function App() {
  return (
    <>
    <CssBaseline/>
      <Router>
        <Box sx={{ display: "flex" }}>
          <Drawer
            variant="permanent"
            sx={{
              width: 220,
              [`& .MuiDrawer-paper`]: {
                width: 220,
                boxSizing: "border-box",
                alignItems: "center",
              },
            }}
          >
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
            <AppBar position="fixed">
              <Toolbar>
                <Typography>
                  CRM + Inventory Management
                </Typography>
              </Toolbar>
            </AppBar>
            <Routes>
              <Route path="/" element={<DeviceInventory />} />
              <Route path="/installation" element={<Installation />} />
              <Route path="/service-logs" element={<ServiceLogs />} />
              <Route path="/amc-tracker" element={<AMCTracker />} />
              <Route path="/alert" element={<Alerts />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </>
  );
}

export default App;
