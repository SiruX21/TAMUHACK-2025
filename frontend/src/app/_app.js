// src/app/_app.js
import '../styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Chatbot from './components/Chatbot';
import { ChatbotProvider } from './context/ChatbotContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ChatbotProvider>
        <Component {...pageProps} />
        <Chatbot />
      </ChatbotProvider>
    </ThemeProvider>
  );
}

export default MyApp;