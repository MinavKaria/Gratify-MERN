import mongoose from "mongoose";
// Importing PostMessage schema
import PostMessage from "../models/postMessage.js";

export const getPosts=async (req,res)=>{
    try
    {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
        console.log('Get Request Successful')
    }
    catch(err)
    {
        res.status(404).json({message:err.message});
    }
}

//

export const createPost= async (req,res)=>{
    const post=req.body;
    console.log('Post Request')
    const newPost=new PostMessage(post);
    
    try
    {
        await newPost.save();
        res.send("Post Creation");
    }
    catch(err)
    {
        res.status(404).json({message:err.message});
    }

};

export const updatePost=async (req,res)=>{
    const {id:_id}=req.params;
    const post=req.body;
    

    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send("No post with that id");
    }
    const updatedPost=await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});
    res.json(updatedPost);
}

export const deletePost=async (req,res)=>{
    const {id}=req.params;
    console.log('Delete Request');
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send("No post with that id");
    }

    const deletePost=await PostMessage.findByIdAndDelete(id);
    console.log(deletePost);
};

export const likePost=async (req,res)=>{
    const {id}=req.params;
    console.log('Like Request');
    const userID=req.body.Patchdata;
    // if(!req.userId)
    // {
    //     return res.json({message:"Unauthenticated"});
    // }

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send("No post with that id");
    }
    try
    {
        const post=await PostMessage.findById(id);
        console.log('Like Request')
        console.log(post);
        
    // const index=post.likes.findIndex((postid)=>postid===String(req.userId));
    var likeArray=post.likeCount;
    console.log(likeArray);
    const index=likeArray.indexOf(req.userId);

    if(index===-1)
    {
        likeArray.push(req.userId);
    }
    else
    {
        likeArray=likeArray.filter((id)=>id!==String(req.userId));
    }


    const updatePost=await PostMessage.findByIdAndUpdate(id,{likeCount:likeArray},{new:true});

    res.json(updatePost);
    }
    catch(err)
    {
        res.status(404).json({message:err.message});
    }
  
   
};


