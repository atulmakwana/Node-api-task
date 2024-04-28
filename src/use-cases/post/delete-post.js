module.exports = function makeDeletePost({
    Post,
    User,
    ObjectNotFoundError,
})
{
    return async function deletePost({ postId,username })
    {
        try{
            const user = await User.findOne({ username });
            const post = await Post.findById(postId);

            //checking even such post exist or not
            if (!post) {
                throw new ObjectNotFoundError('No any post exist with given postId!');
            }

            //if a post exist, does it belongs to the user which token is passed or not
            if(!post.createdBy.equals(user._id)){
                throw new ObjectNotFoundError(`The given post doesn't belongs to the user ${username}, can't delete someone else's post`)
            }

            const deletedPost = await Post.findByIdAndDelete(postId);
            
            return deletedPost;
        }
        catch(error){
            throw error;
        }
    }
}