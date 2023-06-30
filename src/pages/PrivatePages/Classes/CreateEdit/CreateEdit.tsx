import { useState, useEffect } from 'react';
import { Alert, AlertTitle, Box, Button, FormControl, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import DomainIcon from '@mui/icons-material/Domain';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams, useNavigate } from 'react-router-dom';

const CreateEdit = () => {
  const [classe, setClasse] = useState<classeInterface>({
    id: "",
    numClass: '',
    year: '',
    semester: '',
    classShiftId: "",
    active: false
  });
  const [shifts, setShifts] = useState<shiftInterface[]>();

  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  interface shiftInterface {
    id: string | undefined,
    period: string | undefined,
  }

  interface classeInterface {
    id: string | undefined,
    semester: string | undefined,
    year: string | undefined,
    numClass: string | undefined,
    classShiftId: string | undefined,
    active: boolean | undefined
  }

  let params = useParams();
  let navigate = useNavigate();

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
      classShiftId: json.classShiftId,
      active: json.active
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
    setShowError(false);
    const response = await fetch('http://localhost:3000/api/classes', {
      method: 'POST',
      body: JSON.stringify({ ...classe, schedule: [] }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status !== 201) {
      setShowError(true)
      return
    }
    navigate('/Turmas');
  }

  const updateClass = async () => {
    setShowError(false);
    console.log(`http://localhost:3000/api/classes/${classe.id}`);
    const response = await fetch(`http://localhost:3000/api/classes/${classe.id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...classe, schedule: [] }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.status !== 200) {
      setShowError(true)
      return
    }
    navigate('/Turmas');
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
        {showError && (<Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>)}
        <Box display={'flex'} flexDirection={'column'} flexWrap={'wrap'} gap={5} marginTop={5}>
          <TextField label="ID da Turma (UUID v4)" value={classe ? classe.id : ''} onChange={(e) => {
            setClasse({ numClass: classe?.numClass, year: classe?.year, semester: classe?.semester, classShiftId: classe?.classShiftId, active: classe?.active, id: e.target.value });
          }} />
          <TextField label="Número da Turma" value={classe ? classe.numClass : ''} onChange={(e) => {
            setClasse({ id: classe?.id, year: classe?.year, semester: classe?.semester, classShiftId: classe?.classShiftId, active: classe?.active, numClass: e.target.value });
          }} />
          <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} gap={5}>
            <TextField label="Semestre" value={classe ? classe.semester : ''} onChange={(e) => {
              setClasse({ id: classe?.id, year: classe?.year, numClass: classe?.numClass, classShiftId: classe?.classShiftId, active: classe?.active, semester: e.target.value });
            }} />
            <TextField label="Ano" value={classe ? classe.year : ''} onChange={(e) => {
              setClasse({ id: classe?.id, numClass: classe?.numClass, semester: classe?.semester, classShiftId: classe?.classShiftId, active: classe?.active, year: e.target.value });
            }} />
          </Box>
          <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} gap={5}>
            <FormControl fullWidth sx={{ maxWidth: '210px' }}>
              <InputLabel id="period-label">Período</InputLabel>
              <Select
                labelId='period-label'
                label="Período"
                value={classe ? classe.classShiftId : ''}
                onChange={(e) => {
                  if (e.target.value !== '') setClasse({ id: classe?.id, numClass: classe?.numClass, semester: classe?.semester, year: classe?.year, active: classe?.active, classShiftId: e.target.value });
                }}
              >
                <MenuItem value={''}>Período</MenuItem>
                {shifts?.map((shift) => (
                  <MenuItem value={shift.id}>{shift.period}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box>
              <Typography mb={'2'} typography={'caption'}>Ativo:</Typography>
              <Switch color={'warning'} checked={classe.active} onChange={(e) => {
                setClasse({ id: classe?.id, numClass: classe?.numClass, semester: classe?.semester, classShiftId: classe?.classShiftId, year: classe?.year, active: e.target.checked });
              }}></Switch>
            </Box>
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