import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import axios from "axios";
import ButtonYellow from "./components/ButtonYellow";

interface RouteParams {
    id: string;
    [key: string]: string | undefined;
  }

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams<RouteParams>();

  const [name, setName] = useState("");
  const [registration, setRegistration] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const handleNavigateToList = () => {
    navigate("/students");
  };

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/students/${id}`);
        const student = response.data;
        setName(student.student.name);
        setRegistration(student.student.registration);
        setEmail(student.student.email);
        setCourse(student.student.course);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSave = async () => {
    try {
      const updatedStudent = {
        name,
        registration,
        email,
        course,
      };

      await axios.put(`http://localhost:8080/students/${id}`, updatedStudent);

      handleNavigateToList();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Container disableGutters>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <ManageAccountsIcon
            sx={{ color: "#E78901", width: "40px", height: "40px" }}
          />
          <Typography variant="h4" fontWeight={500}>
            Editar Aluno
          </Typography>
        </Box>

        <Box
          sx={{
            marginTop: "2rem",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
              marginBottom: "1rem",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                width: "50%",
              }}
            >
              <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Matrícula"
                variant="outlined"
                fullWidth
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                width: "50%",
              }}
            >
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Curso"
                variant="outlined"
                fullWidth
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </Box>
          </Box>

          <div className="buttonContainer">
                <ButtonYellow text="Cancelar" styles={{}} onClick={handleNavigateToList} />
                <ButtonYellow text="Criar/Salvar" styles={{}} onClick={handleSave} />
            </div>
        </Box>
      </Box>
    </Container>
  );
};

export default EditStudent;