const express = require('express')
const ServiceModel = require('../../models/ServiceModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.CreateService = async(req, res) =>{
    try{
        let reqBody = req.body;
        const result = await ServiceModel.create(reqBody)
        res.status(200).json({status: 'success', data: result})
    }catch(e){
        res.status(400).json({status: 'failed'})

    }
}
exports.getAllService = async(req, res) =>{
    try{
        const result = await ServiceModel.find()
        res.status(200).json({status: 'success', data: result})
    }catch(e){
        res.status(400).json({status: 'failed'})
    }
}
exports.deleteService = async(req, res) =>{
    try{
        let id = req.params.serviceId
        await ServiceModel.deleteOne({_id: id})
        res.status(200).json({status: 'success', data: "Data delete Successfully"})
    }catch(e){
        res.status(400).json({status: 'failed'})
    }
}

exports.getServiceById = async(req, res) =>{
    try{

        let id = req.params.serviceId
        let result = await ServiceModel.findOne({_id: id})
        res.status(200).json({status: 'success', data: result})
    }catch(e){
        res.status(400).json({status: 'failed'})
    }
}

