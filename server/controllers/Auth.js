const User=require('../models/User');
const OTP=require('../models/OTP');
const jwt=require('jsonwebtoken');
const otpGenerator=require("otp-generator");
const mailSender=require("../utils/MailSender");
const Profile=require('../models/Profile')
const bcrypt=require('bcrypt');
//send otp
exports.sendOTP=async (req,res)=>
{
    try{
        const {email}=req.body;

        const checkUser=await User.findOne({email});

        if(checkUser)
        {
            return res.status(401).json({
                success:false,
                message:"User already Exist",
            })
        }

        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
         console.log("OTP generated ",otp);

         let result=await OTP.findOne({otp});

         while(result)
         {
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
             result=await OTP.findOne({otp});
         }
       const otpPayload={email,otp};
       const otpBody=await OTP.create(otpPayload);

       console.log(otpBody);
       res.status(200).json({
        success:true,
        message:'OTP Sent Successfully',
        otp:otp
       })
         
    }
    catch(err)
    {
         console.log(err);
         res.status(500).json({
            success:false,
            message:err.message,
         })
    }
}
//signUp

exports.signUp=async (req,res)=>
{
    try{
       const  {
        firstName,
        lastName, email,password,confirmPassword,accountType,contactNumber,otp
       }=req.body;

       if(!firstName||!lastName||!email||!password||!confirmPassword||!otp)
       {
        return res.status(403).json({
            success:false,
            message:"All fields are required",
        })
       }

       if(password!==confirmPassword)
       {
        return res.status(403).json({
            success:false,
            message:"Password and ConfirmPassword values does not match, please try again",
        })
       }

       const userExist=await User.findOne({email});
       if(userExist){
        return res.status(400).json({
            success:false,
            message:"User already exists with this Email"
        });
    }
        const recentOTP=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOTP);

        if(recentOTP.length===0)
        {
            return res.status(400).json({
                success:false,
                message:'OTP not Found',
            })
        }
        else if (otp !== recentOTP[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

        const hasedPassword=await bcrypt.hash(password,10);

        const profileDetails=await Profile.create({
            gender:null,
          dateOFBirth:null,
          about:null,
          contactNumber:null
        })

        const user=await User.create({
            firstName,lastName,email,contactNumber,password:hasedPassword,accountType,additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:'User Registered Successfully',
            user,
        })

}
catch(err)
{
      console.log(err);
      return res.status(500).json({
        success:false,
        message:'User cannot be registered, Please try again',
      })
}
}  
//Login
exports.login=async(req,res)=>
{
    try{
          const {email,password}=req.body;
          if(!email || !password)
          {
            return res.status(403).json({
                success:false,
              message:'Please provide email and password'
            })
          }

          const user=await User.findOne({email}).populate("additionalDetails");
          if(!user){
             return res.status(403).json({
                  success:false,
                  message:'User not found, Please register First', 
          });
        }

        if(await bcrypt.compare(password,user.password))
        {
            const payload={
               email:user.email,
               id:user._id,
               accountType:user.accountType,
            }

            const token=jwt.sign(payload,process.env.JWT_SECRET,
                {
                    expiresIn:"2h",

                });

                user.token=token;
                user.password=undefined;

                const options={
                    expires:new Date(Date.now()+3*24*60*60*1000),
                    httpOnly:true
                };
          res.cookie("token",token,options).status(200).json({
            success:true,
            token,user,message:"Logged in successfuly",
          })
                
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Invalid Password"
            })
        }
            
        }
            
          
    
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err,
            message:'Login Failure, please try again',
        })
    }
        
    
}

//Change Password 

exports.changePaasword=async(req,res)=>
{
    try{
    const userDetails=await User.findById(req.user.id);
    const {oldPassword,newPassword,confirmNewPassword}=req.body;

    const isPasswordMatch=await bcrypt.compare(oldPassword,userDetails.password);

    if(!isPasswordMatch)
    {
        return res.status(401).json({success:false,message:"This password is incorrect"});

    }

    if(newPassword!==confirmNewPassword)
    {
        return res.status(400).json({
            success:false,
            message:"Your new password and confirmation password do not match."
        })
    }

    const hasedPassword=await bcrypt.hash(newPassword,10);

    const updatedUserDetails=await User.findByIdAndUpdate(
        req.user.id,
        {password:hasedPassword},
        {new:true}
    )
        try{
             const emailResponse=await mailSender(
                updatedUserDetails.email,
                
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                
             )
             console.log("Email sent successfully:", emailResponse.response);
        }
        catch(error)
        {
            console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
        }

        return res.status(200).json({
            success: true,
            message: 'Password Updated Successfully',
        })
    }
    catch(error)
    {
        console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}