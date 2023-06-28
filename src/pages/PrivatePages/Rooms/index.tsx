import React, { useState } from 'react';
import { Box, Fab } from '@mui/material';

import './Rooms.scss';
import { AddRounded } from '@mui/icons-material';

const Rooms: React.FC = () => {
    const [linguagem1, setLinguagem1] = useState('');
    const [linguagem2, setLinguagem2] = useState('');
    const [linguagem3, setLinguagem3] = useState('');
    const [linguagem4, setLinguagem4] = useState('');

    const handleLinguagem1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLinguagem1(event.target.value);
    };

    const handleLinguagem2Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLinguagem2(event.target.value);
    };

    const handleLinguagem3Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLinguagem3(event.target.value);
    };

    const handleLinguagem4Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLinguagem4(event.target.value);
    };

    return (
        <div className="rooms-container">

            <Box textAlign={'left'} width={'20%'}>
                <h1>Criar/Editar sala</h1>
            </Box>

            <select style={{
                width: '424px'
            }} value={linguagem1} onChange={handleLinguagem1Change}>
                <option value="" disabled hidden>Número da sala</option>
                <option value="210" label="210" />
                <option value="211" label="211" />
                <option value="212" label="212" />
                <option value="213" label="213" />
            </select>

            <div className="select-container">

                <select value={linguagem2} onChange={handleLinguagem2Change}>
                    <option value="" disabled hidden>Capacidade máxima</option>
                    <option value="minus40"> Menos que 40</option>
                    <option value="between4050">Entre 40 e 50</option>
                    <option value="between5060">Entre 50 e 60</option>
                    <option value="more60">Mais que 60</option>
                </select>

                <select value={linguagem4} onChange={handleLinguagem4Change}>
                    <option value="" disabled hidden>Prédio</option>
                    <option value="Prédio 1">Prédio 1</option>
                    <option value="Prédio 2">Prédio 2</option>
                    <option value="Prédio 3">Prédio 3</option>
                    <option value="Prédio 4">Prédio 4</option>
                </select>


            </div>

            <select value={linguagem3} onChange={handleLinguagem3Change}>
                <option value="" disabled hidden>Tipo</option>
                <option value="Normal">Normal</option>
                <option value="Laboratório">Laboratório</option>
                <option value="Auditório">Auditório</option>
            </select>



            <Box position='fixed' right={12} bottom={12}>
                <Fab
                    color='primary'
                    aria-label='add'
                >
                    <AddRounded />
                </Fab>
            </Box>
        </div>
    );
};

export default Rooms;
