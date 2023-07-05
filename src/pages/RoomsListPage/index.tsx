import { AddRounded, SearchRounded } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Fab,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import SalaItem from './Components/RoomItem';
import api from '@utils/api';
const Salas = [
  {
    number: 1,
    capacity: 30,
    building: "Prédio 30",
    type: "Auditório"
  },{
    number: 2,
    capacity: 30,
    building: "Prédio 30",
    type: "Laboratório"
  },{
    number: 3,
    capacity: 40,
    building: "Prédio 30",
    type: "Laboratório"
  }
]
export default function PrediosSalas() {
  const [Rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("cheguei aqui");


  const getAllClasses = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8085/room', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer root', // Replace with your actual bearer token
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      } else {
        console.error('Failed to fetch classes:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);
console.log(Rooms);

  useEffect(() => {
    getAllClasses();
  }, [getAllClasses]);

  return (
    <Grid container gap={1} padding={1} flexDirection='column' justifyContent='center' alignItems='center'>
      <Box textAlign='left'width={'50%'}>
      <Grid item>
          <Typography fontWeight='bold' variant='h6' textAlign='left'>Salas</Typography>
      </Grid>
        <Typography  style={{ opacity: 0.9 }} color='#5D707F' fontSize={'16px'} textAlign='left'>
          Lista de salas
        </Typography>
      </Box>
      <Grid display='flex' alignItems='center' justifyContent='center'>
      </Grid>
      <Grid display='flex' flexDirection='column' item gap={1} justifyContent='center' width='50%'>
             {Salas.map((p, i) => {
          return (
            <SalaItem
              key={i}
              sala={p}
            />
          );
        })}
      </Grid>
      <Grid>
      </Grid>
      <Box position='fixed' right={12} bottom={12}>
        <Fab
          color='primary'
          aria-label='add'
        >
          <AddRounded />
        </Fab>
      </Box>
    </Grid>
  );
}
