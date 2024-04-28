module.exports = function makeGetPost({
    Post,
    User,
    ObjectNotFoundError,
})
{
    return async function getPost({ postId,username })
    {
        try{
            const post = await Post.findById(postId);
            
            //checking even such post exist or not
            if (!post) {
                throw new ObjectNotFoundError(`No any post exist with given postId`);
            }

            const user = await User.findOne({ username });

            //if a post exist, does it belongs to the user which token is passed or not
            if(!post.createdBy.equals(user._id)){
                throw new ObjectNotFoundError(`The given post doesn't belongs to the user ${username}, can't get someone else's post`)
            }
            
            return post;
        }
        catch(error){
            throw error;
        }
    }
}