import { Box, Container, Typography, Snackbar } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ButtonYellow from "./components/ButtonYellow";
import "./Lessons.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Lesson } from "./model/lesson";
import { Type } from "./model/type";
import api from "@utils/api";
import { Add } from "@mui/icons-material";

export default function CreateSubject(): JSX.Element {
  const [name, setName] = useState("");
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleNavigateToSubjects = () => {
    navigate('/subjects');
  };

  const handleNavigateToCreateLesson = () => {
    navigate('/subjects/lessons/create');
  };

  const handleNavigateToCreateType = () => {
    navigate('subjects/types/create');
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setName(inputValue);
  };

  const handleLessonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedLessonId(selectedValue);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedTypeId(selectedValue);
  };

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [types, setTypes] = useState<Type[]>([]);

  const fetchLessons = useCallback(async () => {
    try {
      const allLessons = await api({
        baseURL: "//localhost:8000",
      }).get<Lesson[]>("/lesson/");

      setLessons(allLessons.data);
    } catch (error) {
      console.log("Erro ao buscar aulas:", error);
    }
  }, []);

  const fetchTypes = useCallback(async () => {
    try {
      const allTypes = await api({
        baseURL: "//localhost:8000",
      }).get<Type[]>("/lessons/subject/type/");

      setTypes(allTypes.data);
    } catch (error) {
      console.log("Erro ao buscar tipos:", error);
    }
  }, []);

  useEffect(() => {
    fetchLessons();
    fetchTypes();
  }, [fetchLessons, fetchTypes]);

  const handleSaveSubject = async () => {
    try {
      const subjectData = {
        name: name,
        lesson_id: selectedLessonId,
        type_id: selectedTypeId
      };

      await axios.post("http://localhost:8000/lessons/subject/", subjectData);

      setSnackbarMessage("Assunto salvo com sucesso.");
      setSnackbarOpen(true);

      //handleNavigateToLesson(); // Redirecionar após o salvamento
    } catch (error) {
      console.log("Erro ao salvar assunto:", error);
      setSnackbarMessage("Erro ao salvar o assunto. Por favor, tente novamente.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const lessonsFiltered = lessons.filter((lesson) => lesson.active === true);
  const typesFiltered = types.filter((type) => type.active === true);

  return (
    <Container disableGutters className="lessonsContainer">
      <Box>
        <Box>
          <Typography variant="h4" fontWeight={500}>
            Criar Assunto
          </Typography>
        </Box>
        <Box sx={{ marginTop: "2rem" }}>
          <Typography variant="h5" fontWeight={500}>
            Nome do assunto:
          </Typography>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="classroomInput"
            style={{ height: "40px", width: "350px", fontSize: "16px" }} // Estilos personalizados
          />
          <Typography variant="h5" fontWeight={500}>
            Selecione a aula relacionada:
          </Typography>
          <select
            value={selectedLessonId || ''}
            onChange={handleLessonChange}
            className="dropdown"
            style={{ height: "40px", width: "350px", fontSize: "16px" }} // Estilos personalizados
          >
            <option value="">Selecione uma aula</option>
            {lessonsFiltered.map(lesson => (
              <option key={lesson.uuid} value={lesson.uuid}>
                {`${lesson.datetime} - ${lesson.classroom}`}
              </option>
            ))}
          </select>
          <Typography variant="h5" fontWeight={500}>
            Selecione o tipo relacionado:
          </Typography>
          <select
            value={selectedTypeId || ''}
            onChange={handleTypeChange}
            className="dropdown"
            style={{ height: "40px", width: "350px", fontSize: "16px" }} // Estilos personalizados
          >
            <option value="">Selecione um tipo</option>
            {typesFiltered.map(type => (
              <option key={type.uuid} value={type.uuid}>
                {type.name}
              </option>
            ))}
          </select>
        </Box>
      </Box>
      <div className="buttonContainer">
        <ButtonYellow text="Criar Tipo" icon={<Add />} onClick={handleNavigateToCreateType} />
        <ButtonYellow text="Criar Aula" icon={<Add />} onClick={handleNavigateToCreateLesson} />
        <ButtonYellow text="Cancelar" styles={{}} onClick={handleNavigateToSubjects} />
        <ButtonYellow text="Salvar" styles={{}} onClick={handleSaveSubject} />
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
}
