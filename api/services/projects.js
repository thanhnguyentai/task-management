import { ProjectModel } from '../entities/projects';

const ProjectRoles = {
    ADMIN: 100,
    CAN_CREATE_TASK: 10,
    VIEW: 1
}

const calculateRole = function(role) {
    if(role >= ProjectRoles.ADMIN)
        return ProjectRoles.ADMIN;
    if(role >= ProjectRoles.CAN_CREATE_TASK)
        return ProjectRoles.CAN_CREATE_TASK;
    return ProjectRoles.VIEW;
};

const isProjectAdmin = function(project, userId) {
    return project.users.some(user => {
        return user.userId === userId && user.role === ProjectRoles.ADMIN;
    });
};

const isAuthorizeToCreateTask = function(project, userId) {
    return project.users.some(user => {
        return user.userId === userId && user.role >= ProjectRoles.CAN_CREATE_TASK;
    });
}

const projectService = {
    create(name, description, currentUserId) {
        return new Promise((resolve, reject) => {
            if(!name) {
                resolve({ error: 'Name field is required'});
            } else {
                const now = Date.now();
                const project = new ProjectModel({
                    createdBy: currentUserId,
                    name: name,
                    description: description,
                    created: now,
                    modified: now,
                    users: [{
                        userId: currentUserId,
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

    update(projectId, name, description, currentUserId) {
        return new Promise((resolve, reject) => {
            if(!name) {
                resolve({ error: 'Name field is required'});
            } else {
                ProjectModel.findById(projectId)
                .then(project => {
                    if(project) {
                        if(isProjectAdmin(project, currentUserId)) {
                            project.name = name;
                            project.description = description;
                            project.modified = Date.now();

                            project.save(err => {
                                if(err) {
                                    reject({error: err.msg});
                                } else {
                                    resolve({
                                        message: 'Update the project successfully'
                                    });
                                }
                            });
                        } else {
                            resolve({
                                error: 'You are not allowed to do it'
                            });
                        }
                    } else {
                        resolve({ error: 'The project is not found'});
                    }
                }).catch(err => {
                    reject({error: err.msg});
                });
            }
        });
    },

    delete(projectId, currentUserId) {
        return new Promise((resolve, reject) => {
            ProjectModel.findById(projectId)
            .then(project => {
                if(project) {
                    if(project.createdBy !== currentUserId) {
                        resolve({
                            error: 'You are not allowed to remove this project'
                        });
                    } else {
                        project.delete((err) => {
                            if(err) {
                                reject({error: err.msg});
                            } else {
                                resolve({
                                    message: 'Remove the project successfully'
                                });
                            }
                        });
                    }
                } else {
                    resolve({
                        error: 'The project is not found'
                    });
                }
            }).catch(err => {
                reject({error: err.msg});
            });
        });
    },

    addUser(projectId, userId, role, currentUserId) {
        return new Promise((resolve, reject) => {
            ProjectModel.findById(projectId)
            .then(project => {
                if(project) {
                    const hasAuthorize = isProjectAdmin(project, currentUserId);

                    if(!hasAuthorize) {
                        resolve({
                            error: 'You are not allowed to do it'
                        });
                    } else {
                        const wasAdded = project.users.some(user => {
                            return user.userId === userId;
                        });
    
                        if(wasAdded) {
                            resolve({
                                error: 'This user is already in the project'
                            });
                        } else {
                            const projectRole = calculateRole(role);
                            project.users.push({
                                userId: userId,
                                role: projectRole
                            });

                            project.save(err => {
                                if(err) {
                                    reject({error: err.msg});
                                } else {
                                    resolve({
                                        message: 'Add the user successfully'
                                    });
                                }
                            });
                        }
                    }
                } else {
                    resolve({
                        error: 'The project is not found'
                    });
                }
            }).catch(err => {
                reject({error: err.msg});
            });
        });
    },

    removeUser(projectId, userId, currentUserId) {
        return new Promise((resolve, reject) => {
            ProjectModel.findById(projectId)
            .then(project => {
                if(project) {
                    const hasAuthorize = isProjectAdmin(project, currentUserId);

                    if(!hasAuthorize) {
                        resolve({
                            error: 'You are not allowed to do it'
                        });
                    } else {
                        if(userId === project.createdBy) {
                            resolve({
                                error: 'You cannot remove the project creator'
                            });
                        } else {
                            if(userId === currentUserId) {
                                resolve({
                                    error: 'You cannot remove yourself from the project'
                                });
                            } else {
                                const newUsers = project.users.filter(user => {
                                    return user.userId !== userId;
                                });
    
                                project.users = [...newUsers];
                                project.save(err => {
                                    if(err) {
                                        reject({error: err.msg});
                                    } else {
                                        resolve({
                                            message: 'Remove the user successfully'
                                        });
                                    }
                                });
                            }
                        }
                    }
                } else {
                    resolve({
                        error: 'The project is not found'
                    });
                }
            }).catch(err => {
                reject({error: err.msg});
            });
        });
    },

    changeUserRole(projectId, userId, newRole, currentUserId) {
        return new Promise((resolve, reject) => {
            ProjectModel.findById(projectId)
            .then(project => {
                if(project) {
                    const hasAuthorize = isProjectAdmin(project, currentUserId);

                    if(!hasAuthorize) {
                        resolve({
                            error: 'You are not allowed to do it'
                        });
                    } else {
                        if(userId === project.createdBy) {
                            resolve({
                                error: 'You cannot change the role of the project creator'
                            });
                        } else {
                            if(userId === currentUserId) {
                                resolve({
                                    error: 'You cannot change your role by yourself'
                                });
                            } else {
                                const newUsers = project.users.map(user => {
                                    if(user.userId === userId) {
                                        user.role = calculateRole(newRole);
                                    }

                                    return user;
                                });
    
                                project.users = [...newUsers];
                                project.save(err => {
                                    if(err) {
                                        reject({error: err.msg});
                                    } else {
                                        resolve({
                                            message: 'Update the role of the user successfully'
                                        });
                                    }
                                });
                            }
                        }
                    }
                } else {
                    resolve({
                        error: 'The project is not found'
                    });
                }
            }).catch(err => {
                reject({error: err.msg});
            });
        });
    },

    getProjectsByUser(currentUserId) {
        return new Promise((resolve, reject) => {
            ProjectModel.find({
                users: {
                    $elementMatch: {
                        userId: currentUserId
                    }
                }
            }, null, {
                modified: -1 // sort projects desc by modified
            }).then(projects => {
                if(projects && projects.length > 0) {
                    const projectData = projects.map(project => {
                        return {
                            _id: project._id,
                            name: project.name,
                            description: project.description,
                            canUpdateProject: isProjectAdmin(project, currentUserId),
                            canDeleteProject: project.createdBy === currentUserId,
                            canCreateTask: isAuthorizeToCreateTask(project, currentUserId)
                        };
                    });

                    resolve(projectData);
                } else {
                    resolve([]);
                }
            }).catch(err => {
                reject({error: err.msg});
            });
        });
    }
}

module.exports = projectService;