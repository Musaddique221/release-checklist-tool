import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import releaseRoutes from "./routes/releaseRoutes.js"


dotenv.config()
connectDB()
const app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.json("API is running")
})


app.use("/api/releases", releaseRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT,()=> console.log(`server is running on port ${PORT} `))


