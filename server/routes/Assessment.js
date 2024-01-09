const express=require('express');
const router=express.Router();


const {createAssessment,getAllAssessment}=require('../controllers/Assessment');
const {createAnswer}=require('../controllers/Answer');
const {
    auth,isAdmin,isInstructor,isStudent
}=require('../middlewares/auth');


router.post('/createAssessment',auth,isInstructor,createAssessment);

router.post('/postAnswer',auth,isStudent,createAnswer);

router.get('/getAssessmemt',auth,isInstructor,getAllAssessment);

module.exports=router;

