'use client';
import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js';

function Home() {
  const [zipCode, setZipCode] = React.useState('');

  // Handle zip code input change
  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };


  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Toyota Matchmaker</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="favicon.ico" />
        </Head>

        {/* Background */}
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#f5f5f5',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            zIndex: -1,
          }}
        />

        <main>
          <Container maxWidth="md">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                height: '100vh',
              }}
            >
              <Box mb={2}>
                <img src="toyota_re.png" alt="Toyota Matchmaker Logo" style={{ width: '100px', height: '100px' }} />
              </Box>

              <Typography variant="h2" color="primary" component="h1" mb={0.5} sx={{ fontWeight: 'bold' }}>
                Toyota Matchmaker
              </Typography>

              <Typography variant="body1" color="primary" fontSize="1.5rem" mb={3}>
                Find the car of your dreams!
              </Typography>

              {/* Zip code input */}
              <TextField
                variant="outlined"
                size="large"
                placeholder="Enter Your Zip Code Here..."
                value={zipCode}
                onChange={handleZipCodeChange}
                sx={{
                  backgroundColor: 'white',
                  borderColor: '#333333',
                  color: '#d3d3d3',
                  width: '300px',
                  height: '55px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#333333',
                    },
                    '&:hover fieldset': {
                      borderColor: '#333333',
                    },
                    '& input': {
                      color: '#7b7b7b',
                    },
                    '& placeholder': {
                      color: '#7b7b7b',
                    },
                  },
                }}
              />

              {/* Start Button */}
              <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
                <Link href={`/location?zip=${zipCode}`} passHref>
                  <Button
                    variant="contained"
                    sx={{
                      padding: '1px 90px',
                      fontSize: '1.2rem',
                      color: '#ffffff',
                      backgroundColor: '#ea4141',
                      width: '100px',
                      height: '35px',
                      '&:hover': {
                        backgroundColor: '#d93a3a',
                      },
                    }}
                  >
                    Start
                  </Button>
                </Link>
              </Box>
            </Box>
          </Container>
        </main>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default Home;
