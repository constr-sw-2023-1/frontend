import './global.css'
import { Box, useTheme } from "@mui/material";
import Routes from "./routes";

export default function App() {
  const { palette: { background } } = useTheme()

  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      bgcolor: background.default
    }}>
      <Routes />
    </Box>
  )
}
