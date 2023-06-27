import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import DomainIcon from '@mui/icons-material/Domain';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams } from 'react-router-dom';

const CreateEdit = () => {
  const [classe, setClasse] = useState<classeInterface>();
  const [shifts, setShifts] = useState<shiftInterface[]>();

  interface shiftInterface {
    id: string | undefined,
    period: string | undefined,
  }

  interface classeInterface {
    id: string | undefined,
    semester: string | undefined,
    year: string | undefined,
    numClass: string | undefined,
    shift: string | undefined
  }

  let params = useParams();

  useEffect(() => {
    if (params.id !== '0') {
      getClass();
    }
    getShifts();
  }, [])

  const getClass = async () => {
    const response = await fetch(`http://localhost:3000/api/classes/${params.id}`)
    const json = await response.json();
    setClasse({
      id: json.id,
      numClass: json.numClass,
      semester: json.semester,
      year: json.year,
      shift: json.classShiftId
    })

  }

  const getShifts = async () => {
    const response = await fetch(`http://localhost:3000/api/shifts`)
    const json = await response.json();
    setShifts(json.map((value: { id: any; period: any; }) => {
      return { id: value.id, period: value.period }
    }))

  }

  const createClass = async () => {
    console.log('create');
    
  }

  const updateClass = async () => {
    console.log('update');
    
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
          <Typography ml={'10px'} typography={'h4'}>Turma {classe?.numClass}</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} flexWrap={'wrap'} gap={5} marginTop={5}>
          <TextField label="Número da Turma" value={classe ? classe.numClass : ''} onChange={(e) => {
            setClasse({ id: classe?.id, year: classe?.year, semester: classe?.semester, shift: classe?.shift, numClass: e.target.value });
          }} />
          <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} gap={5}>
            <TextField label="Semestre" value={classe ? classe.semester : ''} onChange={(e) => {
              setClasse({ id: classe?.id, year: classe?.year, numClass: classe?.numClass, shift: classe?.shift, semester: e.target.value });
            }} />
            <TextField label="Ano" value={classe ? classe.year : ''} onChange={(e) => {
              setClasse({ id: classe?.id, numClass: classe?.numClass, semester: classe?.semester, shift: classe?.shift, year: e.target.value });
            }} />
          </Box>
          <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} gap={5}>
            <FormControl fullWidth sx={{ maxWidth: '210px' }}>
              <InputLabel id="period-label">Período</InputLabel>
              <Select
                labelId='period-label'
                label="Período"
                value={classe ? classe.shift : ''}
                onChange={(e) => {
                  if (e.target.value !== '') setClasse({ id: classe?.id, numClass: classe?.numClass, semester: classe?.semester, year: classe?.year, shift: e.target.value });
                }}
              >
                <MenuItem value={'Período'}>Período</MenuItem>
                {shifts?.map((shift) => (
                  <MenuItem value={shift.id}>{shift.period}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label="Horário" value={classe ? classe.year : ''} onChange={(e) => {
              setClasse({ id: classe?.id, numClass: classe?.numClass, semester: classe?.semester, shift: classe?.shift, year: e.target.value });
            }} />
          </Box>
        </Box>
        <Button onClick={params.id === '0' ? createClass : updateClass} sx={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          color: "black",
          backgroundColor: '#F18F01',
          borderRadius: 8,
          padding: 2,
          alignItems: 'center'
        }}>
          <CheckCircleIcon />
          <Typography ml={2} typography={"body"}>Salvar</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default CreateEdit;