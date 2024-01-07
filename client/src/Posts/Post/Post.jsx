import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material'
import React from 'react'
import  Typography  from '@mui/material/Typography';
import moment from 'moment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import  Chip  from '@mui/material/Chip';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';


function Post({ title, ind, creator, createdAt,tag,message,likeCount, setCurrentId,_id,setUpdatePost}) {
  return (
    <Card sx={{ minWidth: 300, backgroundColor: 'white',borderRadius:'15px'}} id={ind}>
      <CardMedia
        component="img"
        height="140"
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop:'10px',paddingLeft:'15px'}}>
        <div>
          <Typography variant="h6" sx={{margin:'0',padding:0}}>{title}</Typography>
          <Typography variant="body2">{creator}</Typography>
          <Typography variant="caption" sx={{color:'darkgray'}}>{moment(createdAt).fromNow()}</Typography>
        </div>
        <div style={{ margin: '0'}}>
          <Button style={{ color: 'blue' }} size="small" sx={{ margin: 0, padding: 0 }} onClick={()=>{
            setCurrentId(_id)
            setUpdatePost({title,creator,message,tag})
            console.log(tag)
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
        <Button size="small" color='primary' onClick={()=>{}}>
          <ThumbUpOffAltIcon fontSize='small' sx={{marginRight:'5px'}}/>
          Like &nbsp;
          {likeCount}
        </Button>
        <Button size="small" color='primary' onClick={()=>{}}>
          <DeleteIcon fontSize='small' sx={{marginRight:'5px'}}/>
          Delete

        </Button>
      </CardActions>
    </Card>
  );
}

export default Post