import jwt from 'jsonwebtoken';

//const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';


//console.log('JWT_SECRET:', process.env.JWT_SECRET);


export const generateToken = (payload : object) : string =>{
    return jwt.sign(payload, JWT_SECRET, {expiresIn : '7d'} )
}

export const verifyToken = (token : string) =>{
    return jwt.verify(token, JWT_SECRET)
}
