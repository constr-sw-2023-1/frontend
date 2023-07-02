import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DomainIcon from '@mui/icons-material/Domain';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '@components/Header';
import { useParams, useNavigate } from 'react-router-dom';


interface Shift {
    id: string;
    period: string;
}

const Shifts = () => {
    const [shifts, setShifts] = useState<Shift[]>([]);
    let navigate = useNavigate();


    const getAll = async () => {
        const response = await fetch('http://localhost:3000/api/shifts');
        const json = await response.json();

        const filteredShifts = json.filter((value: { active: boolean }) => value.active === true);

        setShifts(
            filteredShifts.map((value: { id: any; period: any }) => {
                return { id: value.id, period: value.period };
            })
        );
    };

    useEffect(() => {
        getAll();
    }, [])

    const createShift = () => {
        navigate('/create-shift');
    };

    const editShift = (id: string, currentValue: Shift) => {
        navigate(`/edit-shift/${id}`);
    };

    const deleteShift = async (id: string) => {
        const response = await fetch(`http://localhost:3000/api/shifts/${id}`, {
            method: "DELETE"
        });
        if (response.status !== 404) {
            getAll();
        }
    };

    const listItem = (index: number, shift: Shift) => {

        return (
            <Box key={index} display={'flex'} justifyContent={'space-between'} alignItems={'center'} bgcolor={'white'} padding={2} borderBottom={3} borderColor={'#EEF1EF'}>
                <Box>
                    <Typography variant="h6">{shift.period}</Typography>
                </Box>
                <Box>
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
        <>
            <Header />
            <Box width={'100%'} bgcolor={'#EEF1EF'}>
                <Box paddingTop={"5rem"} paddingLeft={'1rem'} paddingRight={'1rem'} display={'flex'} alignContent={'stretch'} flexDirection={'column'} >
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <DomainIcon sx={{
                            color: "#F18F01",
                            width: 36,
                            height: 36
                        }} />
                        <Typography ml={'10px'} variant={'h4'}>Períodos</Typography>
                    </Box>
                    {shifts.map((shift, index) => (
                        listItem(index, shift)
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
                        <Typography ml={2} variant={'h6'}>Criar</Typography>
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Shifts;
