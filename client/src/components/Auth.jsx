import { Avatar, Container, Grid, Paper, Typography, TextField } from '@mui/material'
import React from 'react';
import LockOutLineIcon from '@mui/icons-material/LockOutlined';

function Auth() 
{
  const isSignup=true;

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
        <Avatar >
          <LockOutLineIcon/>
        </Avatar>
        <Typography variant='h5' >{isSignup ? 'Sign Up':'Sign In'}</Typography>

        <form>
          <Grid container spacing={2} sx={{
            marginTop:'10px'
          }}>
            {
              isSignup && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField name='firstName' label='First Name' autoFocus xs={6}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField name='lastName' label='Last Name' xs={6}/>
                  </Grid>
                </>
              )
            }
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth