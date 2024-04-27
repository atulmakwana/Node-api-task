module.exports = function makeUserRegisterAction({
    InternalServerError,
    createUser,
})
{
    return async function userLoginAction(req,res)
    {
        try{
            const result = await createUser({name:req.body.name,username:req.body.username,password:req.body.password})
            res.status(200).json({"Registered user  successfull...":result});            
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}