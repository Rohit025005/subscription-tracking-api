import { createRequire } from "module";
import User from '../models/userModel.js';
const require = createRequire(import.meta.url);
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
import { mongoose } from'mongoose';

import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';

export const signUp = async (req,res,next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const {name , email, password} = req.body;

         const existingUser = await User.findOne( {email});
         if(existingUser){
            throw new Error("user already exists");
           
         }
                                         
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password,salt);

         const newUsers = await User.create([{name,email, password: hashedPassword}],{session})

         const token = jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{
            expiresIn:JWT_EXPIRES_IN
         })
        await session.commitTransaction();
        session.endSession();

        res.status(201)
        .json({
            succes:true,
            message:'new user created successfully',
            data:{
                token,
                user:newUsers[0]
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("error in sign-up",error.message)
        next(error)
    }
}

export const signIn = async (req,res,next) => {
try {
    const{ email,password} =  req.body;
    
    const user = await User.findOne({email});

    if(!user){
        const error = new Error('user not found');
        error.statusCode = 404;
        throw error;
    }

    const isPassValid = await bcrypt.compare(password,user.password)

    if(!isPassValid){
        const error = new Error('invalid password');
        error.statusCode = 404;
        throw error;
    }

    const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

         res.status(200)
        .json({
            succes:true,
            message:'signed in  successfully',
            data:{
                token,
                user
            }
        });
} catch (error) {
    next(error)
}    
}




/*
atomic operations :
db ops that udate the state are atomic
all or nothing

ex:
insert either works perfectly or fails completely

never do half operation , stop on spot

reason:
incomplete fields may invoke error in future

*/