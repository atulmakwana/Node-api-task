const { user } = require('../../use-cases');
const exceptions = require('../../exceptions')

const makeuserLoginAction = require('./user-login');
const userLoginAction = makeuserLoginAction({
    InternalServerError:exceptions.InternalServerError,
    userLogin:user.userLogin
});

const makeUserRegisterAction = require('./register');
const userRegisterAction = makeUserRegisterAction({
    InternalServerError:exceptions.InternalServerError,
    createUser:user.createUser,
});

const makeuserHomeAction = require('./home');
const userHomeAction = makeuserHomeAction({
    InternalServerError:exceptions.InternalServerError,
    userHome:user.userHome
});



const userActions = Object.freeze({
    userLoginAction,
    userHomeAction,
    userRegisterAction
});

module.exports = userActions;