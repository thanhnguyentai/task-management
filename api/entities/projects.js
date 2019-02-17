import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    createdBy: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    created: Number,
    users: [
        {
            userId: mongoose.Schema.Types.ObjectId,
            role: String
        }
    ]
});

export const ProjectModel = mongoose.model('projects', projectSchema);