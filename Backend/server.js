import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import userRouter from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import dotenv from 'dotenv';
// import path from 'path';

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static('uploads', {
    setHeaders: (res, path) => {
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    }
}));
app.use(helmet());
dotenv.config();


//routes
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);



//connections
mongoose.connect('mongodb+srv://admin:DGfsDLqhzNQQZ4yW@cluster0.mcijogw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('DB got Connected!')
        app.listen(5000, () => { console.log("Server listening on port 5000") })
    })
    .catch((err) => console.log("DB connection error: " + err));
