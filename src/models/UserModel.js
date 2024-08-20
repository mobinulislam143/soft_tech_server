const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePhoto: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        role: ["admin", 'user']
    },
    password: {
        type: String,
        required: true
    }
   
}, { timestamps: true, versionKey: false })
const UserModel = model('users', userModelSchema);
module.exports = UserModel;   