const Users = require('../models/UsersModel');
const OTPModel = require('../models/OTPModel');
const {hashPassword,checkPassword, generateToken} = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const SendMail = require('../helpers/sendEmail');
exports.Login = (req,res) => {
    try{
        const {email,password} = req.body;
        // Validation
        if(!email.trim()){
            res.status(400).json({message:"Email is required"});
        }
        if(!password.trim() && password.length >= 6){
            res.status(400).json({message:"Password is required and up to 6 characters"});
        }
        // Check user email
        Users.aggregate([
            {$match:{email:email}},
            {$project: {_id:0,email:1,firstName:1,lastName:1,password:1,mobile:1,photo:1}}
        ],(err,data)=>{
            if(err){
                res.status(400).json({status: "fail", message: "User email doesn't match"});
            }else {
                if (data.length > 0) {
                    const isMatchPass = checkPassword(password, data[0].password).then(result=>{
                       if(result){
                           let payload = {exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data[0].email};
                               let token = jwt.sign(payload, process.env.JWT_SECRET);
                               res.status(200).json({
                                   data: {
                                       firstName: data[0].firstName,
                                       lastName: data[0].lastName,
                                       email: data[0].email,
                                       mobile: data[0].mobile,
                                       photo: data[0].photo
                                   },
                                   token
                               });
                       }else{
                           res.status(400).json({status:'error',message:'Password is wrong'});
                       }
                    });
                }
            }
        });
    }catch (err) {
        res.status(400).json(err);
    }
}
exports.Register = async (req,res) => {
    try{
        const {firstName,lastName,email,password} = req.body;
        // Validation
        if(!firstName.trim()){
            res.status(400).json({message:"First Name is required"});
        }
        if(!lastName.trim()){
            res.status(400).json({message:"Last Name is required"});
        }
        if(!email.trim()){
            res.status(400).json({message:"Email is required"});
        }
        if(!password.trim() && password.length >= 6){
            res.status(400).json({message:"Password is required and up to 6 characters"});
        }
        // Check user Email
        const ifExists = await Users.findOne({email});
        if(ifExists){
            res.status(400).json({error:"Email is already taken!"});
        }
        // hashed password
        const hashed = await hashPassword(password);
        // Registration
        req.body.password=hashed;
        const reqBody = req.body;
        const user = await new Users(reqBody).save();
        res.status(201).json({
            message:"Registration successfully",
            data: {
                username: user.username,
                email: user.email
            }
        });
    }catch (err) {
        res.status(400).json({error: 'Internal server error!'});
    }
}
exports.profileUpdate = (req,res) => {
    try{
        const {email,firstName,lastName,mobile,photo} = req.body;
        Users.updateOne({email:email},{
            email,
            firstName,
            lastName,
            mobile,
            photo
        },(err,data)=>{
            if(err){
                res.status(400).json({status:'fail',message: 'Registraion failed'});
            }else{
                res.status(200).json({status:'success',data: data});
            }
        });
    }catch (err) {
        res.status(400).json({error: 'Internal server error!'});
    }
}
exports.profileDetails = (req,res) => {
    try{
        const {email} = req.headers;
        Users.aggregate([
            {$match:{email:email}},
            {$project: {_id:1,email:1,firstName: 1,lastName: 1,mobile:1,photo:1}}
        ],(err,data)=>{
            if(err){
                res.status(404).json({status:'fail',message: 'User not found!'});
            }else{
                res.status(200).json({status:'success',data: data});
            }
        });
    }catch (err) {
        res.status(400).json({error: 'Internal server error!'});
    }
}
exports.recoverVerifyEmail = async (req,res) => {
    try{
        const {email} = req.headers;
        const OTPCode = Math.floor(100000+Math.random()*900000);
        const userCount = await Users.aggregate([{$match:{email:email}}, {$count: 'total'}]);
        if(userCount.length>0) {
            await OTPModel.create({email: email, otp: OTPCode});
            const SendEmail = SendMail(email, "Your PIN Code is= " + OTPCode, "Task Manager PIN Verification");
            res.status(200).json({status:'success',message: 'Please check email for reset your password'});
        }else{
            res.status(404).json({status:'fail',message: 'user not found!'});
        }
    }catch (err) {
        console.log(err);
        res.status(400).json({error: 'Internal server error!'});
    }
}
exports.recoverVerifyOTP = async (req,res) => {
    try{
        const {email, otp} = req.params;
        const status = 0;
        const statusUpdate = 1;
        const OTPCount = await OTPModel.aggregate([{$match:{email:email,otp:otp,status:status}}, {$count: 'total'}]);
        if(OTPCount.length>0) {
           const updateOTP = await OTPModel.updateOne({email: email, otp: otp,status:status},{email: email, otp: otp,status:statusUpdate});
           res.status(200).json({status:'success',data: updateOTP});
        }else{
            res.status(404).json({status:'fail',message: 'Invalid OTP code!'});
        }
    }catch (err) {
        res.status(400).json({error: 'Internal server error!'});
    }
}
exports.recoverResetPass = async (req,res) => {
    try{
        const email = req.body['email'];
        const newPass = req.body['password'];
        const OTP = req.body['otp'];
        const statusUpdate = 1;
        const OTPCount = await OTPModel.aggregate([{$match:{email:email,otp:OTP,status:statusUpdate}}, {$count: 'total'}]);
        if(OTPCount.length>0) {
            const hashed = await hashPassword(newPass);
            const PassUpdate = await Users.updateOne({email: email},{password: hashed});
            res.status(200).json({status:'success',data: PassUpdate});
        }else{
            res.status(400).json({status:'fail',message: 'Invalid Request!'});
        }
    }catch (err) {
        res.status(400).json({error: 'Internal server error!'});
    }
}