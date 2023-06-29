import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DomainIcon from '@mui/icons-material/Domain';
import DeleteIcon from '@mui/icons-material/Delete';

const Classes = () => {
  const [classes, setClasses] = useState([]);

  const getAll = async () => {
    const response = await fetch('http://localhost:3000/api/classes', {
      headers: {
        "Accept": "application/json"
      }
    });
    setClasses(await response.json())
  }

  useEffect(() => {
    getAll();
  }, [])

  const createClass = () => {
    setClasses([...classes, `Turma ${classes.length}`]);
  };

  const editClass = (id, currentValue) => {
    //todo: go to edit page
  };

  const deleteClass = async (id) => {
    const response = await fetch(`http://localhost:3000/api/classes/${id}`, {
      method: "DELETE"
    });
    if (response.status != 404) {
      getAll();
    }
  };

  const listItem = (index, classe) => {
    const title = `Turma ${classe.numClass}`;

    return (
      <Box key={index} display={'flex'} justifyContent={'space-between'} alignItems={'center'} bgcolor={'white'} padding={2} borderBottom={3} borderColor={'#EEF1EF'}>
        <Box>
          <Typography typography="h6">{title}</Typography>
          <Typography typography="body">Ano: {classe.year}</Typography>
          <Typography typography="body">Semestre: {classe.semester}</Typography>
        </Box>
        <Box >
          <Button onClick={() => {
            editClass(classe.id, classe);
          }}>
            <EditIcon style={{ color: 'black' }} />
          </Button>
          <Button onClick={() => {
            deleteClass(classe.id);
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
          <Typography ml={'10px'} typography={'h4'}>Turmas</Typography>
        </Box>
        {classes.map((classe, index) => (
          listItem(index, classe)
        ))}
        <Button onClick={createClass} sx={{
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

export default Classes;
