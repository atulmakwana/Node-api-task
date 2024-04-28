module.exports = function makeCreatePostAction({
    InternalServerError,
    createPost,
})
{
    return async function createPostAction(req,res)
    {
        try{
            // req.user for getting username from the middleware

            const result = await createPost({
                title: req.body.title,
                bodytext: req.body.bodytext,
                username: req.user.username,
                active: req.body.active,
                geolocation: req.body.geolocation,
            })
            res.status(200).json({"Post created  successfull with credentials : ":result});            
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}