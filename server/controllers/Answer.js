const Answer=require('../models/Answer');
const   Assessment=require('../models/Assessment')
const {uploadImageToCloudinary}=require("../utils/imageUpload");
const User=require('../models/User');

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