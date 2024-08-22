const mongoose = require('mongoose');

const liveProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectLink: { type: String, required: true }
}, { _id: false });

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  liveProjects: [liveProjectSchema]
}, { timestamps: true, versionKey: false });

const ServiceModel = mongoose.model('Services', serviceSchema);

module.exports = ServiceModel;
