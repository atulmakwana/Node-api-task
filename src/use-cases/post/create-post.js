module.exports = function makeCreatePost({
    Post,
    Joi,
    ValidationError,
})
{
    return async function createPost({ title, bodytext, createdby,  active,  geolocation })
    {
        try{
            const { vtitle, vbodytext, vactive }  = validateInputData({ title, bodytext, active });

            const newPost = new Post({
                title:vtitle, bodytext:vbodytext, createdBy:createdby,  active:vactive,  geoLocation:geolocation
            })
            const res = await newPost.save()
            return res
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