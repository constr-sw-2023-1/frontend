import { Box, Container, Typography, Input, List, ListItem, IconButton, ListItemText, TextField, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import "./Professors.css";
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import "react-datepicker/dist/react-datepicker.css";
import ButtonBlue from "./components/ButtonBlue";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { Identification } from "./model/identification";

export default function CreateProfessor(): JSX.Element {

  const [name, setName] = useState("");
  const [registration, setRegistration] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [admissionDate, setAdmissionDate] = useState<Date | null>(null);
  const [identification, setIdentification] = useState<Identification[]>([]);
  const [idCount, setIdCount] = useState<number>(0);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  const navigate = useNavigate();

  const getSequential = () => {
    setIdCount(idCount + 1)
    return idCount;
  }

  const handleNavigateToProfessor = () => {
    navigate('/professors');
  };

  const handleAddIdentification = (element: Identification) => {
    element.id = getSequential()
    setIdentification([...identification, element])
  }

  const handleRemoveIdentification = (id: Number) => {
    const newIdentification = identification.filter((ident) => ident.id != id)
    setIdentification(newIdentification)
  }

  const handleUpdateIdentification = (element: Identification) => {
    const newIdentification = identification.map((ident) => ident.id != element.id ? ident : element)
    setIdentification(newIdentification)
  }

  const handleProfessorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSaveProfessor = async () => {
    try {
      const professorData = {
        registration: registration,
        name: name,
        bornDate: birthDate,
        admissionDate: admissionDate,
        active: true,
        identification: identification.map((e) => { })
      };

      await axios.post("http://localhost:8083/professors/", professorData);
      setShowSuccessSnackbar(true);

      handleNavigateToProfessor(); // Redirecionar após o salvamento
    } catch (error) {
      setShowErrorSnackbar(true);
      console.log("Erro ao salvar professor:", error);
    }
  };

  const handleSuccessSnackbarClose = () => {
    setShowSuccessSnackbar(false);
  };

  const handleErrorSnackbarClose = () => {
    setShowErrorSnackbar(false);
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
              fullWidth={true}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
            <Input
              type="text"
              value={registration}
              placeholder="Matrícula"
              onChange={(event) => setRegistration(event.target.value)}
              className="professorInput"
              fullWidth={true}
            />

            <Input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              className="professorInput"
              fullWidth={true}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField fullWidth={true} value={birthDate} onChange={(event) => setBirthDate(event)} label="Data de Nascimento" />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField fullWidth={true} value={admissionDate} onChange={(event) => setAdmissionDate(event)} label="Data de Admissão" />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>

      <List sx={{ width: '100%', bgcolor: '#005288', padding: '1rem', marginTop: '1rem', borderRadius: '.5rem' }}>
        <Typography sx={{ color: "white" }}>Identificadores</Typography>
        {identification.map((id) => (
          <ListItem
            key={id.id}
            disableGutters
            secondaryAction={
              <IconButton onClick={() => handleRemoveIdentification(id.id)} aria-label="comment">
                <DeleteIcon />
              </IconButton>
            }
            sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}
          >
            <Input
              value={id.type}
              sx={{ color: "white" }}
              fullWidth={true}
              placeholder="Nome"
              onChange={(v) => { id.type = v.target.value, handleUpdateIdentification(id) }}
              className="professorInput"
            />

            <TextField
              value={id.value}
              InputProps={{
                style: {
                  color: "white"
                }
              }}
              fullWidth={true}
              multiline
              placeholder="Descrição"
              onChange={(v) => { id.value = v.target.value, handleUpdateIdentification(id) }}
              className="professorInput"
            />

          </ListItem>
        ))}
      </List>
      <IconButton onClick={() => handleAddIdentification({ type: "", value: "" } as Identification)}>
        <AddIcon />
      </IconButton>
      <div className="buttonContainer">
        <ButtonBlue text="Cancelar" icon={<CheckCircleIcon/>} styles={{}} onClick={handleNavigateToProfessor} />
        <ButtonBlue text="Salvar" icon={<CancelIcon/>} styles={{}} onClick={handleSaveProfessor} />
      </div>
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleSuccessSnackbarClose}
      >
        <Alert
          onClose={handleSuccessSnackbarClose}
          severity="success"
          sx={{ width: '100%', backgroundColor: '#33B864', color: 'white' }}
        >
          Professor criado/atualizado com sucesso
        </Alert>
      </Snackbar>
      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={3000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert
          onClose={handleErrorSnackbarClose}
          severity="error"
          sx={{ width: '100%', backgroundColor: '#B90E0A', color: 'white' }}
        >
          Erro ao criar/atualizar professor
        </Alert>
      </Snackbar>
    </Container>
  );
}
