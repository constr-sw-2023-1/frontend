import { Box, Container, Typography, IconButton } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonYellow from "./components/ButtonYellow";
import api from "@utils/api";
import "./Lessons.css";
import { useNavigate } from "react-router-dom";
import { Lesson } from "./model/lesson";
import axios from "axios";

const formatTime = (date: Date) =>
  `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

export default function Lessons(): JSX.Element {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const navigate = useNavigate();

  const fetchLessons = useCallback(async () => {
    const allLessons = await api({
      baseURL: "//localhost:8000",
    }).get<Lesson[]>("/lesson");

    setLessons(allLessons.data);
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  const handleEdit = (lessonId: string) => {
    navigate(`/subjects/lessons/edit/${lessonId}`);
  };

  const handleDelete = async (lessonId: string) => {
    try {
      await axios.delete(`http://localhost:8000/lesson/${lessonId}`);
      setLessons((prevLessons) =>
        prevLessons.filter((lesson) => lesson.uuid !== lessonId)
      );
    } catch (error) {
      console.log("Erro ao excluir aula:", error);
    }
  };

  const handleNavigateToCreateLesson = () => {
    navigate("/subjects/lessons/create");
  };

  return (
    <Container disableGutters className="lessonsContainer">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "primary.main",
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: "0.15rem",
          margin: "1rem",
          padding: "0.5rem",
        }}
      >
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
        {lessons
          .filter((lesson) => lesson.active)
          .map((lesson) => (
            <Box
              key={lesson.datetime}
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
                <Typography sx={{ color: "#5D707F", fontSize: "1.25rem" }}>
                  Data: {formatTime(new Date(lesson.datetime))}
                </Typography>
                <Typography sx={{ color: "#5D707F", fontSize: "1.25rem" }}>
                  Sala de aula: {lesson.classroom}
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={() => handleEdit(lesson.uuid)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(lesson.uuid)}
                  sx={{ color: "red" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
      </Box>
      <div className="buttonContainer">
        <ButtonYellow
          text="Criar"
          icon={<Add />}
          onClick={handleNavigateToCreateLesson}
        />
      </div>
    </Container>
  );
}
