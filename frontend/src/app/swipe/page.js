'use client';
import * as React from 'react';
import Head from 'next/head';
import { Container, Typography, AppBar, Toolbar, Box, IconButton, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ArrowBack, ArrowForward, Close, Check, SaveAlt, Share, ContactMail } from '@mui/icons-material';
import theme from './theme.js';
import Link from 'next/link';

function SwipePage() {
  const [swipeIndex, setSwipeIndex] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);

  const items = [
    {
      name: 'Luxury Sofa',
      msrp: '$1,299',
      mpg: 'N/A',
    },
    {
      name: 'Electric Car',
      msrp: '$35,000',
      mpg: '120 MPG-e',
    },
    {
      name: 'Hybrid SUV',
      msrp: '$40,000',
      mpg: '30 MPG',
    },
    {
      name: 'Smart Refrigerator',
      msrp: '$2,499',
      mpg: 'N/A',
    },
    {
      name: 'Sleek Lamp',
      msrp: '$159',
      mpg: 'N/A',
    },
    {
      name: 'Cooking Range',
      msrp: '$1,799',
      mpg: 'N/A',
    },
  ];

  const handleSwipe = (direction) => {
    if (direction === 'right' && swipeIndex < items.length - 1) {
      setSwipeIndex(swipeIndex + 1);
    } else if (direction === 'left' && swipeIndex > 0) {
      setSwipeIndex(swipeIndex - 1);
    }
  };

  const { name, msrp, mpg } = items[swipeIndex];

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

        {/* Background */}
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#f5f5f5', // Light grey background
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
                component="a"
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
                  height: '500px',
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
                      MSRP: <span style={{ fontWeight: 'normal' }}>{msrp}</span>
                    </Typography>
                    <Typography variant="h5" color="black" mb={4}>
                      Miles Per Gallon: <span style={{ fontWeight: 'normal' }}>{mpg}</span>
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        startIcon={<SaveAlt />}
                        sx={{
                          color: '#fff',
                          textTransform: 'none',
                          backgroundColor: '#5cb85c', // Green for save
                          fontSize: '1rem',
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
                <Box sx={{ flex: 0.5, height: '300px', backgroundColor: '#cccccc', borderRadius: '8px' }} /> {/* Placeholder Image Box */}
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
          <DialogTitle sx={{ color: 'black' }}>{name}</DialogTitle>
          <DialogContent>
            <Typography variant="h6" mb={2} sx={{ color: 'black' }}>MSRP: {msrp}</Typography>
            <Typography variant="h6" mb={2} sx={{ color: 'black' }}>Miles Per Gallon: {mpg}</Typography>
            <Box sx={{ height: 200, backgroundColor: '#cccccc', marginBottom: 2 }} /> {/* Placeholder Image Box */}
            <Typography variant="body1" sx={{ color: 'black' }}>Additional details about the product...</Typography>
          </DialogContent>
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
