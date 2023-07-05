import {
  Box,
  Container,
  Typography,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import '../index.css';
import { useNavigate, useParams } from 'react-router-dom';

import api from '@utils/api';
import { Add, ArrowBack } from '@mui/icons-material';
import { BASE_URL } from '../constants';
import { Lesson } from '../model/lesson';
import { Type } from '../model/type';
import ButtonYellow from '../components/ButtonYellow';
import { formatDatetime } from '../utils/formatDatetime';

export default function CreateEditSubject(): JSX.Element {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleNavigateToSubjects = () => {
    navigate('/lessons/subjects');
  };

  const handleNavigateToCreateLesson = () => {
    navigate('/lessons/create');
  };

  const handleNavigateToCreateType = () => {
    navigate('/lessons/types/create');
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setName(inputValue);
  };

  const handleLessonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedLessonId(selectedValue);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedTypeId(selectedValue);
  };

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState(false);

  const fetchSubject = useCallback(async () => {
    try {
      const response = await api({
        baseURL: BASE_URL,
      }).get(`/lessons/subject/${id}`);

      const subjectData = response.data;
      setName(subjectData.name);
      setSelectedLessonId(subjectData.lesson_id);
      setSelectedTypeId(subjectData.type_id);
      setBusy(false);
    } catch (error) {
      setError(true);
      setSnackbarMessage(
        'Erro ao buscar o assunto. Por favor, tente novamente.'
      );
      setSnackbarOpen(true);

      console.log('Erro ao buscar assunto:', error);
      setBusy(false);
    }
  }, [id]);

  const fetchLessons = useCallback(async () => {
    try {
      const allLessons = await api({
        baseURL: BASE_URL,
      }).get<Lesson[]>('/lesson/');

      setLessons(allLessons.data);
      setBusy(false);
    } catch (error) {
      setError(true);
      console.log('Erro ao buscar aulas:', error);
      setBusy(false);
    }
  }, []);

  const fetchTypes = useCallback(async () => {
    try {
      const allTypes = await api({
        baseURL: BASE_URL,
      }).get<Type[]>('/lessons/subject/type/');

      setTypes(allTypes.data);
      setBusy(false);
    } catch (error) {
      setError(true);
      console.log('Erro ao buscar tipos:', error);
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchSubject();
    }
    fetchLessons();
    fetchTypes();
  }, [fetchSubject, fetchLessons, fetchTypes]);

  const handleSaveSubject = async () => {
    setBusy(true);
    try {
      const subjectData = {
        name: name,
        lesson_id: selectedLessonId,
        type_id: selectedTypeId,
      };

      if (id) {
        await api({ baseURL: BASE_URL }).put(
          `/lessons/subject/${id}`,
          subjectData
        );

        setSnackbarMessage('Assunto atualizado com sucesso.');
      } else {
        await api({ baseURL: BASE_URL }).post(`lessons/subject`, subjectData);
        setSnackbarMessage('Assunto criado com sucesso.');
      }

      setSnackbarOpen(true);

      handleNavigateToSubjects(); // Redirecionar após a atualização
    } catch (error) {
      setError(true);
      if (id) {
        console.log('Erro ao atualizar assunto:', error);
        setSnackbarMessage(
          'Erro ao atualizar o assunto. Por favor, tente novamente.'
        );
      } else {
        console.log('Erro ao criar assunto:', error);
        setSnackbarMessage(
          'Erro ao criar o assunto. Por favor, tente novamente.'
        );
      }
      setSnackbarOpen(true);
      setBusy(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const lessonsFiltered = lessons.filter((lesson) => lesson.active === true);
  const typesFiltered = types.filter((type) => type.active === true);

  return (
    <Container disableGutters maxWidth={false} className="lessonsContainer">
      <Box sx={{ height: '100dvh' }}>
        <Box>
          <Typography variant="h4" fontWeight={500}>
            {id ? 'Editar' : 'Criar'} Assunto
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
                  onClick={handleNavigateToSubjects}
                />
              </>
            )}
          </Box>
        ) : (
          <Box sx={{ marginTop: '2rem' }}>
            <Typography variant="h5" fontWeight={500}>
              Nome do assunto:
            </Typography>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="classroomInput"
              style={{ height: '40px', width: '350px', fontSize: '16px' }} // Estilos personalizados
            />
            <Typography variant="h5" fontWeight={500}>
              Selecione a aula relacionada:
            </Typography>
            <select
              value={selectedLessonId || ''}
              onChange={handleLessonChange}
              className="dropdown"
              style={{ height: '40px', width: '350px', fontSize: '16px' }} // Estilos personalizados
            >
              <option value="">Selecione uma aula</option>
              {lessonsFiltered.map((lesson) => (
                <option key={lesson.uuid} value={lesson.uuid}>
                  {`${formatDatetime(new Date(lesson.datetime))} - ${
                    lesson.classroom
                  }`}
                </option>
              ))}
            </select>
            <Typography variant="h5" fontWeight={500}>
              Selecione o tipo relacionado:
            </Typography>
            <select
              value={selectedTypeId || ''}
              onChange={handleTypeChange}
              className="dropdown"
              style={{ height: '40px', width: '350px', fontSize: '16px' }} // Estilos personalizados
            >
              <option value="">Selecione um tipo</option>
              {typesFiltered.map((type) => (
                <option key={type.uuid} value={type.uuid}>
                  {type.name}
                </option>
              ))}
            </select>
          </Box>
        )}
      </Box>
      <div className="buttonContainer">
        <ButtonYellow
          text="Criar Tipo"
          icon={<Add />}
          onClick={handleNavigateToCreateType}
        />
        <ButtonYellow
          text="Criar Aula"
          icon={<Add />}
          onClick={handleNavigateToCreateLesson}
        />
        <ButtonYellow
          text="Cancelar"
          styles={{}}
          onClick={handleNavigateToSubjects}
        />
        <ButtonYellow text="Salvar" styles={{}} onClick={handleSaveSubject} />
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
