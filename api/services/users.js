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
        
    }

    updatePassword(id, password) {

    }

    login() {}
}

export default new UserService();