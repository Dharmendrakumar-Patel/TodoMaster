import User from '../models/user.js';
import bcrypt from 'bcrypt';
import {setCookie } from '../utils/feature.js';
import ErrorHandler from '../middlewares/error.js';

export const getUser = async (req, res) => {
    const query = {}

    if(req.query.id) query._id = req.query.id
    if (req.query.name) query.name = req.query.name
    if (req.query.email) query.email = req.query.email

    try {
        const user = await User.find(query);

        res.status(200).json({
        success: true,
        user: user
    });
    } catch (error) {
        next(error);
    }
}

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        let user = await User.find({email: email})

        if(user.length > 0) next(new ErrorHandler('User already exists', 400));

        const hashedPassword = await bcrypt.hash(password, 12);

        user = await User.create({
                name: name,
                email: email,
                password: hashedPassword
            });
        
        setCookie(user, res, 201, 'User Registered Successfully');
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) next(new ErrorHandler('Please provide email and password', 400));

    try {
        const user = await User.findOne({email: email}).select('+password');

        if(!user) next(new ErrorHandler('User does not exist', 404));

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) next(new ErrorHandler('Invalid Credentials', 401));          

        setCookie(user, res, 200, 'User Logged In Successfully');
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.body;
    const query = {}

    if (req.body.name) query.name = req.body.name
    if (req.body.email) query.email = req.body.email

    try {
        await User.findByIdAndUpdate(id, query);

        res.status(200).json({
            success: true,
            message: 'User Updated Successfully'
        });
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.body;

    try {
        await User.findByIdAndRemove(id);

        res.status(200).json({
            success: true,
            message: 'User Deleted Successfully'
        });
    } catch (error) {
        next(error);
    }
}

export const getProfile = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
}

export const logoutUser = async (req, res) => {
    res.status(200).clearCookie('token').json({
        success: true,
        message: 'User Logged Out Successfully'
    });
}