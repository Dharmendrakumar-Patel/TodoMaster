import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import {
    getUser,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getProfile,
    logoutUser
} from '../controllers/user.js';

const router = express.Router();

router.route('/')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router.get('/me', isAuthenticated, getProfile)

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

export default router;