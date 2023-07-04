import { Alert, Container, Snackbar } from '@mui/material';
import React, { useState } from 'react';

const EditProfessors = (): JSX.Element => {
    const [name, setName] = useState("");
    const [registration, setRegistration] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [admissionDate, setAdmissionDate] = useState<Date | null>(null);
    const [identification, setIdentification] = useState<Identification[]>([]);
    const [idCount, setIdCount] = useState<number>(0);
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Erro ao se conectar com o servidor.');

    const displayErrorToast = () => setOpen(true)

    const hideErrorToast = (_: any) => setOpen(false)

    const handleSuccessSnackbarClose = () => setShowSuccessSnackbar(false);


    return (
        <Container>
            <div className="buttonContainer">
                <ButtonBlue text="Cancelar" styles={{}} onClick={handleNavigateToProfessor} />
                <ButtonBlue text="Salvar" styles={{}} onClick={handleSaveProfessor} />
            </div>
            <Snackbar open={showSuccessSnackbar} autoHideDuration={3000} onClose={handleSuccessSnackbarClose}>
                <Alert onClose={handleSuccessSnackbarClose} severity="success" sx={{ width: '100%', backgroundColor: '#33B864', color: 'white' }}>
                    Professor criado/atualizado com sucesso
                </Alert>
            </Snackbar>
            <Snackbar open={open} autoHideDuration={5000} onClose={hideErrorToast}>
                <Alert onClose={hideErrorToast} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}