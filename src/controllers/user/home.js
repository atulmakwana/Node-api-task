module.exports = function userHomeAction({
    InternalServerError,
    userHome
})
{
    return async function userHomeAction(req,res)
    {
        try{
            const result = await userHome();
            res.status(200).json({"Home page : ":result}); 
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}