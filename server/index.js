import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';
import User from "./models/postUser.js";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { createNewUser, signInUser } from './controllers/user.js';

const app = express();
dotenv.config();
const port=process.env.PORT || 3000;


const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  
    optionsSuccessStatus: 204,
  };
  


app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));  
app.use(cors(corsOptions)); 
app.use('/posts',postRoutes);



const connection_url = process.env.CONNECTION_URL;

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


app.post('/signUp',createNewUser);
app.post('/signIn',signInUser);


app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})