import validator from 'email-validator';

const userHelper = {
    emailIsValid(email) {
        if(!email) return false;
        
        return validator.validate(email);
    }
}

module.exports = userHelper;