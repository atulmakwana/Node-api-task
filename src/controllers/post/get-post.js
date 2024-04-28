module.exports = function makeGetPostAction({
    InternalServerError,
    getPost,
})
{
    return async function getPostAction(req,res)
    {
        try{
            const result = await getPost({postId:req.params.id,username: req.user.username})
            res.status(200).json({"Got post successfull by given postId...":result})         
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}