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

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '@utils/api';
import { BASE_URL } from '../constants';
import { ArrowBack } from '@mui/icons-material';

export default function CreateEditLesson(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [classroom, setClassroom] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const fetchLesson = useCallback(async () => {
    try {
      const response = await api({ baseURL: BASE_URL }).get(`/lesson/${id}`);
      const lessonData = response.data;
      setSelectedDate(new Date(lessonData.datetime));
      setClassroom(lessonData.classroom);
      setBusy(false);
    } catch (error) {
      setError(true);
      setSnackbarMessage('Erro ao buscar a aula. Por favor, tente novamente.');
      setSnackbarOpen(true);
      console.log('Erro ao buscar aula:', error);
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    setBusy(true);
    fetchLesson();
  }, [id]);

  const handleNavigateToLessons = () => {
    navigate('/lessons');
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleClassroomChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;

    // Verifica se o valor digitado é um número
    if (!isNaN(Number(inputValue))) {
      setClassroom(inputValue);
    }
  };

  const handleSaveLesson = async () => {
    try {
      const lessonData = {
        datetime: selectedDate,
        classroom: classroom,
      };

      if (!id) {
        await api({ baseURL: BASE_URL }).post('/lesson/', lessonData);
        setSnackbarMessage('Aula criada com sucesso.');
      } else {
        await api({ baseURL: BASE_URL }).put(`/lesson/${id}`, lessonData);
        setSnackbarMessage('Aula atualizada com sucesso.');
      }

      setSnackbarOpen(true);

      handleNavigateToLessons(); // Redirecionar após a atualização
    } catch (error) {
      setError(true);
      if (!id) {
        console.log('Erro ao criar aula:', error);
        setSnackbarMessage('Erro ao criar aula. Por favor, tente novamente.');
      } else {
        console.log('Erro ao atualizar aula:', error);
        setSnackbarMessage(
          'Erro ao atualizar a aula. Por favor, tente novamente.'
        );
      }
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container disableGutters maxWidth={false} className="lessonsContainer">
      <Box sx={{ height: '100dvh' }}>
        <Box>
          <Typography variant="h4" fontWeight={500}>
            {id ? 'Editar' : 'Criar'} Aula
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
                  onClick={handleNavigateToLessons}
                />
              </>
            )}
          </Box>
        ) : (
          <Box sx={{ marginTop: '2rem' }}>
            <Typography variant="h5" fontWeight={500}>
              Selecione a data e hora da aula:
            </Typography>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="dd/MM/yyyy HH:mm"
              placeholderText="DD/MM/YYYY HH:mm"
              className="datePicker"
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Horário"
              customInput={
                <input
                  className="customDatePickerInput"
                  style={{ height: '40px', width: '350px', fontSize: '16px' }} // Estilos personalizados
                />
              }
            />
            <Typography variant="h5" fontWeight={500}>
              Escreva o número da classe:
            </Typography>
            <input
              type="text"
              value={classroom}
              onChange={handleClassroomChange}
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
          onClick={handleNavigateToLessons}
        />
        <ButtonYellow text="Salvar" styles={{}} onClick={handleSaveLesson} />
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
