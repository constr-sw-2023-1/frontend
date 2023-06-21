import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Subject } from "../model/subject";

interface LessonItemProps {
  data: Subject;
}

export default function LessonItem({ data }: LessonItemProps) {
  return (
    <Box
      sx={{
        width: "70%",
        height: "100%",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: "0.2rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#FFFFFF",
          padding: "0.25rem 1rem",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem" }}>{data.name}</Typography>
        <Typography sx={{ color: "#5D707F", fontSize: "1.25rem" }}>
          Data: {data.lesson.datetime}
        </Typography>
        <Typography sx={{ color: "#5D707F", fontSize: "1.25rem" }}>
          Sala de aula: {data.lesson.classroom}
        </Typography>
      </Box>
      <EditIcon />
      <DeleteIcon sx={{ color: "red", marginRight: "1rem" }} />
    </Box>
  );
}
