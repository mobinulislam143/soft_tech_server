const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true, versionKey: false });

const adminmodel = mongoose.model('admins', DataSchema);

module.exports = adminmodel;
