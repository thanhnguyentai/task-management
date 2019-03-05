import md5 from 'md5';
import mongoose from 'mongoose';
import { UserModel } from '../entities/users';
const userHelper = require('../helpers/users');


const userService = {
    create(name, email, password) {
        return new Promise((resolve, reject) => {
            if(!name || !email || !password) {
                resolve({error: 'Name, email and password are required.'});
            } else if(!userHelper.emailIsValid(email)) {
                resolve({error: 'Email is invalid'});
            } else {
                UserModel.findOne({
                    email: email
                }).then(doc => {
                    if(doc) {
                        resolve({error: "This email is already used"});
                    } else {
                        const user = new UserModel({
                            name: name,
                            email: email,
                            password: md5(password),
                            created: Date.now()
                        });
            
                        user.save().then(doc => {
                            resolve(doc);
                        }).catch(err => {
                            reject({error: err.msg});
                        })
                    }
                }).catch(err => {
                    reject({error: err.msg});
                });
            }
        });
    },

    updateInfo(id, name) {
        return new Promise((resolve, reject) => {
            if(!id || !name) {
                resolve({error: 'Id and name are required'});
            } else {
                UserModel.findByIdAndUpdate(id, {
                    name: name
                }).then(doc => {
                    resolve({
                        message: 'Update info successfully'
                    });
                }).catch(err => {
                    reject({error: err.msg});
                })
            }
        });
    },

    updatePassword(id, password) {
        return new Promise((resolve, reject) => {
            if(!id || !password) {
                resolve({error: 'Id and password are required'});
            } else {
                UserModel.findByIdAndUpdate(id, {
                    password: md5(password)
                }).then(doc => {
                    resolve({
                        message: 'Update password successfully'
                    });
                }).catch(err => {
                    reject({error: err.msg});
                })
            }
        });
    },

    login(email, password) {
        return new Promise((resolve, reject) => {
            if(!email || !password) {
                resolve({error: 'email and password are required'});
            } else if(!userHelper.emailIsValid(email)) {
                resolve({error: 'Email is invalid'});
            }else {
                UserModel.findOne({
                    email: email,
                    password: md5(password)
                }).then(doc => {
                    if(doc) {
                        resolve(doc);
                    } else {
                        resolve({
                            error: 'Cannot login, email or password is wrong.'
                        });    
                    }
                }).catch(err => {
                    reject({error: err.msg});
                })
            }
        });
    },

    getUsersDetail(userIds) {
        return new Promise((resolve, reject) => {
            UserModel.find({
                _id: {
                    $in: userIds.map(id => mongoose.Types.ObjectId(id))
                }
            }, '_id name email').then(users => {
                resolve(users);
            }).catch(err => {
                reject(err);
            });
        });
    },

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            if(!email || !userHelper.emailIsValid(email)) {
                resolve({error: 'Email is not correct'});
            } else {
                UserModel.findOne({
                    email: email
                }).then(user => {
                    resolve(user);
                }).catch(err => {
                    reject(err);
                });
            }
        });
    }
}

module.exports = userService;