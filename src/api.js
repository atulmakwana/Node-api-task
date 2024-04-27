const controllers = require('./controllers')

const express= require('express');
const verifyUserToken = require('./middleware/verify-user');
const router=express.Router();

router.get('/', controllers.userActions.userHomeAction);
router.get('/user/login', controllers.userActions.userLoginAction);
router.post('/user/register', controllers.userActions.userRegisterAction);

router.get('/post/:id', verifyUserToken, controllers.postActions.getPostAction);
router.get('/post', verifyUserToken, controllers.postActions.getPostLocationAction);
router.post('/post', verifyUserToken, controllers.postActions.createPostAction);
router.put('/post/:id', verifyUserToken, controllers.postActions.updatePostAction);
router.delete('/post/:id', verifyUserToken, controllers.postActions.deletePostAction);

module.exports = { router };