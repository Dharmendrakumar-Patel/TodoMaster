import jwt from 'jsonwebtoken';
import User from '../models/user.js'
import ErrorHandler from './error.js';

export const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token) return next(new ErrorHandler('Unauthorized Access', 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
        req.user = await User.findById(decoded._id);
    
        next();
    } catch (error) {
        next(error);
    }
}