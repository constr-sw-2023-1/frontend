import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

export default function CoursesListPage() {
  const theme = useTheme()

  return (
    <Box sx={{
      flex: 1
    }}>
      <Box sx={{
        backgroundColor: 'red'
      }}>
        <Typography>{'Courses list'}</Typography>
      </Box>
    </Box>
  );
}
