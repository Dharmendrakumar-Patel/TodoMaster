import User from '../models/user.js';

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

export const createUser = async (req, res) => {
    const {name, email, password} = req.body;

    await User.create({
        name: name,
        email: email,
        password: password
    });

    res.status(201).json({
        success: true,
        message: 'User created successfully',
    });
}

export const updateUser = async (req, res) => {
    const { _id } = req.body;
    const query = {}

    if (req.body.name) query.name = req.body.name
    if (req.body.email) query.email = req.body.email

    console.log(_id)
    console.log(query);

    await User.findByIdAndUpdate(_id, query);

    res.status(200).json({
        success: true,
        message: 'User Updated Successfully'
    });
}

export const deleteUser = async (req, res) => {
    const {id} = req.query;

    await User.findByIdAndRemove(id);

    res.status(200).json({
        success: true,
        message: 'User Deleted Successfully'
    });
}