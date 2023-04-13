const {Login, Register, profileUpdate, profileDetails, recoverVerifyEmail, recoverVerifyOTP, recoverResetPass} = require("../controller/UserController");
const {CheckAuth} = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router.post('/login', Login);
router.post('/registration', Register);
router.post('/profileUpdate', CheckAuth, profileUpdate);
router.get('/profileDetails', CheckAuth, profileDetails);
// reset password
router.post('/RecoverVerifyEmail', recoverVerifyEmail);
router.get('/RecoverVerifyOTP/:email/:otp', recoverVerifyOTP);
router.post('/RecoverResetPass', recoverResetPass);

module.exports=router;