import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import logo from '../images/logo.png';
import { styles } from '../styles';
import { Avatar, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';


function Navbar() 
{
  const user=null;
  return (
    <>
        <AppBar position="static" color="inherit" sx={styles.appBar}>
        <div style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Button component={Link} to='/' sx={styles.homeButton}>
          <img src={logo} alt="memories" style={styles.headingImage}  draggable='false'/>
          </Button>
        </div>
        <Toolbar>
            {user ? (
              <div>
                <Avatar alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography variant="h6" sx={{marginLeft:'10px'}}>
                  {user.result.name}
                </Typography>
                <Button variant='contained'
                color='secondary'
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div style={{
                margin:'auto'
              }}>
                <Button component={Link} to='/auth' variant='contained' color='primary' sx={styles.loginButton}>
                  Sign In
                </Button>
              </div>
            )}
        </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar