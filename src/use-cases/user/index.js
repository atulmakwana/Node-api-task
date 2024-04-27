const Joi  = require('joi');
const config = require('../../config/devlopment')
const {User,Post} = require('../../models')
const exceptions = require('../../exceptions')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const makeCreateUser = require('./create-user');
const createUser = makeCreateUser({
    SECRETKEY:config.SECRETKEY,
    Joi, 
    User,
    bcrypt ,
    jwt,
    ValidationError:exceptions.ValidationError,
    ObjectALreadyExistError:exceptions.ObjectALreadyExistError,
});


const makeUserLogin = require('./user-login');
const userLogin = makeUserLogin({
    SECRETKEY:config.SECRETKEY,
    Joi, 
    User,
    bcrypt ,
    jwt,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    PasswordNotMatchError:exceptions.PasswordNotMatchError,
    ObjectALreadyExistError:exceptions.ObjectALreadyExistError,
});

const makeUserHome = require('./home');
const userHome = makeUserHome({
    User,
    Post
});

module.exports = Object.freeze({
    userLogin,
    userHome,
    createUser,
})