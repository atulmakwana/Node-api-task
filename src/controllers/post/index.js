const { post } = require('../../use-cases');
const exceptions = require('../../exceptions')

const makeCreatePostAction = require('./create-post');
const createPostAction = makeCreatePostAction({
    InternalServerError:exceptions.InternalServerError,
    createPost:post.createPost
});

const makeDeletePostAction = require('./delete-post');
const deletePostAction = makeDeletePostAction({
    InternalServerError:exceptions.InternalServerError,
    deletePost:post.deletePost
});

const makecGetPostLocationAction = require('./get-post-location');
const getPostLocationAction = makecGetPostLocationAction({
    InternalServerError:exceptions.InternalServerError,
    getPostLocation:post.getPostLocation
});

const makeGetPostAction = require('./get-post');
const getPostAction = makeGetPostAction({
    InternalServerError:exceptions.InternalServerError,
    getPost:post.getPost
});

const makeUpdatePostAction = require('./update-post');
const updatePostAction = makeUpdatePostAction({
    InternalServerError:exceptions.InternalServerError,
    updatePost:post.updatePost
});



const postActions = Object.freeze({
    createPostAction,
    deletePostAction,
    getPostLocationAction,
    getPostAction,
    updatePostAction,
});

module.exports = postActions;