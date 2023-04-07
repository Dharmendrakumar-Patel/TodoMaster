import User from '../models/user.js';
import bcrypt from 'bcrypt';
import {setCookie } from '../utils/feature.js';

export const getUser = async (req, res) => {
    const query = {}

    if(req.query.id) query._id = req.query.id
    if (req.query.name) query.name = req.query.name
    if (req.query.email) query.email = req.query.email

    const user = await User.find(query);

    res.status(200).json({
        success: true,
        user: user
    });
}

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    let user = await User.find({email: email})

    if(user.length > 0){
        return res.status(404).json({
            success: false,
            message: 'User already exists'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
    
    setCookie(user, res, 201, 'User Registered Successfully');
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(404).json({
            success: false,
            message: 'Please provide email and password'
        })
    }

    const user = await User.findOne({email: email}).select('+password');

    if(user){
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(404).json({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        setCookie(user, res, 200, 'User Logged In Successfully');
    }else{
        return res.status(404).json({
            success: false,
            message: 'Invalid Credentials'
        })
    }

}

export const updateUser = async (req, res) => {
    const { id } = req.body;
    const query = {}

    if (req.body.name) query.name = req.body.name
    if (req.body.email) query.email = req.body.email


    await User.findByIdAndUpdate(id, query);

    res.status(200).json({
        success: true,
        message: 'User Updated Successfully'
    });
}

export const deleteUser = async (req, res) => {
    const {id} = req.body;

    await User.findByIdAndRemove(id);

    res.status(200).json({
        success: true,
        message: 'User Deleted Successfully'
    });
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