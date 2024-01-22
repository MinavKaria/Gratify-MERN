import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import logo from '../images/logo.png';
import { styles } from '../styles';
import { Avatar, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';

function Navbar() 
{
  const { user } = useAppContext();
  const { logout } = useAppContext();
  return (
    <>
        <AppBar position="static" color="inherit" sx={styles.appBar}>
         <div style={{
            width: user==null?"10%":'33%',
          }}></div>
        <div>
          <Button component={Link} to='/' sx={styles.homeButton}>
            <img src={logo} alt="memories" style={styles.headingImage}  draggable='false'/>
          </Button>
        </div>
        <Toolbar>
            {user ? (
              <div>
                {user!=null && 
                (
                  <div style={{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    gap:'10px'
                  }}>
                <Avatar alt={user.family_name} src={user.picture}>{user.family_name.charAt(0)}</Avatar>
                <Typography variant="h6" sx={{marginLeft:'10px'}}>
                  {user.name}
                </Typography>
                <Button variant='contained'
                color='secondary'
                onClick={() => {
                  localStorage.clear();
                  logout();
                }}
                >
                  Logout
                </Button>
                </div>
                )
                }
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