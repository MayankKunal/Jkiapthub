const express = require("express")
const router = express.Router()

const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    editCourse,
    getInstructorCourses,
    deleteCourse,
    getFullCourseDetails
}=require('../controllers/Course')

const {
    showAllCategories,
    createCategory,
    categoryPageDetails
}=require('../controllers/Category')


const {
    createSection,
    updateSection,
    deleteSection
}=require('../controllers/Section')


const {
    createSubSection,
    updateSubSection,
    deleteSubSection
}=require('../controllers/SubSection')

const {
    createRating,
    getAverageRating,
    getAllReviews
    
}=require('../controllers/RatingAndReview')


const {
    auth,isAdmin,isInstructor,isStudent
}=require('../middlewares/auth')


router.post("/createSection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);
router.post("/addSubSection",auth,isInstructor,createSubSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);
router.post("/updateSubSection",auth,isInstructor,updateSubSection);

router.post("/createCourse",auth,isInstructor,createCourse);
router.get('/getAllCourses',getAllCourses);
router.get('/courseDetails',getCourseDetails)
router.post("/editCourse", auth, isInstructor, editCourse);
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);
router.delete('/deleteCourse',auth,isInstructor,deleteCourse);
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// router.post('/getFullCourseDetails',auth,isInstructor,getFullCourseDetailsllCourseDetails)


router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllReviews)

module.exports = router