import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './Routes/userroutes.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


const app=express();
dotenv.config();

const PORT=process.env.PORT;

app.use(cors({ origin: "*", credentials: true })); 

app.use(json());
app.use(cookieParser()); 
app.use('/',router)

mongoose.connect('mongodb://localhost:27017/Product_Management').then(()=>{
    console.log("Mongodb successfully connected to Product_Management");
})
.catch((error)=>{
    console.error("Mongodb connection failed",error);
})

app.listen(PORT,()=>{

    console.log(`Server is listening to the Port ${PORT}`);

})