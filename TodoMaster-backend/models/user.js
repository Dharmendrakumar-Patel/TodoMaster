import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide an email'],
    },
    password: {
        type: String,
        select: false,
        required: [true, 'Please provide a password']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', userSchema);