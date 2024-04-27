module.exports = function makeGetPost({
    Post,
    ObjectNotFoundError,
})
{
    return async function getPost({ postId })
    {
        try{
            const getPostById = await Post.findById(postId);
            if (!getPostById) {
                throw new ObjectNotFoundError('No post with given id found!');
            }
            return getPostById;
        }
        catch(error){
            throw error;
        }
    }
}