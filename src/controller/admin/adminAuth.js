const UserModel = require('./../../models/UserModel')
require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.Adminlogin = (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            res.status(400).json({status: "Failed", data: "Please put email and password"})
        }
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            res.status(400).json({status: "Failed", data: "Please put email and password"})

        }
       
        res.status(200).json({ status: 'success', data: "login successfully" })
    } catch (e) {
        res.status(400).json({ status: 'failed' })
    }
}