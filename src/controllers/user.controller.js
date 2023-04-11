
const UserModel = require('../models/user.model')
// const { uuid } = require('uuidv4')
// console.log(v4())
const { v4, validate } = require('uuid')
const bcrypt = require('bcrypt-nodejs')

var exports = module.exports = {};

exports.getAllUsers = async function (req, res) {
    try {
        const allUsers = await UserModel.find()
        if (allUsers.length === 0) {
            return res.status(201).json({message: 'Users List is Empty'})
        }
        res.status(200).json({message: 'Fetched Users Successfully', data: allUsers})
    }
    catch(err) {
        res.json({message: err.message})
    }
}
exports.getUserWithId = async function (req, res) {
    var id = req.params.id;
    if (!id || !validate(id)) {
        return res.status(400).json({message: 'Provide Valid ID'})
    }
    try {
        const user = await UserModel.findById({id : req.params.id})
        res.status(200).json({message: 'User Found', data: user})
    }
    catch (err) {
        res.status(404).json({message: `No User Found With ID: ${err.message}`})
    }
}
exports.postUser = async function (req, res) {
    if (!req.body.login || !req.body.password) {
        return res.status(400).json({message: 'Enter Login and Password'})
    }
    try {
        const password = req.body.password;
        // console.log(password)
        const salt = await bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)
        // console.log(hashedPassword)
        var newUser = new UserModel({
            id: v4(),
            login: req.body.login,
            password: hashedPassword
        })

        newUser = await newUser.save();
        res.status(201).json({message: 'New User Added', data: newUser})
    }
    catch(err) {
        res.status(500).json({message: `Error While Adding New User ${err.message}`})
    }  
}
exports.updateUserWithId = async function (req, res) {
    var id = req.params.id;
    if (!id || !validate(id)) {
        return res.status(400).json({message: 'Provide Valid ID'})
    }
    try {
        var oldPassword = req.params.oldPassword
        var newPassword = req.params.newPassword;
        const user = await UserModel.findById(id)
        if (!user) {
            res.status(404).json({message: `No User Found With ID: ${id}`})
        }
        var hashedPassword = user.password
        var isMatched = await bcrypt.compareSync(oldPassword, hashedPassword);
        if (isMatched) {
            newHashPassword = await bcrypt.hashSync(newPassword, 8)
            // const updatedUser = await UserModel.findByIdAndUpdate({id}, req.body)
            user.password = newHashPassword
            res.status(200).json({message: 'Updated User Details', data: user})
        }
        else {
            res.status(403).json({message: `Old Password is wrong`})
        }
    }
    catch (err) {
        res.status(404).json({message: `Error while Updating Password: ${err.message}`})
    }
}
exports.deleteUserWithId = async function (req, res) {
    var id = req.params.id;
    if (!id || !validate(id)) {
        return res.status(400).json({message: 'Provide Valid ID'})
    }
    try {
        const deletedUser = await UserModel.findByIdAndRemove({id})
        res.status(204).json({message: 'Updated User Details', data: deletedUser})
    }
    catch (err) {
        res.status(404).json({message: `No User Found With ID: ${id}`})
    }
}
