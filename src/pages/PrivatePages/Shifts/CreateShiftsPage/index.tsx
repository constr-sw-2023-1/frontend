import React, { ChangeEvent, useState } from 'react';
import Header from '@components/Header';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type ShiftsProps = {
    name: string;
};

const CreateShiftsPage: React.FC<ShiftsProps> = ({ name }) => {
    const [shiftName, setShiftName] = useState(name);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setShiftName(event.target.value);
    };

    const handleDeleteText = () => {
        setShiftName('');
    }


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
                        Criar/Editar período
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
                                    onClick={() => handleDeleteText()}
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
                    variant="contained"
                    style={{ marginTop: '1.5rem' }}>
                    Confirmar
                </Button>
            </Box>
        </>
    );


};

export default CreateShiftsPage;

