import express from 'express';
import dotenv from 'dotenv';

export const app = express();

// Load env vars
dotenv.config({ path: './.env' });

//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('TodoMaster - Your Ultimate Task Management App - Backend');
});