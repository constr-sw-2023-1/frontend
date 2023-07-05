import {
  Box,
  Container,
  Typography,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import ButtonYellow from '../components/ButtonYellow';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@utils/api';
import { BASE_URL } from '../constants';
import { ArrowBack } from '@mui/icons-material';

interface Type {
  uuid: string;
  name: string;
}

export default function EditType(): JSX.Element {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { id } = useParams();
  const [error, setError] = useState(false);

  const [busy, setBusy] = useState(false);

  const fetchType = useCallback(async () => {
    try {
      const response = await api({ baseURL: BASE_URL }).get(
        `/lessons/subject/type/${id}`
      );
      const typeData: Type = response.data;
      setName(typeData.name);
    } catch (error) {
      setSnackbarMessage('Erro ao buscar o tipo. Por favor, tente novamente.');
      setSnackbarOpen(true);
      console.log('Erro ao buscar tipo:', error);
      setError(true);
    }

    setBusy(false);
  }, []);

  useEffect(() => {
    if (!id) return;
    setBusy(true);
    fetchType();
  }, [id]);

  const handleNavigateToTypes = () => {
    navigate('/lessons/types');
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setName(inputValue);
  };

  const handleSaveType = async () => {
    try {
      const typeData = {
        name: name,
      };

      if (id) {
        await api({ baseURL: BASE_URL }).put(
          `/lessons/subject/type/${id}`,
          typeData
        );

        setSnackbarMessage('Tipo atualizado com sucesso.');
      } else {
        await api({ baseURL: BASE_URL }).post(
          `/lessons/subject/type/`,
          typeData
        );

        setSnackbarMessage('Tipo criado com sucesso.');
      }
      handleNavigateToTypes();
      setSnackbarOpen(true);
    } catch (error) {
      if (id) {
        console.log('Erro ao atualizar tipo:', error);
        setSnackbarMessage(
          'Erro ao atualizar o tipo. Por favor, tente novamente.'
        );
      } else {
        console.log('Erro ao criar tipo:', error);
        setSnackbarMessage('Erro ao criar o tipo. Por favor, tente novamente.');
      }
      setError(true);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container disableGutters maxWidth={false} className="lessonsContainer">
      <Box sx={{ height: '100vh' }}>
        <Box>
          <Typography variant="h4" fontWeight={500}>
            {id ? 'Editar' : 'Criar'} Tipo
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
              <>
                <Typography variant="h5" fontWeight={500}>
                  Ocorreu um erro. Tente novamente.
                </Typography>
                <ButtonYellow
                  text="VOLTAR"
                  icon={<ArrowBack />}
                  onClick={handleNavigateToTypes}
                />
              </>
            )}
          </Box>
        ) : (
          <Box sx={{ marginTop: '2rem' }}>
            <Typography variant="h5" fontWeight={500}>
              Nome do tipo:
            </Typography>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="classroomInput"
              style={{ height: '40px', width: '350px', fontSize: '16px' }} // Estilos personalizados
            />
          </Box>
        )}
      </Box>
      <div className="buttonContainer">
        <ButtonYellow
          text="Cancelar"
          styles={{}}
          onClick={handleNavigateToTypes}
        />
        <ButtonYellow text="Salvar" styles={{}} onClick={handleSaveType} />
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
