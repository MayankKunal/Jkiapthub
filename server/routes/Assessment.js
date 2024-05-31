const express=require('express');
const router=express.Router();


const {createAssessment,getAssessment,getAllQuestion}=require('../controllers/Assessment');
const {createAnswer,getMyAnswer,updateAnswer}=require('../controllers/Answer');
const {
    auth,isAdmin,isInstructor,isStudent
}=require('../middlewares/auth');


router.post('/createAssessment',auth,isInstructor,createAssessment);

router.post('/postAnswer',auth,isStudent,createAnswer);

router.get('/getQuestion',auth,getAllQuestion);

router.get('/getMyAnswer',auth,isStudent,getMyAnswer);

router.post('/getAssessmemt',auth,getAssessment);

router.post('/updateAnswer',auth,isInstructor,updateAnswer);

module.exports=router;

