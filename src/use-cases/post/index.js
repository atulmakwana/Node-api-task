const Joi = require('joi')
const { Post,User } = require('../../models')
const exceptions = require('../../exceptions')

const makeCreatePostAction = require('./create-post');
const createPost = makeCreatePostAction({
    Post,
    User,
    Joi,
    ValidationError:exceptions.ValidationError,
});

const makeDeletePostAction = require('./delete-post');
const deletePost = makeDeletePostAction({
    Post,
    User,
    Joi,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
});

const makecGetPostLocation = require('./get-post-location');
const getPostLocation = makecGetPostLocation({
    Post,
    User,
});

const makeGetPostAction = require('./get-post');
const getPost = makeGetPostAction({
    Post,
    User,
    Joi,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
});

const makeUpdatePostAction = require('./update-post');
const updatePost = makeUpdatePostAction({
    Post,
    User,
    Joi,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
});



const post = Object.freeze({
    createPost,
    deletePost,
    getPostLocation,
    getPost,
    updatePost,
});

module.exports = post;