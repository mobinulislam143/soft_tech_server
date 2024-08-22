
const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    jobTitle: {type: String},
    description: {type: String},
    deadline: {type: String},
    vacancy: {type: String},
    experience: {type: String},
    responsibilities: {type: String},
    status: {type: String},
    workplace: {type: String},
    workingTime: {type: String},
    education: {type: String},
    salary: {type: String},
    Benifits: {type: String},

},{timestamps: true,versionKey:false})

const CareerModel = mongoose.model('careers', DataSchema)
module.exports = CareerModel
