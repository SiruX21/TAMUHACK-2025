// src/app/components/Chatbot.js
'use client';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, IconButton, Paper } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { ChatbotContext } from '../context/ChatbotContext';

const Chatbot = () => {
  const { messages, setMessages } = useContext(ChatbotContext);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef(null);

  const handleSendMessage = async (message) => {
    if (message.trim() === '') return;

    const newMessage = { text: message, sender: 'user' };
    setMessages([...messages, newMessage]);

    try {
      const response = await fetch(`http://localhost:5000/chat-suggestion?input_text=${encodeURIComponent(message)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: message }),
      });

      if (response.ok) {
        const data = await response.text();
        setMessages((prevMessages) => [...prevMessages, newMessage, { text: data, sender: 'bot' }]);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const clearChat = async () => {
      try {
        await fetch('http://localhost:5000/clear-chat', {
          method: 'GET',
        });
      } catch (error) {
        console.error('Error clearing chat:', error);
      }
    };

    clearChat();
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: "Hi! I'm Ms. Yota and here to help with any questions!", sender: 'bot' }]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          width: 56,
          height: 56,
          backgroundColor: '#ea4141',
          color: 'white',
          '&:hover': {
            backgroundColor: '#d93a3a',
          },
          zIndex: 1000,
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </IconButton>

      {isOpen && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: '300px',
            height: '400px',
            backgroundColor: 'white',
            boxShadow: 3,
            borderRadius: 2,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#ea4141', // Change this to your desired header background color
              color: 'white', // Change this to your desired text color
              p: 1,
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
            }}
          >
            <Typography variant="h6">Chatbot</Typography>
          </Box>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    maxWidth: '80%',
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: message.sender === 'user' ? '#ea4141' : '#e0e0e0',
                    color: message.sender === 'user' ? 'white' : 'black',
                  }}
                >
                  {message.text}
                </Box>
              </Box>
            ))}
            <div ref={chatEndRef} />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={input}
              placeholder="type here"
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(input);
                  setInput(''); // Clear the input field after sending the message
                }
              }}
              sx={{
                mb: 1,
                '& .MuiOutlinedInput-root': {
                  '& input': {
                    color: 'black',
                  },
                  '& fieldset': {
                    borderColor: '#333333',
                  },
                  '&:hover fieldset': {
                    borderColor: '#333333',
                  },
                  '&::placeholder': {
                    color: 'lightgray',
                  },
                },
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                handleSendMessage(input);
                setInput(''); // Clear the input field after sending the message
              }}
            >
              Send
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default Chatbot;