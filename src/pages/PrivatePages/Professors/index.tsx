import { Alert, Box, Card, CardActionArea, CardContent, Container, Divider, Icon, IconButton, List, Snackbar, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import './Professors.css';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import { IProfessor } from './model/professor';
import { Add, Delete, Edit } from '@mui/icons-material';
import { professorListItemStyle } from './styles';
import { deleteById, findAll, findById } from '@services/professorsService';
import { useNavigate } from 'react-router-dom';

const ProfessorList = (): JSX.Element => {

  const [professors, setProfessors] = React.useState<IProfessor[]>([]);
  const navigate = useNavigate();
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Erro ao se conectar com o servidor.');

  const getProfessors = useCallback(async () => {
    const profs = (await findAll()).data.filter((prof: any) => prof.active === true)
    setProfessors(profs);
  }, []);

  useEffect(() => {
    getProfessors();
  }, [getProfessors]);

  const handleSuccessSnackbarClose = () => setShowSuccessSnackbar(false);

  const handleEdit = (id: string) => {
    navigate(`/professors/${id}`);
  }

  const displayErrorToast = () => {
    setShowErrorSnackbar(true);
  };

  const hideErrorToast = (_: any) => {
    setShowErrorSnackbar(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteById(id);
      setProfessors(professors.filter(professor => professor.id !== id));
      setShowSuccessSnackbar(true);
    } catch (error: any) {
      setErrorMessage(error.message)
      setShowErrorSnackbar(true);
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
          <WorkOutlinedIcon htmlColor="#005288" />
          <Typography variant="h4" fontWeight={500} color={"#191308"}>
            Professores
          </Typography>
        </Box>
        <Typography
          sx={{
            color: "#5D707F",
            fontWeight: 500,
            fontSize: "1.5rem",
            marginBottom: "1rem",
            paddingTop: "1rem"
          }}
        >
          Lista de Professores
        </Typography>

        <Box sx={{ width: '75%' }}>
          <List>
            {professors.map((professor) => (
              <React.Fragment key={professor.id}>
                <Card sx={professorListItemStyle}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box sx={{ flexDirection: 'column' }}>
                      <Typography sx={{ fontSize: "1.5rem" }}>{professor.name}</Typography>
                      <Typography sx={{ color: "#5D707F", fontSize: "1rem" }}>
                        {professor.registration}
                      </Typography>
                    </Box>

                    <Box>
                      <IconButton sx={{ color: "#005288" }} onClick={() => handleEdit(professor.id!)}>
                        <Edit />
                      </IconButton>
                      <IconButton sx={{ color: "#005288" }} onClick={() => handleDelete(professor.id!)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>

      </Box>
      <div className="buttonContainer">
        <IconButton onClick={() => navigate('/professors/create')} sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: "#005288",
          color: "white",
          borderRadius: "28px",
          "&:hover": {
            bgcolor: "#005288",
            color: "black",
          },
        }}>
          <Typography sx={{ fontSize: "inherit", display: 'flex', alignItems: 'center', textTransform: 'uppercase' }}>
            <Add />
            Criar
          </Typography>
        </IconButton>
      </div>
      <Snackbar open={showSuccessSnackbar} autoHideDuration={3000} onClose={handleSuccessSnackbarClose}>
        <Alert onClose={handleSuccessSnackbarClose} severity="success" sx={{ width: '100%', backgroundColor: '#33B864', color: 'white' }}>
          Professor deletado com sucesso
        </Alert>
      </Snackbar>
      <Snackbar open={showErrorSnackbar} autoHideDuration={5000} onClose={hideErrorToast}>
        <Alert onClose={hideErrorToast} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfessorList;