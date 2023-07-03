import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Barlow',
  },
  palette: {
    primary: {
      main: '#5D707F'
    },
    secondary: {
      main: '#F18F01'
    },
    text: {
      primary: '#434343',
      secondary: '#7E7E7E'
    },
    error: {
      main: '#E53E3E'
    },
    background: {
      default: '#EEF1EF',
    },
    mode: 'light'
  },
});

export default theme;