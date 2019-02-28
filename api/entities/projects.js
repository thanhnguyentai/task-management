import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    createdBy: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    created: Number,
    modified: Number,
    users: [
        {
            userId: mongoose.Schema.Types.ObjectId,
            role: Number
        }
    ]
});

export const ProjectModel = mongoose.model('projects', projectSchema);