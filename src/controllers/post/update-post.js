module.exports = function makeUpdatePostAction({
    InternalServerError,
    updatePost,
})
{
    return async function updatePostAction(req,res)
    {
        try{
            const result = await updatePost({
                postId:req.params.id,
                title: req.body.title,
                bodytext: req.body.bodytext,
                active: req.body.active,
                geolocation: req.body.geolocation,
            })
            res.status(200).json({"Post updated  successfull...":result});            
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}