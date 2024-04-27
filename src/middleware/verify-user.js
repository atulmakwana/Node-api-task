const jwt = require('jsonwebtoken');
const { SECRETKEY } = require('../config/devlopment');
const User = require('../models/user')

async function verifyUserToken(req,res,next)
{
    const token = req.headers.bearer
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    jwt.verify(token, SECRETKEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token, Authentication failed!!!' });
        }
        req.user = decoded;
        const isUserExist = await User.findOne({username:decoded.username})

        if(!isUserExist){
            throw new ObjectNotFoundError("No such user exist with given username!!!")
        }
        next(); 
      });
}

module.exports = verifyUserToken