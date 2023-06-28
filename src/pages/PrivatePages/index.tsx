import Header from "@components/Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ClassesListPage from "@pages/RoomsListPage";

export default function PrivatePages() {
  return (
      <Box sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
      }}>
        <Header />
        <Outlet />
      </Box>
  );
}
