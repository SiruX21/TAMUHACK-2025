'use client';
import * as React from 'react';
import Head from 'next/head';
import { Container, Typography, AppBar, Toolbar, Box, IconButton, Card, CardContent, Button, Dialog, DialogActions, DialogContent, Link as MuiLink } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ArrowBack, ArrowForward, Close, Check, SaveAlt, Share, ContactMail } from '@mui/icons-material';
import theme from './theme.js';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component from Next.js


function SwipePage() {
  const [swipeIndex, setSwipeIndex] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [sortedItems, setSortedItems] = React.useState([]);
  const [savedCars, setSavedCars] = React.useState([]);

  const items = [
    {
      name: '2025 4Runner',
      id: '4Runner',
      msrp: '$40,770',
      mpg: '20/26',
      image: '/toyotapics/4Runner.jpg', // Example image URL
      url: 'https://www.toyota.com/4runner/'
    },
    {
      name: '2025 Camry',
      id: 'Camry',
      msrp: '$28,700',
      mpg: '53/50',
      image: '/toyotapics/Camry.jpg', // Example image URL
      url: 'https://www.toyota.com/camry/'
    },
    {
      name: '2024 RAV4',
      id: 'RAV4',
      msrp: '$28,675',
      mpg: '27/35',
      image: '/toyotapics/Rav4.jpg', // Example image URL
      url: 'https://www.toyota.com/rav4/'
    },
    {
      name: '2025 Sienna',
      id: 'Sienna',
      msrp: '$39,185',
      mpg: '36/36',
      image: '/toyotapics/Sienna.jpg', // Example image URL
      url: 'https://www.toyota.com/sienna/'
    },
    {
      name: '2025 Corolla',
      id: 'Corolla',
      msrp: '$22,325',
      mpg: '32/41',
      image: '/toyotapics/Corolla.jpg', // Example image URL
      url: 'https://www.toyota.com/corolla/'
    },
    {
      name: '2024 Venza',
      id: 'Venza',
      msrp: '$37,070',
      mpg: '40/37',
      image: '/toyotapics/Venza.jpg', // Example image URL
      url: 'https://www.toyota.com/venza/'
    },
    {
      name: '2025 GR Corolla',
      id: 'GR Corolla',
      msrp: '$46,633',
      mpg: '27/22',
      image: '/toyotapics/GRCorolla.jpg', // Example image URL
      url: 'https://www.toyota.com/grcorolla/'
    },
    {
      name: '2025 Sequoia',
      id: 'Sequoia',
      msrp: '$64,395',
      mpg: '22/20',
      image: '/toyotapics/Sequoia.jpg', // Example image URL
      url: 'https://www.toyota.com/sequoia/'
    },
    {
      name: '2025 Tundra',
      id: 'Tundra',
      msrp: '$41,995',
      mpg: '22/19',
      image: '/toyotapics/Tundra.jpg', // Example
      url: 'https://www.toyota.com/tundra/'
    },
    {
      name: '2025 Tacoma',
      id: 'Tacoma',
      msrp: '$42,470',
      mpg: '24/23',
      image: '/toyotapics/Tacoma.jpg', // Example
      url: 'https://www.toyota.com/tacoma/'
    },
    {
      name: '2025 Supra',
      id: 'Supra',
      msrp: '$52,500',
      mpg: '30/27',
      image: '/toyotapics/Supra.jpg', // Example
      url: 'https://www.toyota.com/supra/'
    },
    {
      name: '2025 Highlander',
      id: 'Highlander',
      msrp: '$43,315',
      mpg: '35/35',
      image: '/toyotapics/Highlander.jpg', // Example image URL
      url: 'https://www.toyota.com/highlander/'
    },
    {
      name: '2025 Corolla Cross',
      id: 'Corolla Cross',
      msrp: '$29,305',
      mpg: '38/42',
      image: '/toyotapics/CorollaCross.jpg', // Example image URL
      url: 'https://www.toyota.com/corollacross/'
    },
    {
      name: '2025 Crown',
      id: 'Crown',
      msrp: '$55,000',
      mpg: '32/30',
      image: '/toyotapics/Crown.jpg', // Example image URL
      url: 'https://www.toyota.com/crown/'
    },
    {
      name: '2025 Land Cruiser',
      id: 'Land Cruiser',
      msrp: '$85,515',
      mpg: '24/23',
      image: '/toyotapics/LandCruiser.jpg', // Example image URL
      url: 'https://www.toyota.com/landcruiser/'
    },
    {
      name: '2025 Mirai',
      id: 'Mirai',
      msrp: '$70,500',
      mpg: '67/64',
      image: '/toyotapics/Mirai.jpg', // Example image URL
      url: 'https://www.toyota.com/mirai/'
    },
    {
      name: '2025 Prius',
      id: 'Prius',
      msrp: '$28,525',
      mpg: '58/53',
      image: '/toyotapics/Prius.jpg', // Example image URL
      url: 'https://www.toyota.com/prius/'
    },
    {
      name: '2025 GR 86',
      id: 'GR86',
      msrp: '$29,495',
      mpg: '30/24',
      image: '/toyotapics/GR86.jpg', // Example image URL
      url: 'https://www.toyota.com/gr86/'
    },
    {
      name: '2025 Prius Prime',
      id: 'Prius Prime',
      msrp: '$35,470',
      mpg : '51/52',
      image: '/toyotapics/PriusPrime.jpg', // Example image URL
      url: 'https://www.toyota.com/priusprime/'
    },
    {
      name: '2025 RAV4 Prime',
      id: 'RAV4 Prime',
      msrp: '$43,575',
      mpg: '36/38',
      image: '/toyotapics/Rav4Prime.jpg', // Example image URL
      url: 'https://www.toyota.com/rav4prime/'
    }
  ];

  // Read the cars object from session storage
  React.useEffect(() => {
    const carsString = sessionStorage.getItem('cars') || '';
    console.log('Cars string from session storage:', carsString);

    const cars = carsString.split('\n').map(car => car.trim());
    console.log('Parsed cars array:', cars);

    if (cars.length > 0) {
      // Sort items to move the items with IDs present in the cars object to the top
      const sorted = [...items].sort((a, b) => {
        if (cars.includes(a.id) && !cars.includes(b.id)) {
          return -1;
        }
        if (!cars.includes(a.id) && cars.includes(b.id)) {
          return 1;
        }
        return 0;
      });

      console.log('Sorted items:', sorted);
      setSortedItems(sorted);
    } else {
      setSortedItems(items);
    }
  }, []);

  const handleSwipe = (direction) => {
    if (direction === 'right' && swipeIndex < sortedItems.length - 1) {
      setSwipeIndex(swipeIndex + 1);
    } else if (direction === 'left' && swipeIndex > 0) {
      setSwipeIndex(swipeIndex - 1);
    }
  };

  const handleSaveCar = () => {
    const carToSave = sortedItems[swipeIndex];
    setSavedCars([...savedCars, carToSave]);
  };

  const { name, msrp, mpg, image } = sortedItems[swipeIndex] || {};

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
                      Est. MPG (Highway/City): <span style={{ fontWeight: 'normal' }}>{mpg}</span>
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
                        onClick={handleSaveCar}
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
  onClick={() => {
    const carUrl = sortedItems[swipeIndex]?.url;
    if (carUrl) {
      navigator.clipboard.writeText(carUrl).then(() => {
        alert('Car URL copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    } else {
      alert('No URL available for this car.');
    }
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
                          href="mailto:support@toyota.com"
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
                onClick={() => {
                  handleSwipe('right');
                }}
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
                  onClick={() => {
                    handleSwipe('right');
                    handleSaveCar();
                  }}
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

        {/* Saved Cars */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            left: 16,
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            Saved Cars
          </Typography>
          {savedCars.map((car, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              {car.url ? (
                <MuiLink href={car.url} target="_blank" rel="noopener" color="primary">
                  {car.name}
                </MuiLink>
              ) : (
                <Typography variant="body1" color="black">
                  {car.name}
                </Typography>
              )}
              <Typography variant="body1" color="black">
                {car.msrp}
              </Typography>
            </Box>
          ))}
        </Box>

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