import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import uploadRoute from './routes/upload.route.js'
import dotenv from 'dotenv'
import {connectDB} from './lib/db.js'
import cookieParser from 'cookie-parser';
import { app,server } from './lib/socket.js'; //je cree app et server dans socket.js

import path from 'path';

app.use(express.json());
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(cookieParser());


const __dirname = path.resolve();


dotenv.config();
const PORT = process.env.PORT;

app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/upload', uploadRoute);


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html" ))
    })
}


server.listen(PORT , () =>{
    console.log("server is running on PORT:",PORT);
    connectDB() //pour la connection avec la BDD
})