const Assessment=require('../models/Assessment');
const User = require("../models/User");
const {uploadImageToCloudinary}=require('../utils/imageUpload');

exports.createAssessment=async(req,res)=>
{
    try{
        const question=req.files.question;

          if(!question) 
          {
            return res.status(401).json({success:false,
            message:"Please post A Question"
            })
          }

          const userId=req.user.id;
          const instructorDetails=await User.findById(userId);
         
          if(!instructorDetails)
          {
              return res.status(404).json({
                  success:false,
                  message:"Instructor not found",
              })
          }

         const questionImage=await uploadImageToCloudinary(question,process.env.FOLDER_NAME);

          const newAssessment=await Assessment.create({
                instructor:instructorDetails._id,
                question:questionImage.secure_url
          });

          return res.status(200).json({
            success:true,
            message:"Assessment Created Successfully",
            data:newAssessment
          })

    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            error: err.message,
            message:"Error occred while creating Assessment"
        })

    }
}

exports.getAllAssessment=async(req,res)=>
{
    try{

        const allAssessment=await Assessment.find({},{
            instructor:true,
            question:true,
            answer:true,
        }).populate("answer").exec();

        return res.status(200).json({
            success: true,
            message:"All Assessment for the given Instructor",
            data:allAssessment
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            error: err.message,
            message:"Error occred while fetching Assessment"
        })
    }
    
}