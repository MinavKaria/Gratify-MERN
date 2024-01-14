import axios from 'axios';

const url = 'http://localhost:3000/posts';

const fetchPosts = async () => {
    try 
    {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } 
    catch (error) 
    {
        console.log(error);
        throw error; 
    }
}

const handleDelete= async (id) => {
    try 
    {
        const response = await axios.delete(`${url}/${id}`);
        console.log(response.data);
        return response.data;
    } 
    catch (error) 
    {
        console.log(error);
        throw error; 
    }
}

const likePost=async (id)=>{
    try
    {
        const response=await axios.patch(`${url}/${id}/likePost`);
        console.log(response.data);
        return response.data;
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
}

const unlikePost=async (id)=>{
    try
    {
        const response=await axios.patch(`${url}/${id}/unlikePost`);
        console.log(response.data);
        return response.data;
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
}

export default fetchPosts;
export {handleDelete};
export {likePost};
export {unlikePost};
