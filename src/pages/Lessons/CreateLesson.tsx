import { Box, Container, Typography, Snackbar } from "@mui/material";
import { useState } from "react";
import ButtonYellow from "./components/ButtonYellow";
import "./Lessons.css";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function CreateLesson(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [classroom, setClassroom] = useState("");
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleNavigateToSubjects = () => {
    navigate('/subjects');
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleClassroomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
  
    // Verifica se o valor digitado é um número
    if (!isNaN(Number(inputValue))) {
      setClassroom(inputValue);
    }
  };

  const handleSaveLesson = async () => {
    try {
      const lessonData = {
        datetime: selectedDate,
        classroom: classroom
      };

      await axios.post("http://localhost:8000/lesson/", lessonData);

      setSnackbarMessage("Aula salva com sucesso.");
      setSnackbarOpen(true);

      //handleNavigateToLesson(); // Redirecionar após o salvamento
    } catch (error) {
      console.log("Erro ao salvar aula:", error);
      setSnackbarMessage("Erro ao salvar a aula. Por favor, tente novamente.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container disableGutters className="lessonsContainer">
      <Box>
        <Box>
          <Typography variant="h4" fontWeight={500}>
            Criar Aula
          </Typography>
        </Box>
        <Box sx={{ marginTop: "2rem" }}>
          <Typography variant="h5" fontWeight={500}>
            Selecione a data e hora da aula:
          </Typography>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="DD/MM/YYYY HH:mm"
            className="datePicker"
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Horário"
            customInput={
              <input
                className="customDatePickerInput"
                style={{ height: "40px", width: "350px" , fontSize: "16px" }} // Estilos personalizados
              />
            }
          />
          <Typography variant="h5" fontWeight={500}>
            Escreva o número da classe:
          </Typography>
          <input
            type="text"
            value={classroom}
            onChange={handleClassroomChange}
            className="classroomInput"
            style={{ height: "40px", width: "350px", fontSize: "16px" }} // Estilos personalizados
          />
        </Box>
      </Box>
      <div className="buttonContainer">
        <ButtonYellow text="Cancelar" styles={{}} onClick={handleNavigateToSubjects} />
        <ButtonYellow text="Salvar" styles={{}} onClick={handleSaveLesson} />
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
