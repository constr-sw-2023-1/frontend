import { Box, Container, Typography, IconButton } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonYellow from "./components/ButtonYellow";
import api from "@utils/api";
import { Type } from "./model/type";
import "./Lessons.css";

export default function Types(): JSX.Element {
  const [types, setType] = useState<Type[]>([]);

  const fetchTypes = useCallback(async () => {
    const allTypes = await api({
      baseURL: "//localhost:8000",
    }).get<Type[]>("/lessons/subject/type/");

    setType(allTypes.data);
  }, []);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  const handleEdit = () => {
    // Lógica para manipular o clique no botão de edição
    console.log("Botão de edição clicado");
  };

  const handleDelete = () => {
    // Lógica para manipular o clique no botão de exclusão
    console.log("Botão de exclusão clicado");
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
        {types.map((type) => (
          <Box
            key={type.name}
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
      <div className="buttonContainer">
        <ButtonYellow text="Criar Tipo" icon={<Add />} />
      </div>
    </Container>
  );
}
