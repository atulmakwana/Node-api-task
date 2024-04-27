module.exports = function makeGetPostLocationAction({
    InternalServerError,
    getPostLocation,
})
{
    return async function getPostLocationAction(req,res)
    {
        try{
            const result = await getPostLocation({geolocation:req.body.geolocation})
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