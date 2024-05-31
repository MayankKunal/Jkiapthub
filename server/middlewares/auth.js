 const jwt=require("jsonwebtoken");
 require("dotenv").config();

  const user=require("../models/User");

 exports.auth=async (req,res,next)=>
 {
    try{
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
 }

 
 exports.isStudent=async(req,res,next)=>
 {
    try{
    if(req.user.accountType !=='Student')
    {
            return res.status(401).json({
                success:false,
                  message:'Unauthorized Access! You are not a Sudent.'
            
            });
    }
    next();
    }
    catch(error)
    {
        return res.status(500).json({ 
            success:false,
            error:error,
            message:"User Role cannot be verified, Please try again."
        })
    }
 }
  
 

 exports.isInstructor=async(req,res,next)=>
 {
    try{
    if(req.user.accountType !=='Instructor')
    {
            return res.status(401).json({
                success:false,
                  message:'Unauthorized Access! You are not a Instructor.'
            
            });
    }
    next();
    }
    catch(error)
    {
        return res.status(500).json({ 
            success:false,
            message:"User Role cannot be verified, Please try again."
        })
    }
 }



 exports.isAdmin=async(req,res,next)=>
 {
    try{
        // console.log(req.user.accountType);
    if(req.user.accountType !== 'Admin')
    {
            return res.status(401).json({
                success:false,
                  message:'Unauthorized Access! You are not a Admin.'
            
            });
    }
    next();
    }
    catch(error)
    {
        return res.status(500).json({ 
            success:false,
            message:"User Role cannot be verified, Please try again."
        })
    }
 }


 