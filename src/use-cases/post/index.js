const Joi = require('joi')
const { Post } = require('../../models')
const exceptions = require('../../exceptions')

const makeCreatePostAction = require('./create-post');
const createPost = makeCreatePostAction({
    Post,
    Joi,
    ValidationError:exceptions.ValidationError,
});

const makeDeletePostAction = require('./delete-post');
const deletePost = makeDeletePostAction({
    Post,
    Joi,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
});

const makecGetPostLocation = require('./get-post-location');
const getPostLocation = makecGetPostLocation({
    Post,
});

const makeGetPostAction = require('./get-post');
const getPost = makeGetPostAction({
    Post,
    Joi,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
});

const makeUpdatePostAction = require('./update-post');
const updatePost = makeUpdatePostAction({
    Post,
    Joi,
    ValidationError:exceptions.ValidationError,
});



const post = Object.freeze({
    createPost,
    deletePost,
    getPostLocation,
    getPost,
    updatePost,
});

module.exports = post;