'use client';
import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Typography, AppBar, Toolbar, Box, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js';

function Search() {
  const [selectedOptions, setSelectedOptions] = React.useState(() => {
    // Retrieve the initial state from session storage if available
    const savedOptions = sessionStorage.getItem('selectedOptions');
    return savedOptions ? JSON.parse(savedOptions) : [];
  });

  const questions = [
    {
      question: 'What are you looking for?',
      options: [
        'Price',
        'Comfort',
        'Safety',
        'Space',
        'Efficiency',
        'Reliability',
      ],
    },
  ];

  const handleOptionClick = (option) => {
    if (selectedOptions.length < 3 || selectedOptions.includes(option)) {
      let newSelectedOptions = [...selectedOptions];

      if (newSelectedOptions.includes(option)) {
        newSelectedOptions = newSelectedOptions.filter(item => item !== option);
      } else {
        newSelectedOptions.push(option);
      }

      setSelectedOptions(newSelectedOptions);
    }
  };

  React.useEffect(() => {
    // Save the selected options to session storage whenever it changes
    sessionStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  const { question, options } = questions[0];

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Toyota Matchmaker - Search</title>
          <meta name="description" content="Search for your perfect match based on preferences." />
          <link rel="icon" href="favicon.ico" />
        </Head>

        {/* Background */}
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#f5f5f5', // Keeping the original background color
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
                height: 'calc(100vh - 64px)',
              }}
            >
              {/* Decorative Box for Question and Options */}
              <Box
                sx={{
                  backgroundColor: '#ffffff', 
                  padding: '30px',
                  borderRadius: '16px',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: '600px',
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  mb={1}
                  fontWeight="bold"
                  sx={{ color: '#000000' }}
                >
                  {question}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ color: '#555555', marginBottom: '20px' }}
                >
                  Choose your top three vehicle qualities to match your needs.
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  {options.map((option, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      color={selectedOptions.includes(option) ? 'error' : 'secondary'}
                      sx={{
                        textTransform: 'none',
                        fontSize: '1rem',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        backgroundColor: selectedOptions.includes(option) ? '#d93a3a' : '#e57373',
                        '&:hover': {
                          backgroundColor: selectedOptions.includes(option) ? '#d93a3a' : '#d93a3a',
                        },
                        opacity: selectedOptions.length >= 3 && !selectedOptions.includes(option) ? 0.5 : 1, // Reduced opacity for disabled options
                      }}
                      onClick={() => handleOptionClick(option)}
                      disabled={selectedOptions.length >= 3 && !selectedOptions.includes(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </Box>
              </Box>

              {/* Submit Button */}
              <Box mt={4}>
                <Link href="/swipe" passHref>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      padding: '10px 30px',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      backgroundColor: selectedOptions.length === 3 ? '#d93a3a' : '#e57373',
                      '&:hover': {
                        backgroundColor: selectedOptions.length === 3 ? '#d93a3a' : '#e57373',
                      },
                    }}
                    disabled={selectedOptions.length !== 3}
                  >
                    Submit
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

export default Search;