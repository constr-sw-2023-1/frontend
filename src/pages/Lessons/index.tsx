import { Box, Button, Container, Typography, IconButton } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Add from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonYellow from "./components/ButtonYellow";
import api from "@utils/api";
import { Subject } from "./model/subject";

const formatTime = (date: Date) =>
  `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;

export default function Lessons() {
  const [subjects, setSubjects] = useState([] as Subject[]);

  const fetchSubjects = useCallback(async () => {
    const allSubjects = await api({
      baseURL: "http://ec2-18-220-210-173.us-east-2.compute.amazonaws.com:8000",
    }).get<Subject[]>("/lessons/subject");

    setSubjects(allSubjects.data);
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const handleEdit = () => {
    // Lógica para manipular o clique no botão de edição
    console.log("Botão de edição clicado");
  };

  const handleDelete = () => {
    // Lógica para manipular o clique no botão de exclusão
    console.log("Botão de exclusão clicado");
  };

  return (
    <Container disableGutters>
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
        {subjects.map((lesson) => (
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
                Data: {formatTime(new Date(lesson.lesson.datetime))}
              </Typography>
              <Typography sx={{ color: "#5D707F", fontSize: "1.25rem" }}>
                Sala de aula: {lesson.lesson.classroom}
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
      <ButtonYellow text="Todos os tipos" styles={{}} />
      <ButtonYellow text="Criar" icon={<Add />} />
    </Container>
  );
}
