const RatingAndReview=require('../models/RatingAndReview');
const Course=require('../models/Course');
const { default: mongoose } = require('mongoose');

exports.createRating= async (req,res) =>
{
    try{
    const userId=req.user.id;

    const {rating,review,courseId}=req.body;

    const courseDetails=await Course.findOne({
        _id:courseId,
        studentsEnrolled: {$elemMatch :{$eq:userId}}
    })

    if(!courseDetails)
    {
        return res.status(404).json({
            success:false,
            message:"You are not enrolled in this course"
        })
    }

    const alreadyReviwed=await RatingAndReview.findOne({
        user:userId,
        course:courseId
    });

    if(alreadyReviwed)
    {
        return res.status(403).json({
            success:false,
            message:'Already reviewed'
        })
    }

    const ratingReview = await RatingAndReview.create({
        rating,review,course:courseId,user:userId
    })

    const updatedCourseDetails=await Course.findByIdAndUpdate({_id:courseId},
        {
            $push:{ratingAndReviews:ratingReview._id}
        })
    console.log(updatedCourseDetails);

      return res.status(200).json({
           success:true,
            message:"Rating and Reviews passed successfully",
            data:ratingReview
      })
    }
    catch(err)
    {
        return res.status(500).json({
            success: false,
            message:err.message
        }
        )
    }
}


exports.getAverageRating= async (req,res)=>
{
    try{
        const courseId=req.body.courseId;

        const result=await RatingAndReview.aggregate([
             {
                $match:{
                      course:new mongoose.Types.ObjectId(courseId),
                },

             },
             {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
             }
        ])

        if(result.length>0)
        {
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }

        return res.status(200).json({
            success:true,
            message:"Average Rating is 0, no ratings given till now",
            averageRating:0,
        })
    }
    catch(err)
    {
               console.log(err);

               return res.status(500).json({
                success:false,
                message:err.message,
               })
    }
}

exports.getAllReviews = async (req,res)=>
{

    try{
    const allReviews=await RatingAndReview.find({})
                         .sort({rating:"desc"})
                         .populate({
                            path:"user",
                            select:"firstName lastName email image",
                         })
                         .populate({
                            path:"course",
                            select:"courseName",
                         })
                         .exec();

                return res.status(200).json({
                    success:true,
                    message:"All reviews fetched successfully",
                    data:allReviews,

                })

            }

            catch(err)
            {
                console.log(err);

               return res.status(500).json({
                success:false,
                message:err.message,
               })
            }
}