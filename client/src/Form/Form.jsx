import  Button from '@mui/material/Button'
import  Card from '@mui/material/Card'
import  TextField from '@mui/material/TextField'
import  Stack from '@mui/material/Stack'
import  Typography from '@mui/material/Typography'
import  Chip  from '@mui/material/Chip';
import { Autocomplete } from '@mui/material'
import { Box } from '@mui/system'
import {useState} from 'react'
import FileBase from 'react-file-base64';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import axios from 'axios';
import * as React from 'react';
import top100Films from './tags';
import { useAppContext } from '../App'
import { useEffect } from 'react';


function Form({currentId, setCurrentId,setUpdatePost,updatePost }) 
{
  const { updateOtherComponent } = useAppContext();

  
  const [tagInput, setTags] = useState('');
  const [postData, setPostData] = useState({
    creator: '', title: '', message: '', tags: [''], selectedFile: null,
  });

  
  useEffect(() => {
    if (currentId !== null && updatePost) {
      const { title, creator, message, tag } = updatePost;
      const tags = tag.join(',');
      setPostData({ ...postData, creator, title, message });
      setTags(tags);
    }
  }, [currentId, updatePost]);

  const handleSubmit = async () => {
    console.log(postData)
    try
    {
      if(postData.creator === '' || postData.title === '' || postData.message === '' || postData.tags.length===0)
      {
        alert('Please fill all the fields');
        return;
      }
      const response = await axios.post('http://localhost:3000/posts', postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response)
      
    }
    catch(error)
    {
      console.log(error)
    }
  };

  const clearFileInput = () => {
    setPostData({ ...postData, selectedFile: null });
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (

      <Card sx={{
        minWidth: 300,
        backgroundColor: 'white',
        margin: '0',
        padding: '20px',
    
      }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>
          Creating a Memory
        </Typography>

        <form onSubmit={(e) => {handleSubmit(),  e.preventDefault();}} autoComplete='off' noValidate >
          <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            sx={{ marginBottom: '10px' }}
            onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
            value={postData.creator}
          />
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            sx={{ marginBottom: '10px' }}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            value={postData.title}
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            sx={{ marginBottom: '10px' }}
            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
            value={postData.message}
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            sx={{ marginBottom: '10px' }}
            onChange={(e) => {
              setPostData({ ...postData, tags: e.target.value.split(',') });
              setTags(e.target.value);
            }}
            value={tagInput}
          />
          
          <div style={{marginBottom:'15px'}}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
              value={postData.selectedFile}
            />
          </div>
          <Stack direction="column" spacing={2}>

            <Button variant="contained" sx={{backgroundColor:'blue'}} onClick={()=>{
              console.log(postData)
              if(currentId!==null)
              {
                setCurrentId(null);
                setUpdatePost(null);
                setPostData({creator: '', title: '', message: '', tags: '', selectedFile: null});
                updateOtherComponent();
              }
              else
              {
                handleSubmit();
                updateOtherComponent();
              }
            }}><ArrowUpwardIcon/>
            {currentId === null ? 'Submit' : 'Update'}
            </Button>

            <Button variant="contained" sx={{height:'30px'}} onClick={()=>{
              setPostData({creator: '', title: '', message: '', tags: '', selectedFile: null});
              setCurrentId(null);
              setTags('');
            }}><ClearIcon/>Clear</Button>
        </Stack>
        </form>
      </Card>
  );
}

export default Form







{/* <Autocomplete
            multiple
            id="tags-filled"
            options={top100Films.map((option) => option)}
            defaultValue={[]}
            freeSolo
            onChange={(event, newValue) => {
              setPostData({ ...postData, tags: newValue });
              console.log(newValue); 
              console.log(postData)
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip 
                key={option.title}
                variant="outlined" 
                label={option} {...getTagProps({ index })}
                // onDelete={() => {
                //   const updatedTags = [...postData.tags];
                //   updatedTags.splice(index, 1); 
                //   setPostData({ ...postData, tags: updatedTags });
                //   console.log(postData);
                // }}
                 />
              ))
            }
            renderInput={(params,index) => (
              <TextField
                key={index}
                {...params}
                variant="filled"
                label="Tags"
                placeholder="Favorites"
                sx={{backgroundColor:'white'}}
              />
            )}
            sx={{backgroundColor:'white'}}
          /> */}