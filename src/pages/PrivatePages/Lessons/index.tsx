import {
  Box,
  Container,
  Typography,
  IconButton,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import Add from '@mui/icons-material/Add';
import { useCallback, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonYellow from './components/ButtonYellow';
import api from '@utils/api';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { Lesson } from './model/lesson';
import { BASE_URL } from './constants';
import { formatDatetime } from './utils/formatDatetime';

export default function Lessons(): JSX.Element {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const navigate = useNavigate();
  const [busy, setBusy] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState(false);

  const fetchLessons = useCallback(async () => {
    try {
      const allLessons = await api({
        baseURL: BASE_URL,
      }).get<Lesson[]>('/lesson');

      setLessons(allLessons.data);
      setBusy(false);
    } catch (e) {
      setError(true);
      setSnackbarMessage('Erro ao buscar aulas. Por favor, tente novamente.');
      setSnackbarOpen(true);

      console.log('Erro ao buscar aulas:', e);
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  const handleEdit = (lessonId: string) => {
    navigate(`/lessons/edit/${lessonId}`);
  };

  const handleDelete = async (lessonId: string) => {
    setBusy(true);
    try {
      await api({ baseURL: BASE_URL }).delete(`/lesson/${lessonId}`);
      setLessons((prevLessons) =>
        prevLessons.filter((lesson) => lesson.uuid !== lessonId)
      );
      setBusy(false);
    } catch (error) {
      setError(true);
      setSnackbarMessage('Erro ao excluir aula. Por favor, tente novamente.');
      setSnackbarOpen(true);
      console.log('Erro ao excluir aula:', error);
      setBusy(false);
    }
  };

  const handleNavigateToCreateLesson = () => {
    navigate('/lessons/create');
  };

  const handleNavigateToSubjects = () => {
    navigate('/lessons/subjects');
  };

  const handleNavigateToTypes = () => {
    navigate('/lessons/types');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth={false} disableGutters className="lessonsContainer">
      <Box
        sx={{
          height: '100dvh',
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
            Lista de aulas
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
          lessons
            .filter((lesson) => lesson.active)
            .map((lesson) => (
              <Box
                key={lesson.datetime}
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
                  <Typography sx={{ color: '#5D707F', fontSize: '1.25rem' }}>
                    Data: {formatDatetime(new Date(lesson.datetime))}
                  </Typography>
                  <Typography sx={{ color: '#5D707F', fontSize: '1.25rem' }}>
                    Sala de aula: {lesson.classroom}
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
          text="Assuntos"
          styles={{}}
          onClick={handleNavigateToSubjects}
        />
        <ButtonYellow
          text="Tipos"
          styles={{}}
          onClick={handleNavigateToTypes}
        />
        <ButtonYellow
          text="Criar"
          icon={<Add />}
          onClick={handleNavigateToCreateLesson}
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
