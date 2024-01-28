import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });


API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
      req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    
    console.log(req);
    return req;
  });

const fetchPosts = async () => {
    try 
    {
        const response = await API.get('/posts');
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
        console.log("Delete Request 1")
        const response = await API.delete(`/posts/${id}`);
        console.log("Delete Request 2")

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
        const response=await API.patch(`posts/${id}/likePost`);
        console.log(response.data);
        return response.data;
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
}


const signInUser=async (formData)=>{
    try
    {
        const response=await API.post('/posts/signIn',formData);
        console.log(response.data);
        return response.data;
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
}

const signUpUser=async (formData)=>{
    try 
    {
        // const response = await signUpUser(newUser);
        console.log(formData);
        const response=await axios.post('http://localhost:3000/signUp',formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log("Sign in Success");
        console.log(response.data);
        return response.data;
    } 
    catch (error) 
    {
        console.error("Error during signUp request:", error);
        console.log(error.response.data); 
    }

}



export default fetchPosts;
export {handleDelete};
export {likePost};
export {signInUser};
export {signUpUser};