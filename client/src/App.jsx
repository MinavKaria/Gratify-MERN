import React, { createContext, useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import Grid from '@mui/material/Grid';
import memories from './images/memories.jpeg';
import memories2 from './images/memories-removebg-preview.png';
import logo from './images/logo.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import './App.css';
import theme from './theme';
import { styles } from './styles';
import Navbar from './components/Navbar';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [isLogin, setIsLogin] = useState(false);

  const logout = () => {
    setUser(null);
    localStorage.clear();
  }

  useEffect(() => {
    if (user!=null) {
      setIsLogin(true);
    }else
    {
      setIsLogin(false);
    }
  }, [user]);

  const login = (user) => {
    setUser(user);
    localStorage.setItem('profile', JSON.stringify(user));
  }

  const updateOtherComponent = () => {
    setIsUpdated(isUpdated => !isUpdated);
  };

  return (
    <AppContext.Provider value={{ isUpdated, updateOtherComponent, user, setUser, logout, login, isLogin, setIsLogin}}>
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
          <GoogleOAuthProvider clientId="1024591027781-a3ehovvoaa1q16955nk1qsa5uruu1pic.apps.googleusercontent.com">
      <Container maxWidth="lg">
        <Navbar/>

        <Routes>
          <Route path="/" element={<Home currentId={currentId} updatePost={updatePost} setCurrentId={setCurrentId} setUpdatePost={setUpdatePost}/>} />
          <Route path="/auth" element={<Auth/>} />
        </Routes>
        
      </Container>
      </GoogleOAuthProvider>
    </AppProvider>
  );
}

export default App;
