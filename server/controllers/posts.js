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
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send("No post with that id");
    }

    const deletePost=await PostMessage.findByIdAndDelete(id);
    console.log(deletePost);
};

export const likePost=async (req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send("No post with that id");
    }

    const post=await PostMessage.findById(id);
    const updatePost=await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});

    res.json(updatePost);
};

export const unlikePost=async (req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send("No post with that id");
    }

    const post=await PostMessage.findById(id);
    const updatePost=await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount-1},{new:true});

    res.json(updatePost);
}

