module.exports = function makeDeletePost({
    Post,
    Joi,
    ValidationError,
    ObjectNotFoundError,
})
{
    return async function deletePost({ postId })
    {
        try{
            const { postId }  = validateInputData({ postId });

            const deletedPost = await Post.findByIdAndDelete(postId);
            if (!deletedPost) {
                throw new ObjectNotFoundError('Post not found');
            }
            return deletedPost;
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData(data) 
    {
        const postIdSchema = Joi.number().integer();
    
        const { error: postIdError, value: validatedpostId } = postIdSchema.validate(data.postId);
        if (postIdError) {
            throw new ValidationError("Invalid post id: " + postIdError.message);
        }
    
        return {
            postId: validatedpostId,
        };
    }
    
}