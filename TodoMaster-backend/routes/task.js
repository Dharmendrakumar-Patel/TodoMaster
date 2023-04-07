import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { 
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/task.js';

const router = express.Router();

router.get('/', isAuthenticated,getTasks);

router.post('/create', isAuthenticated,createTask);

router.put('/update', isAuthenticated,updateTask);

router.delete('/delete', isAuthenticated,deleteTask);

export default router;