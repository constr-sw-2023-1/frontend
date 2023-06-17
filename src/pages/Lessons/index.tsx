import { Box, Typography } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LessonItem from "./components/LessonsItem";
import { useState } from "react";

export interface Lesson {
  name: string;
  data: string;
  room: string;
}

const mockLessons: Lesson[] = [
  {
    name: "Construção de software",
    data: "18/06/2023 18:15:15",
    room: "317",
  },
  {
    name: "AGES 1",
    data: "14/06/2023 18:15:15",
    room: "201",
  },
  {
    name: "Biblioteca de Componentes",
    data: "13/06/2023",
    room: "515",
  },
  {
    name: "Segurança de sistemas",
    data: "12/06/2023 18:15:15",
    room: "217",
  },
];

export default function Lessons() {
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "primary.main",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: "0.15rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <MenuBookIcon
          sx={{ color: "#E78901", width: "40px", height: "40px" }}
        />
        <Typography variant="h4" fontWeight={500}>
          Aulas
        </Typography>
      </Box>
      <Typography
        sx={{
          color: "#5D707F",
          fontWeight: 500,
          fontSize: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        Lista de aulas
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0.15rem",
          alignItems: "center",
        }}
      >
        {lessons.map((lesson) => (
          <LessonItem data={lesson} />
        ))}
      </Box>
    </Box>
  );
}
