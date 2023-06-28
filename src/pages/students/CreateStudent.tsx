import { Box, Container, Typography, Input, TextField } from "@mui/material";
import { useState } from "react";
import "./students.css";
import { useNavigate } from 'react-router-dom';
import ButtonYellow from "./components/ButtonYellow";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import axios from "axios";

export default function CreateStudent(): JSX.Element {

    const [name, setName] = useState("");
    const [matricula, setMatricula] = useState("");
    const [email, setEmail] = useState("");
    const [curso, setCurso] = useState("");

    const navigate = useNavigate();

    const handleNavigateToList = () => {
        navigate('/students');
    };

    const handleStudentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleCreate = async () => {
        //Fazer a chamada para a API para criar o aluno
    };

    return (
        <Container disableGutters className="createStudentsContainer">
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <ManageAccountsIcon sx={{ color: "#E78901", width: "40px", height: "40px" }} />
                    <Typography variant="h4" fontWeight={500}>
                        Criar/Editar Aluno
                    </Typography>
                </Box>

                <Box sx={{ marginTop: "2rem", width: "100%" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: "0.5rem", marginBottom: "1rem", width: "100%" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "50%" }}>
                            <TextField
                                type="text"
                                value={name}
                                placeholder="Nome do Aluno"
                                onChange={handleStudentChange}
                                className="studentsInput"
                            />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "50%" }}>
                            <TextField
                                type="text"
                                value={matricula}
                                placeholder="Matrícula"
                                onChange={(event) => setMatricula(event.target.value)}
                                className="studentsInput"
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", marginBottom: "1rem", width: "100%" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
                            <TextField
                                type="curso"
                                value={curso}
                                placeholder="Curso"
                                onChange={(event) => setCurso(event.target.value)}
                                className="studentsInput"
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", marginBottom: "1rem", width: "100%" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
                            <TextField
                                type="email"
                                value={email}
                                placeholder="Email"
                                onChange={(event) => setEmail(event.target.value)}
                                className="studentsInput"
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>

                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>

                        </Box>
                    </Box>
                </Box>
            </Box>
            <div className="buttonContainer">
                <ButtonYellow text="Cancelar" styles={{}} onClick={handleNavigateToList} />
                <ButtonYellow text="Criar/Salvar" styles={{}} onClick={handleCreate} />
            </div>
        </Container>
    );
}