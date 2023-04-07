import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.js';

export const app = express();

// Load env vars
dotenv.config({ path: './.env' });

//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/user', userRouter);

// Routes
app.get('/', (req, res) => {
    res.send('TodoMaster - Your Ultimate Task Management App - Backend');
});