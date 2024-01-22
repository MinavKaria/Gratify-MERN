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
import { useAppContext } from '../../App'
import { useEffect } from 'react';
import Dropzone from 'react-dropzone';
import UploadIcon from '@mui/icons-material/Upload';


function Form({currentId, setCurrentId,setUpdatePost,updatePost }) 
{
  const { updateOtherComponent } = useAppContext();
  const {isLogin} = useAppContext();
  console.log(isLogin)
  const {user} = useAppContext();
  
  const [tagInput, setTags] = useState('');
  const [fileName, setFileName] = useState('');
  const [postData, setPostData] = useState({
    creator: (user==null ? '':user.name), title: '', message: '', tags: [''], selectedFile: null,
  });

  
  useEffect(() => {
    if (currentId !== null && updatePost) 
    {
      console.log(currentId)
      const { title, creator, message, tag,selectedFile } = updatePost;
      const tags = tag.join(',');
      setPostData({ ...postData, creator, title, message,selectedFile,tags: tag });
      setTags(tags);
    }
  }, [currentId, updatePost]);

  const handleUpdate = async () => {
    console.log(postData)
    try
    {
      if(postData.creator === '' || postData.title === '' || postData.message === '' || postData.tags.length===0 || postData.selectedFile === null)
      {
        alert('Please fill all the fields');
        return;
      }
      const response = await axios.patch(`http://localhost:3000/posts/${currentId}`, postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response)
      setPostData({ creator: '', title: '', message: '', tags: [''], selectedFile: null });
      setTags('');
      setFileName('');
      setCurrentId(null);
      setUpdatePost(null);
      updateOtherComponent();
    }
    catch(error)
    {
      console.log(error)
    }
  };

  const handleSubmit = async () => {
    console.log(postData)
    try
    {
      if(postData.creator === '' || postData.title === '' || postData.message === '' || postData.tags.length===0 || postData.selectedFile === null)
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
      setPostData({ creator: (user==null ? '':user.name), title: '', message: '', tags: [''], selectedFile: null });
      setTags('');
      setFileName('');
      
    }
    catch(error)
    {
      console.log(error)
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
            {!isLogin ? 'Please Login to Create Post' : (currentId ? 'Update' : 'Submit') + ' a Post'}
          
        </Typography>

        <form onSubmit={(e) => {handleSubmit(),  e.preventDefault();}} autoComplete='off' noValidate >
          <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            sx={{ marginBottom: '10px',display:'none' }}
            onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
            value={postData.creator}
            disabled={!isLogin}
      
          />
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            sx={{ marginBottom: '10px' }}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            value={postData.title}
            disabled={!isLogin}
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            sx={{ marginBottom: '10px' }}
            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
            value={postData.message}
            disabled={!isLogin}
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
            disabled={!isLogin}
          />
          
          <div style={{marginBottom:'15px', border:'1.5px solid lightgrey', borderRadius:'5px',padding:'5px'}}>
            {/* <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
              value={postData.selectedFile}
            /> */}
              <Dropzone onDrop={
                (acceptedFiles,rejectFiles,event) => {
                  event.preventDefault();
                  console.log(acceptedFiles)
                  
                  const file=acceptedFiles[0];

                  if (!file.type.startsWith('image/')) {
                    alert('Not an image file');
                    return;
                  }

                  
                  const reader=new FileReader();
                  
                  console.log(reader)

                  reader.onload = () => 
                  {
                    const base64Data = reader.result;
                    setFileName(base64Data);
                    setPostData({ ...postData, selectedFile: base64Data });
                  };

                  reader.readAsDataURL(file);
                }}
                disabled={!isLogin}
                >
                {({getRootProps, getInputProps}) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {
                        fileName !== '' ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'grey' }}>
                          <img style={{ width: '200px' }} src={fileName} alt="Uploaded" />
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'grey' }}>
                        {
                          postData.selectedFile ? (
                            <img style={{ width: '200px' }} src={postData.selectedFile} alt="Uploaded" />
                          ) : (
                            <>
                              <UploadIcon style={{ fontSize: '48px' }} />
                              <p style={{ margin: '8px' }}>Upload or Drop the Image here</p>
                            </>
                          )
                        }

                           
                            
                          </div>
                        )
                      }
    
                    </div>
                  </section>
                )}
            </Dropzone>
          </div>
          <Stack direction="column" spacing={2}>

            <Button variant="contained" sx={{backgroundColor:'blue'}} onClick={()=>{
              console.log(postData)
              if(currentId!==null)
              {
                handleUpdate();
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
              setPostData({creator: (user==null ? '':user.name), title: '', message: '', tags: '', selectedFile: null});
              setCurrentId(null);
              setTags('');
              setFileName('');
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