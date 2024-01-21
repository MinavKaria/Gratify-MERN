import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme.jsx'; 
import { AppProvider } from './App.jsx';
import { BrowserRouter } from 'react-router-dom';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
        <BrowserRouter>
         <App />
        </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
  </React.StrictMode>
);
