# Inventory Management

A modern, responsive web application for managing medical device inventory, installations, service logs, AMC/CMC contracts, and alerts. Built with React, Redux, and Material UI.

## Features

- **Device Inventory:** Track all devices, their status, battery, last service, and AMC/CMC status.
- **Installations & Training:** Log device installations, training, and feedback with photo support.
- **Service Visit Logs:** Record service visits, engineer notes, and attachments.
- **AMC/CMC Tracker:** Manage contracts, track expiry, and update contract details.
- **Alerts & Photo Logs:** Log device alerts and upload related photos.
- **Role-based Access:** Admins can add/edit/delete; Technicians have view-only access.
- **Responsive Design:** Works seamlessly on desktop and mobile, with a sidebar navigation and dark/light theme toggle.

## Tech Stack

- **Frontend:** React 19, Redux Toolkit, React Router
- **UI:** Material UI (MUI v7)
- **State Management:** Redux Toolkit
- **Styling:** CSS, Material UI sx props

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd jagriti
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Use the sidebar to navigate between modules.
- Switch between Admin and Technician roles using the dropdown in the AppBar.
- Toggle dark/light mode using the icon in the AppBar.
- On mobile, use the hamburger menu to open/close the sidebar.

## Folder Structure
```
jagriti/
  src/
    components/      # Reusable UI components (tables, forms)
    pages/           # Main app pages (DeviceInventory, Installations, etc.)
    redux/           # Redux slices and store
    App.js           # Main app layout and routing
    index.js         # Entry point
```

## Customization
- Update the logo in `public/logo192.png`.
- Adjust theme and colors in `src/App.js`.

## License
This project is for demonstration/educational purposes.
