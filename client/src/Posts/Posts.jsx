import React from 'react'
import Post from './Post/Post'
import { Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import axios from 'axios'
import fetchPosts from '../api'
import { useState, useEffect } from 'react'
import { useAppContext } from '../App'

  


function Posts({setCurrentId, setUpdatePost, updatePost}) 
{
  const { isUpdated } = useAppContext();
  const [posts, setPosts] = useState([]);


  useEffect(() => 
  {
    const fetchPosts = async () => 
    {
      const { data } = await axios.get('http://localhost:3000/posts');
      setPosts(data);
      
    };
    
    setTimeout(() => {
      fetchPosts();
    }, 500);
  }, [isUpdated]);


  return (
    <>
      {!posts.length ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} sx={{overflowY:'auto'}}>
          {posts.map((post,index) => (
            <Grid item key={post._id} xs={12} sm={6} md={6}>
              <Post title={post.title} ind={index} creator={post.creator} createdAt={post.createdAt} tag={post.tags} message={post.message} likeCount={post.likeCount} setCurrentId={setCurrentId} _id={post._id} setUpdatePost={setUpdatePost} post={post}/>
            </Grid>
          ))}
        </Grid>

      )
      }
    </>
  );
}

export default Posts;
