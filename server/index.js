import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';

const app = express();
const port=3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  
    optionsSuccessStatus: 204,
  };
  


app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));  
app.use(cors()); 
app.use('/posts',postRoutes);



const connection_url = "mongodb+srv://minavpkaria:minavkaria@cluster0.fjislfp.mongodb.net/";

//connect to database
try
{
    mongoose.connect(connection_url)
    console.log("MongoDB Connected")
}
catch(err)
{
    console.log(err)
}


app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})