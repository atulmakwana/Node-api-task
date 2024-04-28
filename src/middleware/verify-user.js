const jwt = require('jsonwebtoken');
const { SECRETKEY } = require('../config/devlopment');
const User = require('../models/user')
const { ObjectNotFoundError,InternalServerError } = require('../exceptions')

async function verifyUserToken(req,res,next)
{
    try{
        const token = req.headers.bearer
        if (!token) {
            return res.status(401).json({ message: 'No token provided, please provide a token first!' });
        }
        
        jwt.verify(token, SECRETKEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token, Authentication failed!!!' });
            }
            req.user = decoded;
            const isUserExist = await User.findOne({username:decoded.username})

            if(!isUserExist){
                return res.status(404).json({ message: 'Invalid token, No such user exist in our db!!!' });
            }
            next(); 
        });
    }
    catch(error){
        res.status(error.httpStatusCode || 500).send(error.message);
    }
}

module.exports = verifyUserToken