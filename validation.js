const validate = require('validate.js')

const constraints = {
    fullName: {
        presence: {
            allowEmpty: false
        },
        length: {
            minimum: 6,
            maximum: 50
        }
    },
    email: {
        email: true,
        presence: {
            allowEmpty: false
        }
    },
    phoneNumber: {
        numericality: true,
        length: {
            is: 11
        },
        presence: {
            allowEmpty: false
        }
    },
    password: {
        presence: {
            allowEmpty: false
        },
        length: {
            minimum: 6
        }
    }
}

const registerValidate = (data) =>{
    return validate({ 
        fullName: data.fullName, 
        email: data.email, 
        phoneNumber: data.phoneNumber, 
        password: data.password
    }, constraints);
}

const loginValidate = (data) =>{
    return validate({
        email: data.email,
        password: data.password
    })
}

module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;