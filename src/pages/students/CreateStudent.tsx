import { Box, Container, Typography, Input, TextField } from "@mui/material";
import { useState } from "react";
import "./students.css";
import { useNavigate } from 'react-router-dom';
import ButtonYellow from "./components/ButtonYellow";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { createStudent } from "./studentsRequests";
import { Student } from "./model/student";
import Header from "@components/Header";

export default function CreateStudent(): JSX.Element {

    const [name, setName] = useState("");
    const [registration, setRegistration] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState(null)

    const navigate = useNavigate();

    const handleNavigateToList = () => {
        navigate('/students');
    };

    const handleStudentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleCreate = async () => {
        let studentData: Student = {
            name,
            registration,
            email,
            course,
            enabled: true
        }

        let res = await createStudent(studentData)
        setMessage(res.message)


        if (message) {
            setTimeout(() => {
                handleNavigateToList()
            }, 3000)
        }
    };

    return (
        <Container disableGutters className="createStudentsContainer">
            <Header />
            <Box sx={{ marginTop: "64px" }}></Box>
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <ManageAccountsIcon sx={{ color: "#E78901", width: "40px", height: "40px" }} />
                    <Typography variant="h4" fontWeight={500}>
                        Criar Aluno
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
                                value={registration}
                                placeholder="Matrícula"
                                onChange={(event) => setRegistration(event.target.value)}
                                className="studentsInput"
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", marginBottom: "1rem", width: "100%" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
                            <TextField
                                type="curso"
                                value={course}
                                placeholder="Curso"
                                onChange={(event) => setCourse(event.target.value)}
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
                    {message && <p style={{ color: "green" }}>Aluno matriculado com sucesso!</p>}
                    {errors && <p style={{ color: "red" }}>Erro ao matricular o aluno! Verifique os campos preenchidos!</p>}
                </Box>
            </Box>
            <div className="buttonContainer">
                <ButtonYellow text="Cancelar" styles={{}} onClick={handleNavigateToList} />
                <ButtonYellow text="Criar/Salvar" styles={{}} onClick={handleCreate} />
            </div>
        </Container>
    );
}