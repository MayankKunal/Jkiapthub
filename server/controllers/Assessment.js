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

exports.getAssessment=async(req,res)=>
{
    try{
             const {assessmentId}=req.body;
            //  console.log(assessmentId);
            //  const assessment = await Assessment.findById(assessmentId);

        const assessment=await Assessment.findById(assessmentId,{
            instructor:true,
            question:true,
            answer:true,

        }).populate({
        path: "answer",
        populate: {
          path: "student",
          select: 'firstName lastName image',
        },
      }).exec();

            if(!assessment) return res.status(404).json({
                success:false,
                message:"Invalid Assessment Id"
            });
        return res.status(200).json({
            success: true,
            message:"All Assessment for the given Instructor",
            data:assessment
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

exports.getAllQuestion=async(req,res)=>
{
      try{
        const questions = await Assessment.find({}, {
            question: true,
          }).populate({
            path: 'instructor',
            select: 'firstName lastName image',
          }).exec();

        if(!questions)
        {
            return res.status(404).json({
                success:false,
                message:"No Assignment posted Yet"
            })
        }

        return res.status(200).json({
            success:true,
           questions
        })

      }catch(err)
      {
        console.log(err);
        return res.status(500).json({
            success:false,
            error: err.message,
            message:"Error occred while fetching Question"
        })
      }
}