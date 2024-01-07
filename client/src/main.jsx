import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme.jsx'; 
import { AppProvider } from './App.jsx';

document.body.style.backgroundImage = theme.palette.bodyBackgroundImage;
document.body.style.backgroundColor = theme.palette.backgroundColoring;
document.body.style.backgroundSize = theme.palette.backgroundSizing;
document.body.style.backgroundRepeat = theme.palette.backgroundRepeating;
document.body.style.backgroundPosition = theme.palette.backgroundPositioning;
console.log(theme.palette.backgroundColoring);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
          <App />
        </AppProvider>
      </ThemeProvider>
  </React.StrictMode>
);
