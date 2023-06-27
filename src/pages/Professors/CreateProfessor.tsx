import { Box, Container, Typography, Input } from "@mui/material";
import { useState } from "react";
//import "./Professors.css";
import { useNavigate } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import "react-datepicker/dist/react-datepicker.css";
import ButtonYellow from "./components/ButtonYellow";
import axios from "axios";

export default function CreateProfessor(): JSX.Element {

  const [name, setName] = useState("");  
  const [registration, setRegistration] = useState("");  
  const [email, setEmail] = useState("");  
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [admissionDate, setAdmissionDate] = useState<Date | null>(null);
  const [identification, setIdentification] = useState([]);  

  const navigate = useNavigate();
  

  const handleNavigateToProfessor = () => {
    navigate('/professors');
  };

  const handleDateChange = (date: Date | null) => {
    setBirthDate(date);
  };

  const handleProfessorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSaveLesson = async () => {
    try {
      const lessonData = {
        datetime: birthDate,
        classroom: name
      };

      await axios.post("http://localhost:8000/lesson/", lessonData);

      handleNavigateToProfessor(); // Redirecionar após o salvamento
    } catch (error) {
      console.log("Erro ao salvar aula:", error);
    }
  };

  return (
    <Container disableGutters className="createProfessorsContainer">
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <WorkOutlinedIcon htmlColor="#005288" />
          <Typography variant="h4" fontWeight={500}>
            Criar/Editar Professor
          </Typography>
        </Box>

        <Box sx={{ marginTop: "2rem" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Input
              type="text"
              value={name}
              placeholder="Nome do Professor"
              onChange={handleProfessorChange}
              className="professorInput"
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Input
                type="text"
                value={registration}
                placeholder="Matrícula"
                onChange={(event) => setRegistration(event.target.value)}
                className="professorInput"
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                className="professorInput"
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateField']}>
                  <DateField value={birthDate} onChange={(event) => setBirthDate(event)} label="Data de Nascimento"  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateField']}>
                  <DateField value={admissionDate} onChange={(event) => setAdmissionDate(event)} label="Data de Admissão"  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
        </Box>
      </Box>
      <div className="buttonContainer">
        <ButtonYellow text="Cancelar" styles={{}} onClick={handleNavigateToProfessor} />
        <ButtonYellow text="Salvar" styles={{}} onClick={handleSaveLesson} />
      </div>
    </Container>
  );
}
