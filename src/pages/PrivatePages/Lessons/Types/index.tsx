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
import DeleteIcon from '@mui/icons-material/Delete';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ButtonYellow from '../components/ButtonYellow';
import api from '@utils/api';
import { useNavigate } from 'react-router-dom';
import { Type } from '../model/type';
import '../index.css';
import { BASE_URL } from '../constants';

export default function Types(): JSX.Element {
  const [types, setTypes] = useState<Type[]>([]);
  const navigate = useNavigate();
  const [busy, setBusy] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState(false);

  const fetchTypes = useCallback(async () => {
    try {
      const allTypes = await api({
        baseURL: BASE_URL,
      }).get<Type[]>('/lessons/subject/type/');

      setTypes(allTypes.data);
      setBusy(false);
    } catch (e) {
      setError(true);
      setSnackbarMessage('Erro ao buscar tipos. Por favor, tente novamente.');
      setSnackbarOpen(true);

      console.log('Erro ao buscar tipos:', e);
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  const handleNavigateToCreateType = () => {
    navigate('/lessons/types/create');
  };

  const handleEdit = (typeId: string) => {
    navigate(`/lessons/types/edit/${typeId}`);
  };

  const handleDelete = async (typeId: string) => {
    setBusy(true);
    try {
      await api({ baseURL: BASE_URL }).delete(
        `/lessons/subject/type/${typeId}`
      );
      // Atualize o estado dos tipos para refletir a exclusão
      setTypes((prevTypes) => prevTypes.filter((type) => type.uuid !== typeId));
      setBusy(false);
    } catch (error) {
      setError(true);
      setSnackbarMessage('Erro ao excluir tipo. Por favor, tente novamente.');
      setSnackbarOpen(true);
      console.log('Erro ao excluir tipo:', error);
      setBusy(false);
    }
  };

  const handleNavigateToSubjects = () => {
    navigate('/lessons/subjects');
  };

  const handleNavigateToLesson = () => {
    navigate('/lessons');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container disableGutters maxWidth={false} className="lessonsContainer">
      <Box
        sx={{
          height: '100vh',
          backgroundColor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '0.15rem',
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
            Lista de tipos
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
          types
            .filter((type) => type.active) // Filtra apenas os tipos com active = true
            .map((type) => (
              <Box
                key={type.uuid} // Alterado para usar o uuid como chave
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
                    {type.name}
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => handleEdit(type.uuid)}>
                    {' '}
                    {/* Passa o uuid para a função de handleEdit */}
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(type.uuid)}
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
          text="Aulas"
          styles={{}}
          onClick={handleNavigateToLesson}
        />
        <ButtonYellow
          text="Criar"
          icon={<Add />}
          onClick={handleNavigateToCreateType}
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
