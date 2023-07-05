import {
  Box,
  Button,
  Container,
  Typography,
  IconButton,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Add from '@mui/icons-material/Add';
import { useCallback, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonYellow from '../components/ButtonYellow';
import api from '@utils/api';
import { Subject } from '../model/subject';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';
import { formatDatetime } from '../utils/formatDatetime';

export default function Subjects(): JSX.Element {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const navigate = useNavigate();
  const [busy, setBusy] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState(false);

  const fetchSubjects = useCallback(async () => {
    try {
      const allSubjects = await api({
        baseURL: BASE_URL,
      }).get<Subject[]>('/lessons/subject');

      setSubjects(allSubjects.data);
      setBusy(false);
    } catch (e) {
      setError(true);
      setSnackbarMessage(
        'Erro ao buscar assuntos. Por favor, tente novamente.'
      );
      setSnackbarOpen(true);

      console.log('Erro ao buscar assuntos:', e);
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const handleDelete = async (subjectId: string) => {
    setBusy(true);
    try {
      await api({ baseURL: BASE_URL }).delete(`/lessons/subject/${subjectId}`);
      setSubjects((prevSubjects) =>
        prevSubjects.filter((subject) => subject.uuid !== subjectId)
      );
      setBusy(false);
    } catch (error) {
      setError(true);
      setSnackbarMessage(
        'Erro ao excluir assunto. Por favor, tente novamente.'
      );
      setSnackbarOpen(true);
      console.log('Erro ao excluir assunto:', error);
      setBusy(false);
    }
  };

  const handleNavigateToTypes = () => {
    navigate('/lessons/types');
  };

  const handleNavigateToLesson = () => {
    navigate('/lessons');
  };

  const handleNavigateToCreateSubject = () => {
    navigate('/lessons/subjects/create');
  };

  const handleEdit = (subjectId: string) => {
    navigate(`/lessons/subjects/edit/${subjectId}`);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth={false} disableGutters className="lessonsContainer">
      <Box
        sx={{
          height: '100vh',
          backgroundColor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '0.15rem',
          margin: '1rem',
          padding: '0.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '80%',
            alignItems: 'flex-start',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              alignItems: 'flex-start',
            }}
          >
            <MenuBookIcon
              sx={{ color: '#E78901', width: '40px', height: '40px' }}
            />
            <Typography variant="h4" fontWeight={500}>
              Aulas
            </Typography>
          </Box>
          <Typography
            sx={{
              color: '#5D707F',
              fontWeight: 500,
              fontSize: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            Lista de assuntos
          </Typography>
        </Box>

        {busy || error ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '70%',
            }}
          >
            {busy ? (
              <CircularProgress size="5rem" color="secondary" />
            ) : (
              <Typography variant="h5" fontWeight={500}>
                Ocorreu um erro. Tente novamente.
              </Typography>
            )}
          </Box>
        ) : (
          subjects
            .filter((subject) => subject.active) // Filtra apenas os subjects com active = true
            .map((lesson) => (
              <Box
                key={lesson.name}
                sx={{
                  width: '80%',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '0.2rem',
                  padding: '0.25rem 1rem',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: '1.5rem' }}>
                    {lesson.name}
                  </Typography>
                  <Typography sx={{ color: '#5D707F', fontSize: '1.25rem' }}>
                    Data: {formatDatetime(new Date(lesson.lesson.datetime))}
                  </Typography>
                  <Typography sx={{ color: '#5D707F', fontSize: '1.25rem' }}>
                    Sala de aula: {lesson.lesson.classroom}
                  </Typography>
                  <Typography sx={{ color: '#5D707F', fontSize: '1.25rem' }}>
                    Tipo: {lesson.type.name}
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => handleEdit(lesson.uuid)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(lesson.uuid)}
                    sx={{ color: 'red' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))
        )}
      </Box>
      <div className="buttonContainer">
        <ButtonYellow
          text="Tipos"
          styles={{}}
          onClick={handleNavigateToTypes}
        />
        <ButtonYellow
          text="Aulas"
          styles={{}}
          onClick={handleNavigateToLesson}
        />
        <ButtonYellow
          text="Criar"
          icon={<Add />}
          onClick={handleNavigateToCreateSubject}
        />
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
