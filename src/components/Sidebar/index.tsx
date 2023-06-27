import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    useTheme,
    Box,
    Drawer,
    List,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Tab from '@components/Tab';

export default function Sidebar() {
    const { palette: { text } } = useTheme()
    const navigate = useNavigate()
    const [selected, setSelected] = useState<string>('Home')

    function handleTabClick(tabName: string, screenToNavigate: string) {
        setSelected(tabName)
        navigate(screenToNavigate)
    }

    return (
        <Box sx={{
            width: '20%',
            height: '100%',
            bgcolor: 'blue'
        }}>
            <Drawer
                sx={{
                    width: '100%',
                    height: '100%',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '20%',
                        height: '100%',
                        boxSizing: 'border-box',
                        py: '3rem',
                        borderWidth: 0,
                    },
                }}
                variant={'permanent'}
                anchor={'left'}
            >
                <Typography
                    sx={{
                        fontSize: '1.625rem',
                        fontWeight: 700,
                        color: text.primary,
                        cursor: 'pointer',
                        pl: '2rem',
                        mb: '3rem',
                    }}
                >
                    {'MySchool'}
                </Typography>
                <List>
                    {[
                        { name: 'Home', icon: <HomeIcon /> },
                        { name: 'Salas', icon: <HomeIcon /> },
                        { name: 'Aulas', icon: <HomeIcon /> },
                        { name: 'Disciplinas', icon: <HomeIcon /> },
                        { name: 'Alunos', icon: <HomeIcon /> },
                        { name: 'Professores', icon: <HomeIcon /> },
                        { name: 'Turmas', icon: <HomeIcon /> },
                        { name: 'Reservas', icon: <HomeIcon /> },
                        { name: 'Recursos', icon: <HomeIcon /> },
                    ].map(({ name, icon }, index) => (
                        <Tab
                            key={index}
                            icon={icon}
                            name={name}
                            onClick={() => handleTabClick(name, '')}
                            isSelected={selected === name}
                        />
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}