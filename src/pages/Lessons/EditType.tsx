import { Box, Container, Typography, Snackbar } from "@mui/material";
import { useState, useEffect } from "react";
import ButtonYellow from "./components/ButtonYellow";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Type {
  uuid: string;
  name: string;
}

export default function EditType(): JSX.Element {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchType = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/lessons/subject/type/${id}`);
        const typeData: Type = response.data;
        setName(typeData.name);
      } catch (error) {
        console.log("Erro ao buscar tipo:", error);
      }
    };

    fetchType();
  }, [id]);

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
        name: name,
      };

      await axios.put(`http://localhost:8000/lessons/subject/type/${id}`, typeData);

      setSnackbarMessage("Tipo atualizado com sucesso.");
      setSnackbarOpen(true);
    } catch (error) {
      console.log("Erro ao atualizar tipo:", error);
      setSnackbarMessage("Erro ao atualizar o tipo. Por favor, tente novamente.");
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
            Editar Tipo
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
