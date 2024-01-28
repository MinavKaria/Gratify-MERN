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
import {signInUser} from '../../api/index.js';
import {signUpUser} from '../../api/index.js';
import axios from 'axios';


function Auth() 
{

  const [showPassword,setShowPassword]=useState(false);
  const [isSignup,setIsSignup]=useState(false);
  const [user,setUser]=useState({
    firstName:'',
    lastname:'',
    email:'',
    password:'',
    confirmPassword:''
  });
  const [errorLabel,setErrorLabel]=useState(false);
  const [helperText,setHelperText]=useState('');

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]:e.target.value
    });
  };

  const { login } = useAppContext();
  const navigate = useNavigate();
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    const user = credentialResponse.credential;
    const decoded = jwtDecode(user);
    login(decoded);
    localStorage.setItem('decoded', JSON.stringify(decoded));
    localStorage.setItem('token',user);
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

        <form onSubmit={async (e)=>{
          e.preventDefault();
          console.log(user);
          if(isSignup===true)
          {
            console.log("Sign Up 1")
            if(user.password===user.confirmPassword)
            {
                const newUser={
                  firstName:user.firstName,
                  lastname:user.lastname,
                  email:user.email,
                  password:user.password,
                  confirmPassword:user.confirmPassword
                };

               const response=await signUpUser(newUser);
               const token=response.token;
              const decodedToken = jwtDecode(token);
              login(decodedToken);
              localStorage.setItem('decoded', JSON.stringify(decodedToken));
              localStorage.setItem('token',token);
              navigate('/');
              console.log(response);
            }
            
            else
            {
              // alert('Passwords do not match');
              setTimeout(()=>{
                setErrorLabel(false);
                setHelperText('');
              },3000);
              setErrorLabel(true);
              setHelperText('Passwords do not match');
            }
          }
          else
          {
            try
            {
              const formData={
                email:user.email,
                password:user.password
              };
              const response=await axios.post('http://localhost:3000/signIn',formData,
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              console.log(response);
              const token=response.data.token;
              const decodedToken = jwtDecode(token);
              login(decodedToken);
              localStorage.setItem('decoded', JSON.stringify(decodedToken));
              localStorage.setItem('token',token);
              navigate('/');
            }
            catch(error)
            {
              console.log(error);
              const message=error.request.response;
              console.log(message);
              alert(message);
            }
          }
        }}>
          <Grid container spacing={2} sx={{
            marginTop:'10px'
          }}>
            {
              isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autofocus value={user.firstName} half/>
                  <Input name="lastname" user={user.lastname} label="Last Name" handleChange={handleChange} half/>
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" 
            value={user.email}
            />

            <Input 
            name="password" 
            label="Password" 
            type={showPassword ? 'text':'password'}
            handleChange={handleChange}  
            handleShowPassword={()=>{
              setShowPassword((prevShowPassword)=>!prevShowPassword);
            }}
            value={user.password}
            errorLabel={errorLabel}
            />

            {isSignup &&<Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showPassword ? 'text':'password'}  value={user.confirmPassword}  errorLabel={errorLabel} helperText={helperText}/> }
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
          >
            {isSignup ? 'Sign Up':'Sign In'}
          </Button>
         
           
          
          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={()=>{
                setIsSignup((prevIsSignup)=>!prevIsSignup);
                setUser({
                  firstName:'',
                  lastname:'',
                  email:'',
                  password:'',
                  confirmPassword:''
                })
                
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

