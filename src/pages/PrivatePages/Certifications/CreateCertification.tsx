import React, {useEffect, useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import DomainIcon from "@mui/icons-material/Domain";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useNavigate, useParams} from "react-router-dom";
import api from "@utils/api";
import {ICertification} from "@shared/ICertification";
import {create, update, findById} from '@services/CertificationsService';


const CreateCertification = () => {
  const [certificationId, setCertificationId] = useState<string>();
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [institution, setInstitution] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect( () => {
		const init = async() => {
			if (id) {
				const certification = await findById(id);
				setCertificationId(certification.data.id);
				setName(certification.data.name);
				setLevel(certification.data.level);
				setInstitution(certification.data.institution);
			}
		}

		init();
  }, []);

  const saveCertification = async () => {
    if (id) {
      await update(id, {name, level, institution});
			navigate(`/certificados`);
    } else {
      await create({name, level, institution}).catch(err => alert(err.message));
			navigate(`/certificados`);
    }
  }

  return (
    <Box width={'100%'} height={'100vh'}>
      <Box paddingX={"20%"} display={'flex'} alignContent={'stretch'} flexDirection={'column'}>
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} mb={5}>
          <DomainIcon sx={{
            color: "#F18F01",
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
        }}>
          <Button onClick={() => navigate(-1)} sx={{
            color: "black",
            backgroundColor: '#F18F01',
            borderRadius: 8,
            padding: 2,
            margin: 2,
            alignItems: 'center'
          }}>
            <CancelIcon />
            <Typography ml={2} typography={"body"}>Cancelar</Typography>
          </Button>

          <Button onClick={() => saveCertification()} sx={{
            color: "black",
            backgroundColor: '#F18F01',
            borderRadius: 8,
            padding: 2,
            margin: 2,
            alignItems: 'center'
          }}>
            <CheckCircleIcon />
            <Typography ml={2} typography={"body"}>Salvar</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateCertification;