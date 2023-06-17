import { Box, Typography, IconButton } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const mockLessons = [
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
  const [lessons, setLessons] = useState(mockLessons);

  const handleEdit = () => {
    // Lógica para manipular o clique no botão de edição
    console.log("Botão de edição clicado");
  };

  const handleDelete = () => {
    // Lógica para manipular o clique no botão de exclusão
    console.log("Botão de exclusão clicado");
  };

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
      {lessons.map((lesson) => (
        <Box
          key={lesson.name}
          sx={{
            width: "70%",
            backgroundColor: "#FFFFFF",
            borderRadius: "0.2rem",
            padding: "0.25rem 1rem",
            marginBottom: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "1.5rem" }}>{lesson.name}</Typography>
            <Typography sx={{ color: "#5D707F", fontSize: "1.25rem" }}>
              Data: {lesson.data}
            </Typography>
            <Typography sx={{ color: "#5D707F", fontSize: "1.25rem" }}>
              Sala de aula: {lesson.room}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete} sx={{ color: "red" }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
