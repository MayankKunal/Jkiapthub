const express=require('express')
const router=express.Router()

const {
    login,signUp,sendOTP,changePaasword
}=require('../controllers/Auth');

const {resetPassword,resetPasswordToken}=require('../controllers/ResetPassword');

const {auth}=require('../middlewares/auth');

router.post("/login",login);
router.post('/signup',signUp);
router.post('/sendotp',sendOTP);
router.post('/changepassword',auth,changePaasword);
router.post('/reset-password-token',resetPasswordToken);
router.post('/reset-password',resetPassword);

module.exports=router