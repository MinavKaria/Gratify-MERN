import React, { createContext, useContext, useState } from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import Grid from '@mui/material/Grid';
import memories from './images/memories.jpeg';
import memories2 from './images/memories-removebg-preview.png';
import logo from './images/logo.png';
import Posts from './Posts/Posts';
import Form from './Form/Form';
import './App.css';
import theme from './theme';
import { styles } from './styles';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isUpdated, setIsUpdated] = useState(false);

  const updateOtherComponent = () => {
    setIsUpdated(isUpdated => !isUpdated);
  };

  return (
    <AppContext.Provider value={{ isUpdated, updateOtherComponent }}>
      {children}
    </AppContext.Provider>
  );
};



function App() 
{
  const [currentId, setCurrentId] = useState(null);
  const [updatePost, setUpdatePost] = useState({
    creator: '', title: '', message: '', tags: [''], selectedFile: null,
  });
  return (
    <AppProvider>
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit" sx={styles.appBar}>
          <Typography variant="h2" align="center" sx={styles.title}>
            GratifyConnect
          </Typography>
          <img src={logo} alt="memories" style={styles.headingImage}  draggable='false'/>
        </AppBar>
        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3} 
            sx={styles.MainContainer}
            >
              <Grid item xs={12} sm={12} md={12} lg={8}>
                <Posts setCurrentId={setCurrentId} setUpdatePost={setUpdatePost}/>
              </Grid>
              <Grid item xs={12} sm={0} md={0} lg={4}>
                <Form  currentId={currentId} setCurrentId={setCurrentId} setUpdatePost={setUpdatePost} updatePost={updatePost}/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </AppProvider>
  );
}

export default App;
