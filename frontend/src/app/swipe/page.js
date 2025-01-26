'use client';
import * as React from 'react';
import Head from 'next/head';
import { Container, Typography, AppBar, Toolbar, Box, IconButton, Card, CardContent, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ArrowBack, ArrowForward, Close, Check, SaveAlt, Share, ContactMail } from '@mui/icons-material';
import theme from './theme.js';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component from Next.js

function SwipePage() {
  const [swipeIndex, setSwipeIndex] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);

  const items = [
    {
      name: '2025 4Runner',
      msrp: '$40,770',
      mpg: '20/26',
      image: '/toyotapics/4Runner.jpg', // Example image URL
    },
    {
      name: '2025 Camry',
      msrp: '$28,700',
      mpg: '53/50',
      image: '/toyotapics/Camry.jpg', // Example image URL
    },
    {
      name: '2024 RAV4',
      msrp: '$28,675',
      mpg: '27/35',
      image: '/toyotapics/Rav4.jpg', // Example image URL
    },
    {
      name: '2025 Sienna',
      msrp: '$39,185',
      mpg: '36/36',
      image: '/toyotapics/Sienna.jpg', // Example image URL
    },
    {
      name: '2025 Corolla',
      msrp: '$22,325',
      mpg: '32/41',
      image: '/toyotapics/Corolla.jpg', // Example image URL
    },
    {
      name: '2024 Venza',
      msrp: '$37,070',
      mpg: '40/37',
      image: '/toyotapics/Venza.jpg', // Example image URL
    },
  ];

  const handleSwipe = (direction) => {
    if (direction === 'right' && swipeIndex < items.length - 1) {
      setSwipeIndex(swipeIndex + 1);
    } else if (direction === 'left' && swipeIndex > 0) {
      setSwipeIndex(swipeIndex - 1);
    }
  };

  const { name, msrp, mpg, image } = items[swipeIndex];

  const handleCardClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Pantry Raid Co - Swipe Page</title>
          <meta name="description" content="Swipe through your pantry preferences" />
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <img
                  src="toyota_w.png"
                  alt="Toyota Matchmaker"
                  style={{ marginRight: 10, height: 30 }}
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    color: 'white',
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
          <Container maxWidth="md" sx={{ paddingTop: '80px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: 'calc(100vh - 64px)', // Full height minus AppBar
              }}
            >
              {/* Left Arrow */}
              <IconButton
                onClick={() => handleSwipe('left')}
                color="primary"
                sx={{
                  backgroundColor: '#c9c9c9', // Red for dislike
                  padding: '10px',
                  borderRadius: '50%',
                  position: 'absolute',
                  left: '10%',
                  zIndex: 10,
                  fontSize: '2rem',
                  '&:hover': {
                    backgroundColor: '#a1a1a1', // Darker background on hover
                  },
                }}
              >
                <ArrowBack fontSize="inherit" />
              </IconButton>

              {/* Swipe Card */}
              <Card
                sx={{
                  width: '100%',
                  height: '300px',
                  maxWidth: 2000,
                  marginBottom: 4,
                  padding: 2,
                  backgroundColor: '#ffffff', // White background
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  '&:hover': {
                    backgroundColor: '#bfbfbf', // Light grey on hover
                    cursor: 'pointer',
                  },
                }}
                onClick={handleCardClick}
              >
                <Box sx={{ flex: 1 }}>
                  <CardContent>
                    <Typography
                      variant="h3"
                      color="primary"
                      mb={2}
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      {name}
                    </Typography>
                    <Typography variant="h5" color="black" mb={1}>
                      Starting MSRP: <span style={{ fontWeight: 'normal' }}>{msrp}</span>
                    </Typography>
                    <Typography variant="h5" color="black" mb={4}>
                      Est. MPG: <span style={{ fontWeight: 'normal' }}>{mpg}</span>
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        startIcon={<SaveAlt />}
                        sx={{
                          color: '#fff',
                          textTransform: 'none',
                          backgroundColor: '#5cb85c', // Green for save
                          fontSize: 'rem',
                          padding: '8px 15px',
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        startIcon={<Share />}
                        sx={{
                          color: '#fff',
                          textTransform: 'none',
                          backgroundColor: '#0275d8', // Blue for share
                          fontSize: '1rem',
                          padding: '8px 15px',
                        }}
                      >
                        Share
                      </Button>
                      <Button
                        startIcon={<ContactMail />}
                        sx={{
                          color: '#fff',
                          textTransform: 'none',
                          backgroundColor: '#d93a3a', // Red for contact
                          fontSize: '1rem',
                          padding: '8px 15px',
                        }}
                      >
                        Contact
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
                <Box
                  component="img"
                  src={image}
                  alt={name}
                  sx={{
                    flex: 0.5,
                    height: '225px',
                    width: '400px',
                    borderRadius: '8px',
                    objectFit: 'cover', // Ensures the image covers the space without distortion
                  }}
                />
              </Card>

              {/* Right Arrow */}
              <IconButton
                onClick={() => handleSwipe('right')}
                color="primary"
                sx={{
                  backgroundColor: '#c9c9c9', // Green for like
                  padding: '10px',
                  borderRadius: '50%',
                  position: 'absolute',
                  right: '10%',
                  zIndex: 10,
                  fontSize: '2rem',
                  '&:hover': {
                    backgroundColor: '#a1a1a1', // Darker background on hover
                  },
                }}
              >
                <ArrowForward fontSize="inherit" />
              </IconButton>

              {/* Like and Dislike buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                <IconButton
                  onClick={() => handleSwipe('left')}
                  color="primary"
                  sx={{
                    backgroundColor: '#e57373', // Red for dislike
                    padding: '10px',
                    borderRadius: '50%',
                    fontSize: '2rem',
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>

                <IconButton
                  onClick={() => handleSwipe('right')}
                  color="primary"
                  sx={{
                    backgroundColor: '#5cb85c', // Green for like
                    padding: '10px',
                    borderRadius: '50%',
                    fontSize: '2rem',
                  }}
                >
                  <Check fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </main>

        {/* Pop-up Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          maxWidth="md"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: 'white', // Set dialog background to white
              color: 'black', // Ensure text color inside the dialog is black
            },
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust backdrop transparency if necessary
            },
          }}
        >
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Image at the top */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Image
                src={image}  // Dynamically load the image
                alt={name}
                width={800}
                height={300}
                style={{
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </Box>

            {/* Name emphasized below the image */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                marginTop: 2,
                marginBottom: 1,
                textAlign: 'center',
                color: '#333', // Dark color for better contrast
              }}
            >
              {name}
            </Typography>

            {/* MSRP and MPG beside each other */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 2 }}>
              <Typography variant="h6" sx={{ color: '#555' }}>
                MSRP: <span style={{ fontWeight: 'normal' }}>{msrp}</span>
              </Typography>
              <Typography variant="h6" sx={{ color: '#555' }}>
                MPG: <span style={{ fontWeight: 'normal' }}>{mpg}</span>
              </Typography>
            </Box>

            {/* Additional Details */}
            <Typography variant="body1" sx={{ color: 'black' }}>
              Additional details about the product...
            </Typography>
          </DialogContent>

          {/* Dialog Actions */}
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default SwipePage;
