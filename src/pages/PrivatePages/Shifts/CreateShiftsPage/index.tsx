import React, { ChangeEvent, useState } from 'react';
import Header from '@components/Header';
import { Alert, Box, Button, IconButton, Snackbar, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

type ShiftsProps = {
    id?: string;
    name: string;
};

const CreateShiftsPage: React.FC<ShiftsProps> = () => {
    const { id, name } = useParams();
    const [shiftName, setShiftName] = useState(name);
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setShiftName(event.target.value);
    };

    const handleDeleteText = () => {
        setShiftName('');
    };

    const generateUUID = () => {
        const uuid = uuidv4();
        return uuid;
    };

    const handleSuccessSnackbarClose = () => {
        setShowSuccessSnackbar(false);
    };

    const handleErrorSnackbarClose = () => {
        setShowErrorSnackbar(false);
    };

    const handleClick = () => {
        if (id) {
            axios
                .put(`http://localhost:3000/api/shifts/${id}`, {
                    period: shiftName,
                })
                .then((_) => {
                    setShowSuccessSnackbar(true);
                    setTimeout(() => {
                        navigate(-1);
                    }, 2000);
                })
                .catch((_) => {
                    setShowErrorSnackbar(true);
                });
        } else {
            axios
                .post('http://localhost:3000/api/shifts', {
                    id: generateUUID(),
                    period: shiftName,
                })
                .then((_) => {
                    setShowSuccessSnackbar(true);
                    setTimeout(() => {
                        navigate(-1);
                    }, 2000);
                })
                .catch((_) => {
                    setShowErrorSnackbar(true);
                });
        }
    };

    return (
        <>
            <Header />
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '5rem',
                    fontFamily: 'monospace',
                }}
            >
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        width: '44rem',
                    }}
                >
                    <Typography
                        typography="h4"
                        style={{
                            paddingBottom: '1.25rem',
                            fontWeight: 700,
                        }}
                    >
                        {id ? 'Editar período' : 'Criar período'}
                    </Typography>
                    <TextField
                        id="shiftname"
                        label={!shiftName ? 'Nome do período' : 'Nome do período'}
                        fullWidth
                        variant="outlined"
                        style={{
                            backgroundColor: '#FFFFFF',
                        }}
                        value={shiftName}
                        onChange={handleNameChange}
                        InputProps={{
                            endAdornment: shiftName && (
                                <IconButton
                                    onClick={handleDeleteText}
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <CloseIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Box>
                <Button
                    onClick={handleClick}
                    variant="contained"
                    style={{ marginTop: '1.5rem' }}
                >
                    Confirmar
                </Button>
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
                    Período criado/atualizado com sucesso
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
                    Erro ao criar/atualizar período
                </Alert>
            </Snackbar>
        </>
    );
};

export default CreateShiftsPage;
