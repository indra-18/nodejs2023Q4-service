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


// userSchema.pre("save", function(next) {
//     var user = this;
//     if (this.isModified('password') || this.isNew) {
//         bcrypt.genSalt(8, function(err, salt) {
//             bcrypt.hash(user.password, salt, null, function(err, hash) {
//                 if (err) return next(err);
//                 user.password = hash;
//                 next();
//             })
//         })
//     }
//     else {
//         return next();
//     }
// })

// userSchema.statics.comparePasswords = function (providedPassword, hashedPassword, callback) {
//     bcrypt.compare(providedPassword, hashedPassword, function (err, isMatch) {
//         if (err) {
//             return callback(err);
//         }
//         callback(null, isMatch);
//     })
// }

const UserModel = mongoose.model(process.env.COLLECTION_NAME, userSchema)
module.exports = UserModel;