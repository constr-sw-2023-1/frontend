import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DomainIcon from '@mui/icons-material/Domain';
import DeleteIcon from '@mui/icons-material/Delete';

const Shifts = () => {
  const [shifts, setShifts] = useState([]);

  const getAll = async () => {
    const response = await fetch('http://localhost:3000/api/shifts', {
      headers: {
        "Accept": "application/json"
      }
    });
    setShifts(await response.json())
  }

  useEffect(() => {
    getAll();
  }, [])

  const createShift = () => {
    setShifts([...shifts, `Periodo ${shifts.length}`]);
  };

  const editShift = (id, currentValue) => {
    //todo: go to edit page
  };

  const deleteShift = async (id) => {
    const response = await fetch(`http://localhost:3000/api/shifts/${id}`, {
      method: "DELETE"
    });
    if (response.status != 404) {
      getAll();
    }
  };

  const listItem = (index, shift) => {
    const title = `${shift.period}`;

    return (
      <Box key={index} display={'flex'} justifyContent={'space-between'} alignItems={'center'} bgcolor={'white'} padding={2} borderBottom={3} borderColor={'#EEF1EF'}>
        <Box>
          <Typography typography="h6">{title}</Typography>
        </Box>
        <Box >
          <Button onClick={() => {
            editShift(shift.id, shift);
          }}>
            <EditIcon style={{ color: 'black' }} />
          </Button>
          <Button onClick={() => {
            deleteShift(shift.id);
          }}>
            <DeleteIcon style={{ color: '#B00020' }} />
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box width={'100%'} bgcolor={'#EEF1EF'}>
      <Box paddingX={"20%"} display={'flex'} alignContent={'stretch'} flexDirection={'column'} >
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
          <DomainIcon sx={{
            color: "#F18F01",
            width: 36,
            height: 36
          }} />
          <Typography ml={'10px'} typography={'h4'}>Períodos</Typography>
        </Box>
        <Box>
        <Typography ml={'10px'} typography={'h6'}>Lista de períodos</Typography>
        </Box>
        {shifts.map((shifts, index) => (
          listItem(index, shifts)
        ))}
        <Button onClick={createShift} sx={{
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
};

export default Shifts;
