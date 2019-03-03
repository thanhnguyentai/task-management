import { ProjectModel } from '../entities/projects';

const projectHelper = require('../helpers/projects');

const ProjectRoles = {
    ADMIN: 100,
    CAN_CREATE: 10,
    VIEW: 1
}


const projectService = {
    create(userId, name, description) {
        return new Promise((resolve, reject) => {
            if(!name) {
                resolve({ error: 'Name field is required'});
            } else {
                const now = Date.now();
                const project = new ProjectModel({
                    createdBy: userId,
                    name: name,
                    description: description,
                    created: now,
                    modified: now,
                    users: [{
                        userId: userId,
                        role: ProjectRoles.ADMIN
                    }]
                });

                project.save().then(doc => {
                    resolve(doc);
                }).catch(err => {
                    reject({error: err.msg});
                });
            }
        });
    },

    update(projectId, name, description, userId) {
        return new Promise((resolve, reject) => {

        });
    },

    delete(projectId, userId) {
        return new Promise((resolve, reject) => {

        });
    },

    addUser(projectId, userId, currentUserId) {
        return new Promise((resolve, reject) => {

        });
    },

    removeUser(projectId, userId, currentUserId) {
        return new Promise((resolve, reject) => {

        });
    },

    changeUserRole(projectId, userId, newRole, currentUserId) {
        return new Promise((resolve, reject) => {

        });
    }
}

module.exports = projectService;