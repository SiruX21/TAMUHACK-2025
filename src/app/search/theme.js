'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121', // Dark gray for primary color
    },
    secondary: {
      main: '#757575', // Medium gray for secondary color
    },
    background: {
      default: '#121212', // Dark background for the page
      paper: '#1e1e1e', // Slightly lighter background for components
    },
    text: {
      primary: '#ffffff', // White text for better contrast on dark backgrounds
      secondary: '#b0b0b0', // Light gray text for secondary text
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`, // Updated font family
  },
});

export default theme;