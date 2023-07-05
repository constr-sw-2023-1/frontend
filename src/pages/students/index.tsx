import { Box, Container, Typography, IconButton } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback, useEffect, useState } from "react";
import ButtonYellow from "./components/ButtonYellow";
import { Student } from "./model/student";
import { useNavigate } from "react-router-dom";
import { fetchStudents, deleteStudents } from "./studentsRequests";
import Header from "@components/Header";

const Students = () => {
  const handleDelete = async (student_id: number | string) => {
    let res = await deleteStudents(student_id);

    setTimeout(async () => {
      let results = await fetchStudents();
      setStudents(results);
    }, 500);
  };

  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleNavigateToCreate = () => {
    navigate("/students/create");
  };

  const handleNavigateToEdit = (student_id: number) => {
    navigate(`/students/edit/${student_id}`);
  };

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      let results = await fetchStudents();
      setStudents(results);
    })();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [students]);

  return (
    <Container disableGutters className="studentsContainer">
    <Header />
    <Box sx={{ marginTop: "50px" }}></Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
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
        {isLoading ? (
          "Carregando..."
        ) : (
          <>
            {students.map((student) => (
              <Box
                key={student.student_id}
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "0.2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                  padding: "0.5rem",
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: "1.5rem" }}>
                    {student.name}
                  </Typography>
                  <Typography
                    sx={{ color: "#5D707F", fontSize: "1.25rem" }}
                  >
                    Matricula: {student.registration}
                  </Typography>
                  <Typography
                    sx={{ color: "#5D707F", fontSize: "1.25rem" }}
                  >
                    Curso: {student.course}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    onClick={() => student.student_id && handleNavigateToEdit(Number(student.student_id))}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => student.student_id && handleDelete(student.student_id)}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>

      <div className="buttonContainer">
        <ButtonYellow
          text="Adicionar Aluno"
          icon={<AddIcon />}
          onClick={handleNavigateToCreate}
        />
      </div>
    </Container>
  );
};

export default Students;
