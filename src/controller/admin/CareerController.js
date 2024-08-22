const CareerModel = require('./../../models/CareerModel')
const UserModel = require('./../../models/UserModel')

exports.CreateCareer = async(req, res) =>{
    try{
        let user_id = req.headers.user_id
        await UserModel.findOne({_id: user_id})
        let reqBody = req.body;
        const result = await CareerModel.create(reqBody)
        res.status(200).json({status: 'success', data: result})
    }catch(e){
        res.status(400).json({status: 'failed'})
    }
}
exports.getAllCareer = async(req, res) =>{
    try{
        const result = await CareerModel.find()
        res.status(200).json({status: 'success', data: result})
    }catch(e){
        res.status(400).json({status: 'failed'})
    }
}
exports.getSingleCareer = async(req, res) =>{
    try{
        const Careerid = req.params.CareerID
        const result = await CareerModel.find({_id: Careerid})
        res.status(200).json({status: 'success', data: result})
    }catch(e){
        res.status(400).json({status: 'failed'})
    }
}
exports.deleteCareer = async(req, res) =>{
    try{
        const Careerid = req.params.CareerID
        const result = await CareerModel.deleteOne({_id: Careerid})
        res.status(200).json({status: 'success', data: result})
    }catch(e){
        res.status(400).json({status: 'failed'})
    }
}