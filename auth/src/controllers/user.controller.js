import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../confg/config.js";
import bcrypt from 'bcryptjs'
import { publishToQueue } from "../broker/rabbit.js";

export async function register(req, res){
    const {email, password, fullname:{firstName, lastName}} = req.body;

    const ifUserAlreadyExists = await userModel.findOne({email});

    if(ifUserAlreadyExists){
        return res.status(400).json({
            message:"User already exists, please login"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        email, 
        password:hash,
        fullname:{
            firstName,
            lastName
        }
    });

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, config.JWT_SECRET, {expiresIn:"3d"})

    await publishToQueue("user_created", {
            id:user._id,
            email:user.email,
            fullname:user.fullname,
            role:user.role
    })

    res.cookie("token", token);

    res.status(201).json({
        message:"User Registered Successfully",
        user:{
            id:user._id,
            email:user.email,
            fullname:user.fullname,
            role:user.role
        }
    })
};

export async function googleAuthCallback(req, res){
    const user = req.user;
    
    const isAlreadyExists = await userModel.findOne({
        $or: [
            {email:user.emails[0].value},
            {googleId:user.id}
        ]
    })

    if(isAlreadyExists){
        const token = jwt.sign({
            id: isAlreadyExists._id,
            role: isAlreadyExists.role
        }, config.JWT_SECRET, {expiresIn:"3d"})

        res.cookie("token", token);

        return res.status(200).json({
            message: "User logged in successfully",
            user:{
                id:isAlreadyExists._id,
                email:isAlreadyExists.email,
                fullname:isAlreadyExists.fullname, 
                role:isAlreadyExists.role
            }
        })
    }

    const newUser = await userModel.create({
        googleId:user.id,
        email:user.emails[0].value,
        fullname:{
            firstName:user.name.givenName,
            lastName:user.name.familyName,
        }
    })

    const token = jwt.sign({
        id:newUser._id,
        role:newUser.role
    }, config.JWT_SECRET, {expiresIn:"3d"});


    res.cookie("token", token);

    res.status(200).json({
        message:"user registered successfully",
        user:{
            id:newUser._id,
            email:newUser.email,
            fullname:newUser.fullname,
            role:newUser.role
        }
    })
}