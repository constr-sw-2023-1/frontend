import { Box, Container, Typography, IconButton } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonYellow from "./components/ButtonYellow";
import api from "@utils/api";
import { useNavigate } from 'react-router-dom';
import { Type } from "./model/type";
import "./Lessons.css";
import axios from 'axios';


export default function Types(): JSX.Element {
  const [types, setTypes] = useState<Type[]>([]);
  const navigate = useNavigate();

  const fetchTypes = useCallback(async () => {
    const allTypes = await api({
      baseURL: "//localhost:8000",
    }).get<Type[]>("/lessons/subject/type/");

    setTypes(allTypes.data);
  }, []);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  const handleNavigateToCreateType = () => {
    navigate('/subjects/types/create');
  };

  const handleEdit = (typeId: string) => {
    navigate(`/subjects/types/edit/${typeId}`);
  };

  const handleDelete = async (typeId: string) => {
    try {
      await axios.delete(`http://localhost:8000/lessons/subject/type/${typeId}`);
      // Atualize o estado dos tipos para refletir a exclusão
      setTypes((prevTypes) => prevTypes.filter((type) => type.uuid !== typeId));
    } catch (error) {
      console.log('Erro ao excluir tipo:', error);
    }
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
          padding: "0.5rem"
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
          <Typography variant="h4" fontWeight={500}>
            Tipos
          </Typography>
        </Box>
        {types
          .filter((type) => type.active) // Filtra apenas os tipos com active = true
          .map((type) => (
            <Box
              key={type.uuid} // Alterado para usar o uuid como chave
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
                <Typography sx={{ fontSize: "1.5rem" }}>{type.name}</Typography>
              </Box>
              <Box>
                <IconButton onClick={() => handleEdit(type.uuid)}> {/* Passa o uuid para a função de handleEdit */}
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(type.uuid)} sx={{ color: 'red' }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
      </Box>
      <div className="buttonContainer">
        <ButtonYellow text="Criar" icon={<Add />} onClick={handleNavigateToCreateType} />
      </div>
    </Container>
  );
}
