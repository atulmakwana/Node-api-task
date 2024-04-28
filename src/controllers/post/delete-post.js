module.exports = function makeDeletePostAction({
    InternalServerError,
    deletePost,
})
{
    return async function deletePostAction(req,res)
    {
        try{
            const result = await deletePost({postId:req.params.id,username: req.user.username})
            res.status(200).json({message:"Post deleted  successfull..."})         
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}