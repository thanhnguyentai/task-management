import md5 from 'md5';
import { UserModel } from '../entities/users';
import { UserHelper } from '../helpers/users';


class UserService {
    create(name, email, password) {
        return new Promise((resolve, reject) => {
            if(!name || !email || !password) {
                reject({error: 'Name, email and password are required.'});
            } else if(!UserHelper.emailIsValid(email)) {
                reject({error: 'Email is invalid'});
            } else {
                UserModel.findOne({
                    email: email
                }).then(doc => {
                    if(doc) {
                        reject({error: "This email is already used"});
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
    }

    updateInfo(id, name) {
        return new Promise((resolve, reject) => {
            if(!id || !name) {
                reject({error: 'Id and name are required'});
            } else {
                UserModel.findByIdAndUpdate(id, {
                    name: name
                }).then(doc => {
                    resolve({
                        message: 'Update info successfully'
                    });
                }).catch(err => {
                    reject({
                        error: 'Update info failed'
                    });
                })
            }
        });
    }

    updatePassword(id, password) {
        return new Promise((resolve, reject) => {
            if(!id || !password) {
                reject({error: 'Id and password are required'});
            } else {
                UserModel.findByIdAndUpdate(id, {
                    password: md5(password)
                }).then(doc => {
                    resolve({
                        message: 'Update password successfully'
                    });
                }).catch(err => {
                    reject({
                        error: 'Update password failed'
                    });
                })
            }
        });
    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            if(!email || !password) {
                reject({error: 'email and password are required'});
            } else if(!UserHelper.emailIsValid(email)) {
                reject({error: 'Email is invalid'});
            }else {
                UserModel.findOne({
                    email: email,
                    password: md5(password)
                }).then(doc => {
                    resolve(doc);
                }).catch(err => {
                    reject({
                        error: 'Cannot login, email or password is wrong.'
                    });
                })
            }
        });
    }
}

export default new UserService();