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

export default fetchPosts;
