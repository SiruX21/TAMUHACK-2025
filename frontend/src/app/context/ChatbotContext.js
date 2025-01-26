// src/app/context/ChatbotContext.js
'use client';
import React, { createContext, useState } from 'react';

export const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <ChatbotContext.Provider value={{ messages, setMessages }}>
      {children}
    </ChatbotContext.Provider>
  );
};