import React from 'react'
import Container from '@mui/material/Container';
import Grow from '@mui/material/Grow';
import Grid from '@mui/material/Grid';
import Posts from '../components/Posts/Posts';
import Form from '../components/Form/Form';
import { styles } from '../styles';


function Home({currentId, setCurrentId, setUpdatePost, updatePost}) {
  return (
    <>
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
    </>
  )
}

export default Home