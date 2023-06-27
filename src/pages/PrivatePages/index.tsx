import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";

export default function PrivatePages() {
  return (
    <Box sx={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
    }}>
      <Header />
      <Sidebar />
      <Outlet />
    </Box>
  );
}
