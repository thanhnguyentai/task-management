import validator from 'email-validator';

export class UserHelper {
    static emailIsValid(email) {
        if(!email) return false;
        
        return validator.validate(email);
    }
}