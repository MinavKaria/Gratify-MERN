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
        <AppBar position="static" color="inherit" sx={{
          borderRadius: 15,
          margin: '30px 0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Typography variant="h2" align="center" sx={{
            color: 'rgba(0,183,255, 1)',
          }} >
            GratifyConnect
          </Typography>
          <img src={logo} alt="memories" style={{
            marginLeft: '15px',
            width: '80px',
            height: '80px',
            marginTop: '10px',
          }}  draggable='false'/>
        </AppBar>
        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={12} md={9} lg={8}>
                <Posts setCurrentId={setCurrentId} setUpdatePost={setUpdatePost}/>
              </Grid>
              <Grid item xs={12} sm={0} md={3} lg={4}>
                <Form  currentId={currentId} setCurrentId={setCurrentId} setUpdatePost={setUpdatePost} updatePost={updatePost}/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
        <div style={{height:100}}>

        </div>
      </Container>
    </AppProvider>
  );
}

export default App;
