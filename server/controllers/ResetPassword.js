const User=require('../models/User');
const mailSender=require('../utils/MailSender');
const crypto=require('crypto');
const bcrypt=require('bcrypt');
//reset Passsword  Token 
 exports.resetPasswordToken=async(req,res)=>
 {
    try{
  const email=req.body.email;
  if(!email) return res.status(401).json({msg:"please enter your email"});
  let user =await User.findOne({email:email}) ;
  //checking the user exist or not
  if (!user){return res.status(403).send("No account with this email found")}
    
    const token=crypto.randomUUID();
    const updateDetails=await User.findOneAndUpdate(
        {email},
        {
            token,
            resetPasswordToken:Date.now()+5*60*1000,
        },
        {new:true});

        const url=`http://localhost:3000/update-password/${token}`

        await mailSender(email,
            "Reset Password",
            `Password Reset Link ${url}`
        );
        return res.status(200).json({success:true,
            msg:`A link has been sent to your email address`});
    }
    catch(err)
    {
       console.log(err);
       return res.status(500).json({
        success:false,
        message:'Something went wrong while sending the reset password mail',
        error:err.message
       })
    }
 }

//rest Password

exports.resetPassword=async (req,res)=>
{
    try{
       const {password,confirmPassword,token}=req.body;
       if(!password || !confirmPassword ) return res.status(401).json({success:false,msg:"Please fill all fields"});
       if(password!==confirmPassword) return res.status(401).json({success:false,msg:"Passwords do not match"});

       const userDetails=await User.findOne({token});

       if(!userDetails)
       {
        return res.json({
            success:false,
            message:"Invalid Token"
        });
       }
       if(userDetails.resetPasswordExpires<Date.now())
       {
        return res.json({
            success:false,
            message:"Link Expired"
        });
       }
     const hasedPassword=await bcrypt.hash(password,10);
     
     await User.findOneAndUpdate(
        {token},
        {password:hasedPassword},
        {new:true},
     )
       
       return res.status(200).json({
        success:true,
        message:"Password Changed Successfully",
       })

      
    }
    catch(err)
    {
         console.log(err);
         return res.status(500).json({
           success:false,
           message:'Something went wrong while  reseting password'
          })
    }
    }
