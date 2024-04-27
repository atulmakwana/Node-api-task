module.exports = function makeGetAllPostAction({
    InternalServerError,
    getAllPost,
})
{
    return async function getAllPostAction(req,res)
    {
        try{
            const result = await getALlPost()
            res.status(200).json({"Get post successfull...":result})         
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}