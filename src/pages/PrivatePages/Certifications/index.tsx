import React, {useEffect, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import DomainIcon from "@mui/icons-material/Domain";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";
import {ICertification} from "@shared/ICertification";
import api from '@utils/api';
import {findAll, deleteById} from '@services/CertificationsService';

const Certifications = () => {
  const [certifications, setCertifications] = useState<ICertification[]>([]);
  const navigate = useNavigate();
  const getAll = async () => {
    const allCertifications = await findAll();
    setCertifications(allCertifications.data);
  }

  useEffect(() => {
    getAll();
  }, []);

  const deleteCertification = async (id: string|undefined) => {
	if(id) {
		await deleteById(id);
		navigate(0);
	}
  }

  const listItem = (certification: ICertification) => {
    return (
      <Box key={certification.id} display={'flex'} justifyContent={'space-between'} alignItems={'center'} bgcolor={'white'} padding={2} borderBottom={3} borderColor={'#EEF1EF'} mb={3}>
        <Box>
          <Typography typography="h6">{certification.name}</Typography>
          <Typography typography="body">Nível: {certification.level}</Typography>
          <Typography typography="body">Instituição: {certification.institution}</Typography>
        </Box>
        <Box >
          <Button onClick={() => { navigate(`/certificados/${certification.id}`) }}>
            <EditIcon style={{ color: 'black' }} />
          </Button>
          <Button onClick={() => { deleteCertification(certification.id) }}>
            <DeleteIcon style={{ color: '#B00020' }} />
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box width={'100%'} bgcolor={'#EEF1EF'}>
      <Box paddingX={"20%"} display={'flex'} alignContent={'stretch'} flexDirection={'column'}>
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} mb={5}>
          <DomainIcon sx={{
            color: "#F18F01",
            width: 36,
            height: 36
          }} />
          <Typography ml={'10px'} typography={'h4'}>Certificados</Typography>
        </Box>

        {certifications.map(certification => listItem(certification))}

        <Button onClick={() => navigate("/certificados/novo")} sx={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          color: "black",
          backgroundColor: '#F18F01',
          borderRadius: 8,
          padding: 2,
          alignItems: 'center'
        }}>
          <AddIcon />
          <Typography ml={2} typography={"body"}>Criar</Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default Certifications;