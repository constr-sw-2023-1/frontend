import { Box, Container, Typography, TextField, Button} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./students.css";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import axios from "axios";
import ButtonYellow from "./components/ButtonYellow";
import Header from "@components/Header";

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}

interface Schooling {
  schooling_id: number;
  graduation: string;
  conclusion: string;
  institution: string;
}

interface ProfessionalExperience {
  experience_id: number;
  position: string;
  contractor_id: number;
  start_date: string;
  end_date: string;
  ongoing: number;
}

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams<RouteParams>();

  const [name, setName] = useState("");
  const [registration, setRegistration] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [schooling, setSchooling] = useState<Schooling[]>([]);
  const [professionalExperience, setProfessionalExperience] = useState<ProfessionalExperience[]>([]);

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
        setSchooling(student.student.schooling);
        setProfessionalExperience(student.student.professional_experience);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSave = async () => {
    try {
      const updatedStudent = {
        student_id: id,
        name,
        registration,
        email,
        course,
        enabled: true,
        schooling,
        professional_experience: professionalExperience,
      };

      await axios.put(`http://localhost:8080/students/${id}`, updatedStudent);

      handleNavigateToList();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleAddSchooling = () => {
    setSchooling([...schooling, { schooling_id: 0, graduation: "", conclusion: "", institution: "" }]);
  };

  const handleAddProfessionalExperience = () => {
    setProfessionalExperience([...professionalExperience, { experience_id: 0, position: "", contractor_id: 0, start_date: "", end_date: "", ongoing: 0 }]);
  };

  const handleSchoolingChange = (index: number, field: keyof Schooling, value: string) => {
    const updatedSchooling = schooling.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setSchooling(updatedSchooling);
  };

  const handleProfessionalExperienceChange = (index: number, field: keyof ProfessionalExperience, value: string) => {
    const updatedProfessionalExperience = professionalExperience.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setProfessionalExperience(updatedProfessionalExperience);
  };

  return (
    <Container disableGutters className="createStudentsContainer">
    <Header />
    <Box sx={{ marginTop: "64px" }}></Box>
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
                className="studentsInput"
              />
              <TextField
                label="Matrícula"
                variant="outlined"
                fullWidth
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
                className="studentsInput"
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
                className="studentsInput"
              />
              <TextField
                label="Curso"
                variant="outlined"
                fullWidth
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="studentsInput"
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <Typography variant="h6">Escolaridade</Typography>
            {schooling.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Graduação"
                  variant="outlined"
                  fullWidth
                  value={item.graduation}
                  onChange={(e) =>
                    handleSchoolingChange(index, "graduation", e.target.value)
                  }
                  className="studentsInput"
                />
                <TextField
                  label="Conclusão"
                  variant="outlined"
                  fullWidth
                  value={item.conclusion}
                  onChange={(e) =>
                    handleSchoolingChange(index, "conclusion", e.target.value)
                  }
                  className="studentsInput"
                />
                <TextField
                  label="Instituição"
                  variant="outlined"
                  fullWidth
                  value={item.institution}
                  onChange={(e) =>
                    handleSchoolingChange(index, "institution", e.target.value)
                  }
                  className="studentsInput"
                />
              </Box>
            ))}
            <Button variant="contained" sx={{backgroundColor: 'orange'}}  onClick={handleAddSchooling}>
              Adicionar Escolaridade
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <Typography variant="h6">Experiência Profissional</Typography>
            {professionalExperience.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Cargo"
                  variant="outlined"
                  fullWidth
                  value={item.position}
                  onChange={(e) =>
                    handleProfessionalExperienceChange(
                      index,
                      "position",
                      e.target.value
                    )
                  }
                  className="studentsInput"
                />
                <TextField
                  label="CNPJ da Empresa"
                  variant="outlined"
                  fullWidth
                  value={item.contractor_id.toString()}
                  onChange={(e) =>
                    handleProfessionalExperienceChange(
                      index,
                      "contractor_id",
                      e.target.value
                    )
                  }
                  className="studentsInput"
                />
                <TextField
                  label="Data de Início"
                  variant="outlined"
                  fullWidth
                  value={item.start_date}
                  onChange={(e) =>
                    handleProfessionalExperienceChange(
                      index,
                      "start_date",
                      e.target.value
                    )
                  }
                  className="studentsInput"
                />
                <TextField
                  label="Data de Término"
                  variant="outlined"
                  fullWidth
                  value={item.end_date}
                  onChange={(e) =>
                    handleProfessionalExperienceChange(
                      index,
                      "end_date",
                      e.target.value
                    )
                  }
                  className="studentsInput"
                />
                <TextField
                  label="Em Andamento"
                  variant="outlined"
                  fullWidth
                  value={item.ongoing.toString()}
                  onChange={(e) =>
                    handleProfessionalExperienceChange(
                      index,
                      "ongoing",
                      e.target.value
                    )
                  }
                  className="studentsInput"
                />
              </Box>
            ))}
            <Button
              variant="contained"
              sx={{backgroundColor: 'orange'}}
              onClick={handleAddProfessionalExperience}
            >
              Adicionar Experiência Profissional
            </Button>
          </Box>

          <div className="buttonContainer">
            <ButtonYellow
              text="Cancelar"
              styles={{}}
              onClick={handleNavigateToList}
            />
            <ButtonYellow
              text="Criar/Salvar"
              styles={{}}
              onClick={handleSave}
            />
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default EditStudent;
