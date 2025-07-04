import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import DeviceInventory from "./pages/DeviceInventory";
import Installations from "./pages/Installations";
import ServiceLogs from "./pages/ServiceLogs";
import AMCTracker from "./pages/AMCTracker";
import Alerts from "./pages/Alerts";
import "./App.css";

const ROLES = ["Admin", "Technician"];

function App() {
  const [role, setRole] = useState(
    () => localStorage.getItem("userRole") || "Admin"
  );
  const [themeMode, setThemeMode] = useState(
    () => localStorage.getItem("themeMode") || "light"
  );

  useEffect(() => {
    localStorage.setItem("userRole", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleThemeToggle = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const drawerContent = (
    <>
      <Toolbar />
      <List
        sx={{
          color: (theme) => (theme.palette.mode === "dark" ? "#fff" : "#111"),
        }}
      >
        <ListItem
          button
          component={Link}
          to="/"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover, &:hover": {
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#111",
            },
          }}
        >
          <ListItemText
            primary="Device Inventory"
            primaryTypographyProps={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#111",
            }}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/installations"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover, &:hover": {
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#111",
            },
          }}
        >
          <ListItemText
            primary="Installations & Training"
            primaryTypographyProps={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#111",
            }}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/service-logs"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover, &:hover": {
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#111",
            },
          }}
        >
          <ListItemText
            primary="Service Visit Logs"
            primaryTypographyProps={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#111",
            }}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/amc-tracker"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover, &:hover": {
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#111",
            },
          }}
        >
          <ListItemText
            primary="AMC/CMC Tracker"
            primaryTypographyProps={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#111",
            }}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/alerts"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover, &:hover": {
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#111",
            },
          }}
        >
          <ListItemText
            primary="Alerts & Photo Logs"
            primaryTypographyProps={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#111",
            }}
          />
        </ListItem>
      </List>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: { xs: 1, sm: 2 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {isMobile && (
                  <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" } }}
                  >
                    <span className="material-icons">menu</span>
                  </IconButton>
                )}
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Device CRM + Inventory Management
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Tooltip
                  title={
                    themeMode === "light"
                      ? "Switch to dark mode"
                      : "Switch to light mode"
                  }
                >
                  <IconButton color="inherit" onClick={handleThemeToggle}>
                    {themeMode === "light" ? (
                      <Brightness4Icon />
                    ) : (
                      <Brightness7Icon />
                    )}
                  </IconButton>
                </Tooltip>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  size="small"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    minWidth: 100,
                    background: "rgba(255,255,255,0.1)",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                  }}
                >
                  {ROLES.map((r) => (
                    <MenuItem key={r} value={r}>
                      {r}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
            <Box
              component="nav"
              sx={{ width: { sm: 220 }, flexShrink: { sm: 0 } }}
              aria-label="navigation"
            >
              <Drawer
                variant="temporary"
                open={isMobile && mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: 220,
                    bgcolor: "background.default",
                  },
                }}
              >
                {drawerContent}
              </Drawer>

              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: 220,
                    bgcolor: "background.default",
                  },
                }}
                open
              >
                {drawerContent}
              </Drawer>
            </Box>

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: { xs: 1, sm: 3 },
                width: "100%",
                minWidth: 0,
              }}
            >
              <Routes>
                <Route path="/" element={<DeviceInventory role={role} />} />
                <Route
                  path="/installations"
                  element={<Installations role={role} />}
                />
                <Route
                  path="/service-logs"
                  element={<ServiceLogs role={role} />}
                />
                <Route
                  path="/amc-tracker"
                  element={<AMCTracker role={role} />}
                />
                <Route path="/alerts" element={<Alerts role={role} />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
