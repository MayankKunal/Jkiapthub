const express = require("express")
const router = express.Router()
const { auth } = require('../middlewares/auth')

const {updateProfile,deleteAccount,getAllUserDetails,updateProfilePicture,getEnrolledCourses}=require('../controllerS/Profiles.js')

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateProfilePicture)

module.exports = router