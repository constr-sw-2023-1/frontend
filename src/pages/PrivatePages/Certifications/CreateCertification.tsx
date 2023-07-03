import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import DomainIcon from "@mui/icons-material/Domain";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useParams } from "react-router-dom";
import { create, update, findById } from '@services/CertificationsService';
import ButtonBlue from "../Professors/components/ButtonBlue";


const CreateCertification = () => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [institution, setInstitution] = useState("");
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (id) {
        const certification = await findById(id);
        setName(certification.data.name);
        setLevel(certification.data.level);
        setInstitution(certification.data.institution);
      }
    }

    init();
  }, []);

  const saveCertification = async () => {
    if (id) {

      await update(id, { name, level, institution }).then(() => { setShowSuccessSnackbar(true); navigate(`/professors/certifications`) }).catch(err => {
        setShowErrorSnackbar(true);
        console.log("Erro ao atualizar professor:", err);
      });

    } else {

      await create({ name, level, institution }).then(() => { setShowSuccessSnackbar(true); navigate(`/professors/certifications`) }).catch(err => {
        setShowErrorSnackbar(true);
        console.log("Erro ao salvar certificado:", err);
      });

    }
  }

  const handleSuccessSnackbarClose = () => {
    setShowSuccessSnackbar(false);
  };

  const handleErrorSnackbarClose = () => {
    setShowErrorSnackbar(false);
  };

  return (
    <Box width={'100%'} height={'100vh'}>
      <Box paddingX={"20%"} display={'flex'} alignContent={'stretch'} flexDirection={'column'}>
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} mb={5}>
          <DomainIcon sx={{
            color: "#005288",
            width: 36,
            height: 36
          }} />
          <Typography ml={'10px'} typography={'h4'}>Criar/Editar Certificado</Typography>
        </Box>

        <TextField
          label="Nome"
          fullWidth
          sx={{ mb: 3 }}
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
        <TextField
          label="Nível"
          fullWidth
          sx={{ mb: 3 }}
          value={level}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setLevel(event.target.value);
          }}
        />
        <TextField
          label="Instituição"
          fullWidth
          sx={{ mb: 3 }}
          value={institution}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInstitution(event.target.value);
          }}
        />

        <Box sx={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <ButtonBlue icon={<CancelIcon/>} text="Cancelar" onClick={() => navigate(`/professors/certifications`) }/>
          <ButtonBlue icon={<CheckCircleIcon/>} text="Salvar" onClick={() => saveCertification()}/>
        </Box>
      </Box>
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleSuccessSnackbarClose}
      >
        <Alert
          onClose={handleSuccessSnackbarClose}
          severity="success"
          sx={{ width: '100%', backgroundColor: '#33B864', color: 'white' }}
        >
          Certificado criado/atualizado com sucesso
        </Alert>
      </Snackbar>
      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={3000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert
          onClose={handleErrorSnackbarClose}
          severity="error"
          sx={{ width: '100%', backgroundColor: '#B90E0A', color: 'white' }}
        >
          Erro ao criar/atualizar certificado
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CreateCertification;