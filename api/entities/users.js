import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    created: Number
});

export const UserModel = mongoose.model('users', userSchema);