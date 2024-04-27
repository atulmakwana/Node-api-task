module.exports = function makeUserLoginAction({
    InternalServerError,
    userLogin
})
{
    return async function userLoginAction(req,res)
    {
        try{
            const result = await userLogin({ username:req.body.username, password:req.body.password });
            res.status(200).json({"User login  successfull...":result}); 
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}