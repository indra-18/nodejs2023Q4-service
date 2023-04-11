require('dotenv').config()
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt-nodejs');
const userSchema = new mongoose.Schema({
    id: String,
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

userSchema.method("toJSON", function() {
    const {__v, _id, ...obj} = this.toObject();
    obj.version = __v;
    return obj;
})

const UserModel = mongoose.model(process.env.COLLECTION_NAME, userSchema)
module.exports = UserModel;