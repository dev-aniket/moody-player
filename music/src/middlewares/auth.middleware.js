import jwt from 'jsonwebtoken';
import config from '../config/config.js';


export async function artistMiddleware(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(400).json({
            message: "Unauthorized Access"
        })
    };

    try{
        const decoded = jwt.verify(token, config.JWT_SECRET);
            if(decoded.role !== 'artist'){
                return res.status(400).json({
                message: "Forbidden "
            })
        } 
        req.user = decoded;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            message: "Unauthorized Access"
        })
    }
}