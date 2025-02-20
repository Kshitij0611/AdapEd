import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const generateToken = (res, userId) => {
    dotenv.config();
    const token = jwt.sign({ userId }, process.env.JWT_SECRET,{
        expiresIn: '30d'
    });
    // console.log(token)
    res.cookie('jwt', token, {
        httpOnly: true,
        withCredentials: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
    return token;
}

export default generateToken;