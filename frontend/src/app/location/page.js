'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams from next/navigation
import Head from 'next/head';
import { Container, Typography, AppBar, Toolbar, Box, Button, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import theme from './theme.js';
import Link from 'next/link'; // Import Link from Next.js

const locations = [
  { name: 'Beverly Hills', address: '123 Beverly Hills Blvd, Beverly Hills, CA' },
  { name: 'Santa Monica', address: '456 Santa Monica Blvd, Santa Monica, CA' },
  { name: 'Hollywood', address: '789 Hollywood Blvd, Hollywood, CA' },
  { name: 'Venice', address: '101 Venice Beach, Venice, CA' },
  { name: 'Westwood', address: '202 Westwood Blvd, Los Angeles, CA' },
  { name: 'Brentwood', address: '303 Brentwood Ave, Los Angeles, CA' },
  { name: 'Pasadena', address: '404 Pasadena Ave, Pasadena, CA' },
  { name: 'Downtown LA', address: '505 Downtown LA, Los Angeles, CA' },
  { name: 'Culver City', address: '606 Culver City Blvd, Culver City, CA' },
];

// Function to chunk the locations array into smaller arrays of size 3
const chunkLocations = (locations, size) => {
  const result = [];
  for (let i = 0; i < locations.length; i += size) {
    result.push(locations.slice(i, i + size));
  }
  return result;
};

function Location() {
  const searchParams = useSearchParams();
  const zip = searchParams.get('zip'); // Extract the zip code from the URL query parameters

  const [currentLocationSet, setCurrentLocationSet] = React.useState(0);
  const locationChunks = chunkLocations(locations, 3); // Divide locations into chunks of 3

  const handleNavigate = (direction) => {
    if (direction === 'next' && currentLocationSet < locationChunks.length - 1) {
      setCurrentLocationSet(currentLocationSet + 1);
    } else if (direction === 'prev' && currentLocationSet > 0) {
      setCurrentLocationSet(currentLocationSet - 1);
    }
  };

  const handleDirectNavigation = (index) => {
    setCurrentLocationSet(index);
  };

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Toyota Matchmaker - Locations</title>
          <meta name="description" content="Locations for Toyota Matchmaker" />
          <link rel="icon" href="favicon.ico" />
        </Head>

        {/* Background with background image */}
        <Box
          sx={{
            display: 'flex',
            backgroundImage: 'url("/background.png")', // Add background image
            backgroundSize: 'cover', // Make sure the image covers the entire page
            backgroundPosition: 'center', // Center the image
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            zIndex: -1,
          }}
        />

        {/* AppBar */}
        <AppBar position="fixed" sx={{ backgroundColor: '#ea4141' }}>
          <Toolbar>
            <Link href="/" passHref>
              {/* Wrap the logo and text in a Link */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none', // Remove underline
                  color: 'inherit', // Ensure it takes the theme's color
                }}
              >
                <img
                  src="toyota_w.png"
                  alt="Toyota Matchmaker"
                  key="logo"
                  style={{ marginRight: 10, height: 30 }}
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    fontWeight: 'bold',
                    color: 'white', // Ensure it's white
                  }}
                >
                  Toyota Matchmaker
                </Typography>
              </Box>
            </Link>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <main>
          <Container
            maxWidth="md"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              position: 'relative',
            }}
          >
            {/* Main Box */}
            <Box
              sx={{
                backgroundColor: '#ffffff',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
                width: '100%',
                maxWidth: '700px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Typography
                variant="h4" // Adjusted size
                color="primary"
                component="h1"
                mb={2}
                sx={{
                  fontWeight: 'bold', // Bold text
                  textDecoration: 'none', // Removed underline
                }}
              >
                Locations near {zip}
              </Typography>

              {/* Show the current set of locations */}
              {locationChunks[currentLocationSet].map((location, index) => (
                <Link
                  key={index}
                  href={{
                    pathname: '/search',
                    query: { id: index },
                  }}
                  passHref
                >
                  <Button
                    sx={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '15px',
                      backgroundColor: '#ea4141',
                      borderRadius: '8px',
                      mb: 2,
                      color: 'white',
                      textTransform: 'none',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      '&:hover': {
                        backgroundColor: '#b23030',
                      },
                    }}
                  >
                    <Typography variant="h5" color="white" fontWeight="bold">
                      {location.name}
                    </Typography>
                    <Typography variant="body1" color="white" sx={{ fontSize: '1rem' }}>
                      {location.address}
                    </Typography>
                  </Button>
                </Link>
              ))}

              {/* Pagination Controls */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                <IconButton onClick={() => handleNavigate('prev')} color="primary" sx={{ mx: 1 }}>
                  <ArrowBack />
                </IconButton>
                {locationChunks.map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => handleDirectNavigation(index)}
                    sx={{
                      mx: 1,
                      fontWeight: currentLocationSet === index ? 'bold' : 'normal',
                      backgroundColor: currentLocationSet === index ? '#ea4141' : '#e57373',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#d93a3a',
                      },
                    }}
                  >
                    {index + 1}
                  </Button>
                ))}
                <IconButton onClick={() => handleNavigate('next')} color="primary" sx={{ mx: 1 }}>
                  <ArrowForward />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </main>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default Location;