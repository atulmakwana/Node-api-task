module.exports = function makeCreatePostAction({
    InternalServerError,
    createPost,
})
{
    return async function createPostAction(req,res)
    {
        try{
            const result = await createPost({
                title: req.body.title,
                bodytext: req.body.bodytext,
                createdby: req.body.createdby,
                active: req.body.active,
                geolocation: req.body.geolocation,
            })
            res.status(200).json({"Post created  successfull...":result});            
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}