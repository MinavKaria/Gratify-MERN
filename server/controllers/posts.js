
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