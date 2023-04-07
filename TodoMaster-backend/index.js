import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';

export const app = express();

// Load env vars
dotenv.config({ path: './.env' });

//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {res.send('TodoMaster - Your Ultimate Task Management App - Backend');});
app.use('/api/v1/user', userRouter);
app.use('/api/v1/task', taskRouter);