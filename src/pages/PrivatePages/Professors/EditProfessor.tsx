import { Alert, Autocomplete, Box, Container, IconButton, Input, List, ListItem, Snackbar, TextField, Typography } from '@mui/material';
import ButtonBlue from '@pages/PrivatePages/Professors/components/ButtonBlue';
import { Identification } from '@pages/PrivatePages/Professors/model/identification';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createCertification, deleteCertification, findById, update, updateCertification } from '@services/professorsService';
import { IProfessor } from './model/professor';
import dayjs, { Dayjs } from 'dayjs';
import { ProfessorCertification } from './model/certification';
import { ICertification } from '../Certifications/model/certification';
import { findAll } from '@services/certificationsService';


const EditProfessors = (): JSX.Element => {
  const [name, setName] = useState("");
  const [registration, setRegistration] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [admissionDate, setAdmissionDate] = useState<Dayjs | null>(null);
  const [identification, setIdentification] = useState<Identification[]>([]);
  const [originalCertification, setOriginalCertification] = useState<ProfessorCertification[]>([]);
  const [certification, setCertification] = useState<ProfessorCertification[]>([]);
  const [certificationOptions, setCertificationOptions] = useState<ICertification[]>([]);
  const [idCount, setIdCount] = useState<number>(0);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Erro ao se conectar com o servidor.');

  const navivate = useNavigate();

  const { id } = useParams();

  useEffect(() => {

    const init = async () => {

      const certs = (await findAll()).data;
      setCertificationOptions(certs.map((c: any) => { return { label: c.name, id: c.id } }))

      if (id) {
        const professor = (await findById(id)).data;
        setName(professor.name || "");
        setRegistration(professor.registration || "");
        setEmail(professor.email || "");
        setBirthDate(dayjs(professor.bornDate));
        setAdmissionDate(dayjs(professor.admissionDate));
        setIdentification(professor.identifications.map((i: any) => { setIdCount(idCount + 1); return { id: idCount, type: i.type, value: i.value } as Identification }));
        setOriginalCertification(professor.certifications.map((i: any) => { setIdCount(idCount + 1); return { id: idCount, year: i.year, semester: i.semester, uuid: i.certificationId } as ProfessorCertification }));
        setCertification(professor.certifications.map((i: any) => { setIdCount(idCount + 1); return { id: idCount, year: i.year, semester: i.semester, uuid: i.certificationId } as ProfessorCertification }));
      }

    }

    init();
  }, []);

  const displayErrorToast = () => setShowErrorSnackbar(true)

  const hideErrorToast = (_: any) => setShowErrorSnackbar(false)

  const handleSuccessSnackbarClose = () => setShowSuccessSnackbar(false);

  const handleNavigateToProfessor = () => navivate("/professors");

  const handleUpdateProfessor = async () => {
    try {

      const professorData: IProfessor = {
        registration: registration,
        name: name,
        bornDate: birthDate as Dayjs,
        admissionDate: admissionDate as Dayjs,
        active: true,
        identifications: identification.map((e) => { return { type: e.type, value: e.value } as Identification })
      };

      await update(id!, professorData);

      originalCertification.forEach(async (c) => {
        await deleteCertification(id!, c.uuid!)
      })

      certification.forEach(async (c) => {
        await createCertification(id!, c.uuid!, {year: c.year, semester: c.semester})
      })

      setShowSuccessSnackbar(true);

      handleNavigateToProfessor(); // Redirecionar após o salvamento
    } catch (error: any) {
      setErrorMessage(error.message)
      setShowErrorSnackbar(true);
    }
  };

  const getSequential = () => {
    setIdCount(idCount + 1)
    return idCount;
  }

  const handleAddIdentification = (element: Identification) => {
    element.id = getSequential()
    setIdentification([...identification, element])
  }

  const handleRemoveIdentification = (id: Number) => {
    const newIdentification = identification.filter((ident) => ident.id != id)
    setIdentification(newIdentification)
  }

  const handleUpdateIdentification = (element: Identification) => {
    const newIdentification = identification.map((ident) => ident.id != element.id ? ident : element)
    setIdentification(newIdentification)
  }

  const handleAddCertification = (element: ProfessorCertification) => {
    element.id = getSequential()
    setCertification([...certification, element])
  }

  const handleRemoveCertification = (id: Number) => {
    const newCertification = certification.filter((ident) => ident.id !== id)
    setCertification(newCertification)
  }

  const handleUpdateCertification = (element: ProfessorCertification) => {
    const newCertification = certification.map((ident) => ident.id !== element.id ? ident : element)
    setCertification(newCertification)
  }

  const handleProfessorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Container>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <WorkOutlinedIcon htmlColor="#005288" />
          <Typography variant="h4" fontWeight={500}>
            Editar Professor
          </Typography>
        </Box>

        <Box sx={{ marginTop: "2rem" }}>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Input
              type="text"
              value={name}
              placeholder="Nome do Professor"
              onChange={handleProfessorChange}
              className="professorInput"
              fullWidth={true}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
            <Input
              type="text"
              value={registration}
              placeholder="Matrícula"
              onChange={(event) => setRegistration(event.target.value)}
              className="professorInput"
              fullWidth={true}
            />

            <Input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              className="professorInput"
              fullWidth={true}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField fullWidth={true} value={birthDate} onChange={(event) => setBirthDate(event)} label="Data de Nascimento" />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField fullWidth={true} value={admissionDate} onChange={(event) => setAdmissionDate(event)} label="Data de Admissão" />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>

      <List sx={{ width: '100%', bgcolor: '#005288', padding: '1rem', marginTop: '1rem', borderRadius: '.5rem' }}>
        <Typography sx={{ color: "white" }}>Identificadores</Typography>
        {identification.map((id) => (
          <ListItem
            key={id.id}
            disableGutters
            secondaryAction={
              <IconButton onClick={() => handleRemoveIdentification(id.id!)} aria-label="comment">
                <DeleteIcon />
              </IconButton>
            }
            sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}
          >
            <Input
              value={id.type}
              sx={{ color: "white" }}
              fullWidth={true}
              placeholder="Nome"
              onChange={({ target }) => { id.type = target.value, handleUpdateIdentification(id) }}
              className="professorInput"
            />
            <TextField
              value={id.value}
              InputProps={{
                style: {
                  color: "white"
                }
              }}
              fullWidth={true}
              multiline
              placeholder="Descrição"
              onChange={({ target }) => { id.value = target.value, handleUpdateIdentification(id) }}
              className="professorInput"
            />
          </ListItem>
        ))}
      </List>
      <IconButton onClick={() => handleAddIdentification({ type: "", value: "" } as Identification)}>
        <AddIcon />
      </IconButton>

      <List sx={{ width: '100%', bgcolor: '#005288', padding: '1rem', marginTop: '1rem', borderRadius: '.5rem' }}>
        <Typography sx={{ color: "white" }}>Certificações</Typography>
        {certification.map((cert) => (
          <ListItem
            key={cert.id}
            disableGutters
            secondaryAction={
              <IconButton onClick={() => handleRemoveCertification(cert.id!)} aria-label="comment">
                <DeleteIcon />
              </IconButton>
            }
            sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}
          >

            <Autocomplete
              disablePortal
              fullWidth
              value={cert.uuid ? certificationOptions.find(option => option.id === cert.uuid) : null}
              onChange={(_,value) => { cert.uuid = value!.id, handleUpdateCertification(cert) }}
              options={certificationOptions}
              sx={{ color: "white" }}
              renderInput={(params) => <TextField {...params} placeholder='Certificação' />}
            />

            <Box sx={{ display: "flex", flexDirection: "row", width: "50vw", gap: "1rem", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
              <Input
                value={cert.year}
                sx={{ color: "white" }}
                fullWidth={true}
                placeholder="Ano"
                onChange={({ target }) => { cert.year = target.value, handleUpdateCertification(cert) }}
                className="professorInput"
              />

              <Input
                value={cert.semester}
                sx={{ color: "white" }}
                fullWidth={true}
                placeholder="Semestre"
                onChange={({ target }) => { cert.semester = target.value, handleUpdateCertification(cert) }}
                className="professorInput"
              />
            </Box>



          </ListItem>
        ))}
      </List>
      <IconButton onClick={() => handleAddCertification({ year: "", semester: "" } as ProfessorCertification)}>
        <AddIcon />
      </IconButton>
      <div className="buttonContainer">
        <ButtonBlue text="Voltar" styles={{}} onClick={handleNavigateToProfessor} />
        <ButtonBlue text="Salvar" styles={{}} onClick={handleUpdateProfessor} />
      </div>
      <Snackbar open={showSuccessSnackbar} autoHideDuration={3000} onClose={handleSuccessSnackbarClose}>
        <Alert onClose={handleSuccessSnackbarClose} severity="success" sx={{ width: '100%', backgroundColor: '#33B864', color: 'white' }}>
          Professor criado/atualizado com sucesso
        </Alert>
      </Snackbar>
      <Snackbar open={showErrorSnackbar} autoHideDuration={5000} onClose={hideErrorToast}>
        <Alert onClose={hideErrorToast} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default EditProfessors;