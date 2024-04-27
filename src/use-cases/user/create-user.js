module.exports = function makeCreateUser({
    SECRETKEY,
    Joi, 
    User,
    bcrypt ,
    jwt,
    ValidationError,
    ObjectALreadyExistError,
})
{
    return async function createUser({name,username,password})
    {
        try{
            //to validate inputs and remove spaces if any in front or end
            const {vname,vusername,vpassword}  = validateInputData({name,username,password});

            const isUsernameExist = await User.findOne({username:vusername})

            //checking if same username already existed in db
            if(isUsernameExist){
               throw new ObjectALreadyExistError("User with same user name already exist!!!")
            }
            const token = jwt.sign({ username:vusername }, SECRETKEY, { expiresIn: '1h' });
            const hashedPassword = await bcrypt.hash(vpassword, 10);

            const newUser = new User({
                name:vname, 
                username:vusername,
                password: hashedPassword,
                token,
            })
            const newuser = await newUser.save()
            return {token,id:newuser._id}
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData(data)
    {
        const nameSchema = Joi.string().trim().min(4).required();
        const usernameSchema = Joi.string().min(4).trim().required();
        const passwordSchema = Joi.string().min(8).trim()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/)
            .required();
        const { error: nameError,value: validatedName } = nameSchema.validate(data.name);
        if (nameError) {
            throw new ValidationError("Invalid name : "+nameError.message)
        }
        const { error: usernameError,value: validatedUsername } = usernameSchema.validate(data.username);
        if (usernameError) {
            throw new ValidationError("Invalid username : "+usernameError.message)
        }
        const { error: passwordError,value: validatedPassword } = passwordSchema.validate(data.password);
        if (passwordError) {
          throw new ValidationError("Invalid passowrd : "+passwordError.message)
        }
        return { vname:validatedName, 
            vusername:validatedUsername,
            vpassword:validatedPassword 
        }
    }
}