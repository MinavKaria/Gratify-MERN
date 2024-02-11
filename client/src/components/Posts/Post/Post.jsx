import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material'
import React from 'react'
import  Typography  from '@mui/material/Typography';
import moment from 'moment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import  Chip  from '@mui/material/Chip';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { handleDelete, likePost } from '../../../api/index.js';
import { useAppContext } from '../../../App.jsx'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useState } from 'react';
import { PostStyles } from '../../../styles.jsx';
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';



function Post({ ind,tag,setCurrentId,setUpdatePost,post}) 
{
  const {title,creator, createdAt,message,likeCount,_id}=post;
  const { updateOtherComponent } = useAppContext();
  const {isLogin} = useAppContext();
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState(likeCount);
  const [anchorEl, setAnchorEl] = useState(null);
  console.log("isLogined"+isLogin);
  
  const handleClick = (event) => {
   
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Card sx={PostStyles.cardStyle} id={ind}>
      <CardMedia
        component="img"
        height="140"
        src={post.selectedFile}
        alt="green iguana"
      />
      <div style={PostStyles.postStyle1}>
        <div>
          <Typography variant="h6" sx={{margin:'0',padding:0}}>{title}</Typography>
          <Typography variant="body2">{creator}</Typography>
          <Typography variant="caption" sx={{color:'darkgray'}}>{moment(createdAt).fromNow()}</Typography>
        </div>
        <div style={{ margin: '0'}}>
          <Button style={{ color: 'blue' }} size="small" sx={{ margin: 0, padding: 0 }} onClick={()=>{
            setCurrentId(_id)
            console.log({tag})
            setUpdatePost({title,creator,message,tag,selectedFile:post.selectedFile})
          }}>
            <MoreHorizIcon size='md' />
          </Button>
        </div>
      </div>
      <div style={{margin:0,padding:0,paddingLeft:"10px",color:'#E5E1DA',marginTop:'5px'}}>
        {tag.map((tag,index)=>{
          return <Chip key={index} label={tag} style={{margin:'2px',padding:'4px'}} onClick={()=>{}} sx={{height:'22px',fontSize:'0.75rem'}} size='small'/>
        })}
      </div>

      
      <CardContent sx={{margin:0}}>
        <Typography variant="body2" color="text.secondary" onClick={()=>{}} gutterBottom>
          {message.length > 40 ? `${message.substring(0, 40)}...` : message}
        </Typography>
      </CardContent>
      <CardActions sx={{display:'flex',justifyContent:'space-between',width:'100%',margin:'0'}}>
        <Button size="small" color='primary' disabled={!isLogin} onClick={()=>{
         
        
          const data=localStorage.getItem('profile');
          const uniqueID=JSON.parse(data).sub;
          console.log(uniqueID);

          
     
          if(isLiked===true)
          {
            setLike(like-1);
            likePost(_id,uniqueID);
          }
          else
          {
            setLike(like+1);
            likePost(_id,uniqueID);
          }
            
          setIsLiked(!isLiked);
        }}>
          
          {isLiked ? 
          <div style={{display:'flex',justifyContent:'space-between',width:'100%',margin:'0'}}>
          <ThumbUpAltIcon fontSize='small' sx={{marginRight:'5px'}}/> 
          &nbsp;Liked &nbsp; {like.length}
          </div>: 
          <div style={{display:'flex',justifyContent:'space-between',width:'100%',margin:'0'}}>
            <ThumbUpOffAltIcon fontSize='small' sx={{marginRight:'5px'}}/>
            &nbsp; Like &nbsp; {like.length}
          </div>
          }
          
        </Button>
        <Button  aria-describedby={id} size="small" color='primary' onClick={(event)=>{
          console.log(_id);
          setAnchorEl(event.currentTarget);
          // handleDelete(_id);
          // updateOtherComponent();
        }}>
          <DeleteIcon fontSize='small' sx={{marginRight:'5px'}}/>
          Delete

        </Button>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{display:'absolute'}}
      >
        <Container sx={{ p: 2 }}>
          Are you sure you want to delete this post?
          <br />
          <br />
          <Grid >
          <Button variant='contained' onClick={()=>{
            handleDelete(_id);
            updateOtherComponent();
          }}>Yes</Button>
          <Button onClick={()=>{
            handleClose();
          }}>No</Button>
          </Grid>
        </Container>
      </Popover>
      </CardActions>
    </Card>
  );
}

export default Post
