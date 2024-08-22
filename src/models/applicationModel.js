const mongoose = require('mongoose');


const DataSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: String, required: true },
  vacancy: { type: String, required: true },
  experience: { type: String, required: true },
  responsibilities: { type: String, required: true },
  status: { type: String, required: true },
  workplace: { type: String, required: true },
  workingTime: { type: String, required: true },
  edu: { type: String, required: true },
  salary: { type: String, required: true },
  Benifits: { type: String, required: true },
}, { timestamps: true, versionKey: false });

const CareerModel = mongoose.model('applicatioins', DataSchema);

module.exports = CareerModel;