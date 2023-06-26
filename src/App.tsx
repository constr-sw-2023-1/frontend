import './global.css'
import { Box, useTheme } from "@mui/material";
import Routes from "./routes";

export default function App() {
  const { palette: { secondary } } = useTheme()

  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      bgcolor: secondary.main
    }}>
      <Routes />
    </Box>
  )
}
