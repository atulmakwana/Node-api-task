module.exports = function makeUserLogin({
    SECRETKEY,
    Joi, 
    User,
    bcrypt ,
    jwt,
    ValidationError,
    ObjectNotFoundError,
    PasswordNotMatchError,
})
{
    return async function userLogin({username,password})
    {
        try{
            //validating inputs
            const {vusername,vpassword}  = validateInputData({username,password});

            const isUserExist = await User.findOne({username:vusername})

            //checking that is the username even exist in db or not
            if(!isUserExist){
               throw new ObjectNotFoundError("No such user exist with given username!!!")
            }
            else{
                const matchPassword = await bcrypt.compare(vpassword, isUserExist.password);
                //password matching to verify credntials
                if (matchPassword) {
                    const token = jwt.sign({ username:vusername }, SECRETKEY, { expiresIn: '1h' });
                    const updateToken = await User.findByIdAndUpdate(isUserExist._id, { token }, { new: true });

                    return token;
                } 
                else {
                    throw new PasswordNotMatchError("Invalid password for given user please enter valid password!");
                }
            }
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData(data)
    {
        const usernameSchema = Joi.string().min(4).trim().required();
        const passwordSchema = Joi.string().min(8).trim()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/)
            .required();
        const { error: usernameError,value:validatedUsername } = usernameSchema.validate(data.username);
        if (usernameError) {
            throw new ValidationError("Invalid username : "+usernameError.message)
        }
        const { error: passwordError,value:validatedPassword } = passwordSchema.validate(data.password);
        if (passwordError) {
            throw new ValidationError("Invalid passowrd : "+passwordError.message)
        }
        return { 
            vusername:validatedUsername,
            vpassword:validatedPassword 
        }
    }
}