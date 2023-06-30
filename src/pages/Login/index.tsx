import { Alert, Box, Button, Container, Snackbar, TextField } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { textField } from './styles';
import logo from '../../assets/logo-pucrs.webp';
import { useNavigate } from 'react-router-dom';

import { login } from '@services/auth/authService';

const LoginPage = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const displayErrorToast = () => {
      setOpen(true);
    };
  
    const hideErrorToast = (_: any) => {  
      setOpen(false);
    };

    const doLogin = async () => {
        try {
            const loginResponse = await login(email, password);
            
            if (loginResponse) {
                localStorage.setItem('JWT_TOKEN', loginResponse.access_token)
                localStorage.setItem('REFRESH_TOKEN', loginResponse.refresh_token)
                navigate('/dashboard');
            }
            
        } catch (error) {
            displayErrorToast();
            console.error(error);
        }
    };

    return (
        <Container disableGutters maxWidth={false} sx={{
            width: '100%',
            height: '100vh',
            backgroundColor: '#f6f8fa',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
            paddingTop: '20vh',
            gap: '2rem',
        }}>
            <img src={logo} alt='logo' />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                backgroundColor: '#fff',
                padding: '30px 60px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,.2)',
            }}>
                <TextField id="email" label="Email" variant="outlined" value={email} onChange={({ target }) => setEmail(target.value)} sx={textField} />
                <TextField id="password" label="Senha" variant="outlined" type='password' value={password} onChange={({ target }) => setPassword(target.value)} sx={textField} />
                <Button
                    variant="contained"
                    onClick={doLogin}
                    sx={{
                        height: '50px',
                        lineHeight: '50px',
                    }}
                >Login</Button>
            </Box>
            <Snackbar open={open} autoHideDuration={5000} onClose={hideErrorToast}>
                <Alert onClose={hideErrorToast} severity="error" sx={{ width: '100%' }}>
                    Erro ao fazer login - verifique suas credenciais
                </Alert>
            </Snackbar>
        </Container>
    )
};

export default LoginPage;