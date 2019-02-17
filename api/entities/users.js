import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: String,
    created: Number
});

export const UserModel = mongoose.model('users', userSchema);