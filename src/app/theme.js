'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#dd8850',
    },
    secondary: {
        main: '#dd885090'
    }
  },
  typography: {
    fontFamily: 'Pacifico, Bubblegum Sans, sans-serif',
    color: '#dc004e',
  },
});

export default theme;