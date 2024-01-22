import { Avatar, Container, Grid, Paper, Typography, TextField, Button } from '@mui/material'
import LockOutLineIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useAppContext } from '../../App';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';


function Auth() 
{

  const [showPassword,setShowPassword]=useState(false);
  const [isSignup,setIsSignup]=useState(true);
  const { login } = useAppContext();
  const navigate = useNavigate();
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    const user = credentialResponse.credential;
    const decoded = jwtDecode(user);
    login(decoded);
    localStorage.setItem('decoded', JSON.stringify(decoded));
    navigate('/');
  };

 

  const handleGoogleLoginError = () => {
    console.log('Login Failed');
  };

  return (

    <Container component="main" maxWidth='xs'>
      <Paper sx={{
        marginTop:'10px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        padding:'20px'
      
      }} 
      elevation={3}
      >
        <Avatar sx={{ backgroundColor: 'blue', marginBottom:'10px' }}>
          <LockOutLineIcon />
        </Avatar>
        <Typography variant='h5' >{isSignup ? 'Sign Up':'Sign In'}</Typography>

        <form>
          <Grid container spacing={2} sx={{
            marginTop:'10px'
          }}>
            {
              isSignup && (
                <>
                  <Input name="Firstname" label="First Name" handleChange={()=>{}} autofocus half/>
                  <Input name="Lastname" label="Last Name" handleChange={()=>{}} half/>
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={()=>{}} type="email"/>

            <Input 
            name="password" 
            label="Password" 
            type={showPassword ? 'text':'password'}
            handleChange={()=>{}}  
            handleShowPassword={()=>{
              setShowPassword((prevShowPassword)=>!prevShowPassword);
            }}/>

            {isSignup &&<Input name="confirmpassword" label="Confirm Password" handleChange={()=>{}} type={showPassword ? 'text':'password'}/>}
          </Grid>
          <div style={{
            marginTop:'10px'
          }}>
          <GoogleLogin
             
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              size='large'
              text='signup_with'

            />

            </div>
          <Button type="submit" fullWidth variant="contained" color="primary" 
          sx={{
            marginTop:'10px'
          }}
          onClick={()=>{
            setIsSignup(true);
          }}
          >
            {isSignup ? 'Sign Up':'Sign In'}
          </Button>
         
           
          
          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={()=>{
                setIsSignup((prevIsSignup)=>!prevIsSignup);
              }}>
                {isSignup ? 'Already have an account? Sign In':'Dont have an account? Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth

