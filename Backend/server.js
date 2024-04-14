import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import userRouter from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import runChat from './chat/runChat.js';
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
app.get('/', (req, res) => res.send("server is running"))
app.post("/assistant", async (req, res) => {
    console.log("prompt ", req.body)
    const prompt = req.body.prompt;
    const response = await runChat(prompt);
    res.status(200).json({ response });
})
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

//connections
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB got Connected!')
        app.listen(process.env.PORT, "0.0.0.0", () => { console.log(`Server listening on port${process.env.PORT}`) })
    })
    .catch((err) => console.log("DB connection error: " + err));
