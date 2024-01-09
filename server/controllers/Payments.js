const {instance}=require('../config/razorpay');

const Course=require("../models/Course");
const User=require('../models/User');
const mailSender=require("../utils/MailSender");
const { default: mongoose } = require('mongoose');

exports.capturePayment=async(req,res)=>
{
    const {course_id}=req.body;
    const userId=req.user.id;
     if(!course_id)
     {
        return res.send(400).json({
            success:true,
            message:"Please provide course id",
        })
     }
     let course;
     try{
        course=await Course.findById(course_id);
         if(!course)
         {
            return res.status(400).json({
                success:false,
                message:"No such course found"
            })
         }

         const uid= new mongoose.Types.ObjectId(userId);
         if(course.studentEnrolled.includes(uid))
         {
            return res.status(200).json({
                success:false,
                message:'You are already enrolled for this course'
            })
         }
         
     }
     catch(err)
     {
        console.log(err);
        return res.status(500).json({success:false,message:err.message})
     }

     const amount=course.price;
     const currency='INR';

     const options={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId,
        }
     };

     try{
        const paymentResponse=await instance.orders.create(options);
        console.log('payment response',paymentResponse);
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescripton:course.courseDescripton,
            thumbnail:course.thumbnail,
            amount:paymentResponse.amount,
            currency:paymentResponse.currency,
            orderId:paymentResponse.id,
            status:paymentResponse.status,
            
        })
     }

     catch(err)
     {
        console.log(err);
        return res.status(500).json({success:false,message:err.message});
     }

}

exports.verifySignature=async (req,res)=>
{
   const webhookSecret='12345678';

   const signature=req.headers["x-razorpay-signature"];

   const shasum=crypto.createHmac("sha256",webhookSecret);

   shasum.update(JSON.stringify(req.body));

   const digest=shasum.digest("hex");

   if(signature === digest)
   {
      console.log("Payment id Authorised");

      const {courseId,userId}=req.body.payload.payment.entity.notes;

      try{
         const enrolledCourse=await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentEnrolled:userId}},
            {new:true}
         );

         if(!enrolledCourse)
         {
            return res.status(500).json({
               success:false,
               message:"Course not found"
            })
         }

         console.log(enrolledCourse);

         const enrolledStudent=await User.findOneAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true});
              console.log(enrolledStudent);

              const emailResponse=await mailSender(
               enrolledStudent.email,
               "Your course has been successfully purchased!",
               "You have successfully Enrolled in "+enrolledCourse.title+". Please check your dashboard for more details."
              )

              return res.status(200).json({
               success:true,
               message:"Your are enrolled in course successfully",
               data:enrolledCourse
              });

      }
      catch(err)
      {
         res.status(500).json({
            success:false,
            message:"An error occured while authorising Your payment",
            error:err.message
         })
      }
   }

   else{
      return res.status(500).json({
         success:false,
         message:"Invalid Request"
      })
   }
}