const Answer=require('../models/Answer');
const   Assessment=require('../models/Assessment')
const {uploadImageToCloudinary}=require("../utils/imageUpload");
const User=require('../models/User');
const mongoose = require('mongoose');

exports.createAnswer=async(req,res)=>
{

    try{

        const {assessmentId}=req.body;
           const answer=req.files.answer;
             
           if(!answer) return res.status(401).send({msg:"No file uploaded"});
           let result = await uploadImageToCloudinary(answer);
            
           const userId=req.user.id;

           const studentDetails=await User.findById(userId);

           if(!studentDetails)
           {
            return res.status(404).json({
                success:false,
                message:"Student not found",
            })
           }

           const newAnswer=await Answer.create({
            student:studentDetails._id,
            answer:result.secure_url
      });

      const updateAssessment=await Assessment.findByIdAndUpdate(
        {_id:assessmentId},
        {$push:{answer:newAnswer._id}},
        {new:true}
      ).populate("answer");

      return res.status(200).json({
        success:true,
        message:'Answer Posted Successfully',
        updateAssessment
    })
    }
    catch(err){
           
        return res.status(500).json({
            success:false,
            message:'An Error occured while posting answer',
            error:err.message
        })

    }
}
exports.updateAnswer = async (req, res) => {
    try {
        console.log("Nhi fata");
        const answer = req.files.answer;
        const { answerId } = req.body;
        console.log("Nhi fata");
        console.log(answerId);
    //  console.log(answer);
        // Ensure answerId is in the correct ObjectId format
        // const objectId = mongoose.Types.ObjectId(answerId);

        const image = await uploadImageToCloudinary(
            answer,
            process.env.FOLDER_NAME,
            1000,
            1000
        );
console.log("ANswerId,",answerId);
        

        const updatedAnswer = await Answer.findByIdAndUpdate(
            {_id:answerId},
            { answer: image.secure_url }, // Assuming "answer" is the field where the image URL is stored
            { new: true }
        );

        if (!updatedAnswer) {
            return res.status(404).json({
                success: false,
                message: `Answer with ID ${answerId} not found.`,
            });
        }

        res.send({
            success: true,
            message: `Answer updated successfully`,
            data: updatedAnswer,
        });
    } catch (error) {
        console.error("Error updating answer:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getMyAnswer=async(req,res)=>
{
    try{
           const studentId=req.user.id;
        const myAnswer=await Answer.findById(studentId);

        if(!myAnswer) return res.status(404).json({
            success:true,
            message:"You have not answered this question",
        })

        return   res.status(200).json({
                    success:true,
                      myAnswer
                }) 

    }catch(err)
    {
        return res.status(500).json({
            success:false,
            message:'An Error occured while fetching your answer',
            error:err.message
        })
    }
}