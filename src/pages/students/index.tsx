import { Box, Container, Typography, IconButton } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback, useEffect, useState } from "react";
import ButtonYellow from "./components/ButtonYellow";
import "./students.css";
import { Student } from "./model/student";
import { useNavigate } from 'react-router-dom';

const Students = () => {

    const handleDelete = (uuid: string) => {
        //Fazer a chamada para a API para deletar o aluno

        setStudents(prevStudents => {
          return prevStudents.filter((student) => student.uuid !== uuid)
        })
        
    };
    const [students, setStudents] = useState<Student[]>([]);
    const navigate = useNavigate();

    //Alterar para a chamada da API
    useEffect(() => {
        setStudents([
            {
                uuid: "1",
                nome: "Aluno 1",
                matricula: "123456789",
                curso: "Ciência da Computação",
            },
            {
                uuid: "2",
                nome: "Aluno 2",
                matricula: "987654321",
                curso: "Engenharia de Software",
            }
        ]);
    }, []);

    return (
        <Container disableGutters className="studentsContainer">
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#eef1ef",
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    gap: "0.15rem",
                    margin: "1rem",
                    padding: "0.25rem 1rem",
                    borderRadius: "0.2rem",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "1rem",
                        alignItems: "center",
                        backgroundColor: "#eef1ef",
                    }}
                >
                    <GroupIcon
                        sx={{ color: "#E78901", width: "40px", height: "40px" }}
                    />
                    <Typography variant="h4" fontWeight={500}>
                        Alunos
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        color: "#5D707F",
                        fontWeight: 500,
                        fontSize: "1.5rem",
                        marginBottom: "1rem",
                    }}
                >
                    Lista de Alunos
                </Typography>
            </Box>
            {students.map((student) => (
                <Box
                    key={student.uuid}
                    sx={{
                        width: "100%",
                        backgroundColor: "#ffffff",
                        borderRadius: "0.2rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: "0.5rem",
                        padding: "0.5rem",
                    }}
                >
                    <Box>
                        <Typography sx={{ fontSize: "1.5rem" }}>{student.nome}</Typography>
                        <Typography sx={{ color: "#5D707F", fontSize: "1.25rem" }}>
                            Matricula: {student.matricula}
                        </Typography>
                        <Typography sx={{ color: "#5D707F", fontSize: "1.25rem" }}>
                            Curso: {student.curso}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={() => { }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(student.uuid)} sx={{ color: "red" }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            ))}
            <div className="buttonContainer">
                <ButtonYellow text="Adicionar Aluno" icon={<Add />} onClick={() => { }} />
            </div>
        </Container>
    )
}

export default Students