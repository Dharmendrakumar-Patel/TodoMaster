import express from 'express';
import {
    getUser,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/user.js';

const router = express.Router();

router.route('/')
    .get(getUser)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser);

export default router;