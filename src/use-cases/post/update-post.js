module.exports = function makeUpdatePost({
    Post,
    User,
    Joi,
    ValidationError,
    ObjectNotFoundError,
})
{
    return async function updatePost({ postId, title, bodytext,  active,  geolocation, username })
    {
        try{
            const { vtitle, vbodytext, vactive }  = validateInputData({ postId, title, bodytext, active });
            
            const post = await Post.findById(postId);
            
            if (!post) {
                throw new ObjectNotFoundError(`No any such post exist with given postId!`);
            }
            
            const user = await User.findOne({ username });
            
            //if a post exist, does it belongs to the user which token is passed or not
            if(!post.createdBy.equals(user._id)){
                throw new ObjectNotFoundError(`The given post doesn't belongs to the user ${username}, can't update someone else's post`)
            }
            const updatedPost = await Post.findByIdAndUpdate(postId, { title:vtitle, bodytext:vbodytext, active:vactive, geolocation}, { new: true });

            return updatedPost
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData(data) 
    {
        const titleSchema = Joi.string().required();
        const bodytextSchema = Joi.string().min(4).required();
        const activeSchema = Joi.boolean();
 
        const { error: titleError, value: validatedTitle } = titleSchema.validate(data.title);
        if (titleError) {
            throw new ValidationError("Invalid title: " + titleError.message);
        }
    
        const { error: bodytextError, value: validatedBodytext } = bodytextSchema.validate(data.bodytext);
        if (bodytextError) {
            throw new ValidationError("Invalid bodytext: " + bodytextError.message);
        }
    
        const { error: activeError, value: validatedActive } = activeSchema.validate(data.active);
        if (activeError) {
            throw new ValidationError("Invalid active field: " + activeError.message);
        }
    
        return {
            vtitle: validatedTitle,
            vbodytext: validatedBodytext,
            vactive: validatedActive
        };
    }
    
}