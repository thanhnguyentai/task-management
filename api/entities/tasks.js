import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
    createdBy: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    status: String,
    created: Number,
    assignTo: mongoose.Schema.Types.ObjectId
});

export const TaskModel = mongoose.model('tasks', taskSchema);