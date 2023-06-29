import Header from "@components/Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function PrivatePages() {
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'row'
    }}>
      <Box sx={{
        width: '20%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
      </Box>
      <Box sx={{
        width: '80%',
        height: '100%',
      }}>
        <Box sx={{
          width: '100%',
          height: '10%',
        }}>
          <Header />
        </Box>
        <Box sx={{
          width: '100%',
          height: '90%',
          pt: '1rem',
          px: '0.75rem',
        }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
