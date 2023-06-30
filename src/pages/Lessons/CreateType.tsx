import { Box, Container, Typography, Snackbar } from "@mui/material";
import { useState } from "react";
import ButtonYellow from "./components/ButtonYellow";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateType(): JSX.Element {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleNavigateToTypes = () => {
    navigate("/subjects/types");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setName(inputValue);
  };

  const handleSaveType = async () => {
    try {
      const typeData = {
        name: name
      };

      await axios.post("http://localhost:8000/lessons/subject/type/", typeData);

      setSnackbarMessage("Tipo salvo com sucesso.");
      setSnackbarOpen(true);
    } catch (error) {
      console.log("Erro ao salvar tipo:", error);
      setSnackbarMessage("Erro ao salvar o tipo. Por favor, tente novamente.");
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
            Criar Tipo
          </Typography>
        </Box>
        <Box sx={{ marginTop: "2rem" }}>
          <Typography variant="h5" fontWeight={500}>
            Nome do tipo:
          </Typography>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="classroomInput"
            style={{ height: "40px", width: "350px", fontSize: "16px" }} // Estilos personalizados
          />
        </Box>
      </Box>
      <div className="buttonContainer">
        <ButtonYellow text="Cancelar" styles={{}} onClick={handleNavigateToTypes} />
        <ButtonYellow text="Salvar" styles={{}} onClick={handleSaveType} />
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
