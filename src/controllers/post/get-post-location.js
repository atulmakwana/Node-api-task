module.exports = function makeGetPostLocationAction({
    InternalServerError,
    getPostLocation,
})
{
    return async function getPostLocationAction(req,res)
    {
        try{
            const result = await getPostLocation({geolocation:req.body.geolocation,username: req.user.username})
            if(!result.length){
                res.status(200).json({"No any post found for given user and location...":result})    
            }
            else{
                res.status(200).json({"Got post successfull by given location...":result})         
            }
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}