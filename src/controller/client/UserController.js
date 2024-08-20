var express = require('express');
const UserModel = require('../../models/UserModel');
const OtpModel = require('../../models/OtpModel.js');
const checkDuplicateUser = require('../../middleware/checkDuplicateUser');
const EmailSend = require('../../utility/SendEmailHelper.js');
const { EncodeToken } = require('../../utility/TokenHelper');

exports.CreateUser = async (req, res) => {
    try {
        const {name,email, contactNumber, password, } = req.body;
        const existingUser = await checkDuplicateUser(email)

        let code = Math.floor(100000+Math.random()*900000)
        let EmailText = `Your Verification Code is ${code}`
        let EmailSubject = `Your Email Verification code from Universe Soft Tech.`

        if (existingUser) {
            return res.send({ message: ' user already exists' })
        }else{
            await EmailSend(email, EmailText, EmailSubject)
            const otpUpdateResult = await OtpModel.updateOne(
                { email: email },
                { $set: { otp: code } },
                { upsert: true }
            );
            const result = await UserModel.create({
                name: name,
                email: email,
                contactNumber: contactNumber,
                password: password

            });
            res.status(200).json({ status: 'success', data: result })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ status: 'failed' })
    }
}

exports.EmailVerify = async(req, res) => {
    try{
        let email = req.params.email
        let otp = req.params.otp
        const status = 0

        const total = await OtpModel.countDocuments({email: email, otp: otp, status: status})

        if(total === 1){
            await OtpModel.updateOne({email:email}, {$set: {otp: "0", status: "1"}})
            res.status(200).json({ status: "success", data: "Verification Completed" });
        }else {
            res.status(400).json({ status: "fail", data: "Invalid verification" });
        }
        
    }catch(e){
        console.error(`Error during verification: ${err}`);
        res.status(400).json({ status: "fail", data: err.toString() });
    }
}



exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await UserModel.findOne( { email: email })

        if (!user) {
            return res.status(400).json({ status: "failed", message: "Email doesn't match" });
        }
          // Check if the password doesn't matches
          if (user.password !== password) {
            return res.status(400).json({ status: 'failed', message: 'Password does not match' });
        }
        //otp check
        let otpCheck = await OtpModel.findOne({email: email, status: "1"})
        if(otpCheck){
            let user_id = user._id.toString()
            const token = EncodeToken(email, user_id)
            let CookieOption = {expires: new Date(Date.now()+24*60*60*1000), httpOnly: false}

            res.cookie('token', token, CookieOption)
            res.status(200).json({ status: "success", message: 'Login success', token: token, data: user });

        }else{
            res.status(400).json({status:"fail",data:"You are not validate"})
        }

    } catch (e) {
        res.status(400).json({ status: 'failed' })
    }
}



exports.getProfile = async (req, res) => {
    try {
        const user_id = req.headers.user_id
        const result = await UserModel.findOne({_id: user_id})
        res.status(200).json({ status: 'success', data: result })
    } catch (e) {
        res.status(400).json({ status: 'failed' })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const result = await UserModel.find()
        res.status(200).json({ status: 'success', data: result })
    } catch (error) {
        res.status(400).json({ status: 'failed' })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const updatedData = req.body;
        const result = await UserModel.findByIdAndUpdate(id, updatedData, { new: true })
        res.status(200).json({ status: 'success', data: result })
    } catch (error) {
        res.status(400).json({ status: 'failed' })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const result = await UserModel.findByIdAndDelete(id)
        res.status(200).json({ status: 'data delete success', data: result })
    } catch (error) {
        res.status(400).json({ status: 'failed' })
    }
}