const Profile=require('../models/Profile');
const User=require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUpload');


exports.updateProfile=async(req,res)=>
{
    try{
        const {dateOfBirth,about,contactNumber,gender}=req.body;
   const id=req.user.id;
        if(!dateOfBirth||!about||!contactNumber||!gender)
        {
            return res.status(400).json({
                success:false,
                message:'All Fields are Required'
            })
        }

        const userDetails=await User.findById(id);
        const profileId=userDetails.additionalDetails;
        const profileDetails=await Profile.findById(profileId);

        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.contactNumber=contactNumber;
        profileDetails.gender=gender;

        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:'Profile Updated Successfully',
            profileDetails

        })
    }
    catch(err)
    {
              return res.status(500).json({
                success:false,
                message:"An error occured while updating Profile",
                error:err.message
              })
    }
}

exports.deleteAccount=async(req,res)=>
{
    try{
    const id=req.user.id;
    const userDetails=await User.findById(id);

    if(!userDetails)
    {
        return res.status(404).json({
            success:false,
            message:'User Not Found'
        })
    }
    await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
    await User.findByIdAndDelete({_id:id});
    //hw delte the student from course
    req.logout();
    return res.status(200).json({
        success:true,
        message:'Account Deleted Successfully'
        });

        }    
     catch(err)
     {
        return res.status(500).json({
            success:false,
            message:"An Error Occurred While Deleting Account",
            error:err.message
        })
     }   
    }

    exports.getAllUserDetails = async (req, res) => {
        try {
            const id = req.user.id;
            const userDetails = await User.findById(id)
                .populate("additionalDetails")
                .exec();
            console.log(userDetails);
            res.status(200).json({
                success: true,
                message: "User Data fetched successfully",
                data: userDetails,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
    exports.updateProfilePicture=async(req,res)=>
    {
        try{
       const displayPicture=req.files.displayPicture
       const userId=req.user.id
       const image=await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
       )
       console.log(image);
       const updateProfile=await User.findByIdAndUpdate(
        {_id:userId},
        {image:image.secure_url},
        {new:true}
       )

       res.status(200).json({
        success:true,
        message:'profile picture updated',
        data:updateProfile
       })
        }
        catch{err}
        {
            return res.status(500).json({
                success: false,
                message: err.message,
              })
        }
    }

    exports.getEnrolledCourses=async (req,res)=>
    {
        try{
            const userId=req.user.id
            const userDeatails=await User.findOne({
                _id:userId
            }).populate("courses").exec()

            if(!userDeatails)
            {
                return res.status(400).json({
                    success:false,
                    message: `Could not find user with id: ${userDetails}`,
                })
            }
            res.status(200).json({
                success: true,
                message:"User enrolled courses",
                data:userDeatails.courses
            })
        }
        catch(err)
        {
               return res.status(500).json({
                success: false,
                message: err.message,
               })
        }
    }