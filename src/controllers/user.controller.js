const { isUuid } = require('uuidv4');
const UserModel = require('../models/user.model')
// const { uuid } = require('uuidv4')
const { v4 } = require('uuid')
// console.log(v4())

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
    if (!id || !isUuid(id)) {
        return res.status(400).json({message: 'Provide Valid ID'})
    }
    try {
        const user = await UserModel.findById(id)
        res.status(200).json({message: 'User Found', data: user})
    }
    catch (err) {
        res.status(404).json({message: `No User Found With ID: ${id}`})
    }
}
exports.postUser = async function (req, res) {
    if (!req.body.login || !req.body.password) {
        return res.status(400).json({message: 'Enter Login and Password'})
    }
    try {
        var newUser = new UserModel({
            id: v4(),
            login: req.body.login,
            password: req.body.password
        })
        console.log(newUser)
        newUser = await newUser.save();
        res.status(201).json({message: 'New User Added', data: newUser})
    }
    catch(err) {
        res.status(500).json({message: 'Error While Adding New User'})
    }  
}
exports.updateUserWithId = async function (req, res) {
    var id = req.params.id;
    var newPassword = req.params.password;
    if (!id || !isUuid(id)) {
        return res.status(400).json({message: 'Provide Valid ID'})
    }
    try {
        const updatedUser = await UserModel.findByIdAndUpdate({id}, req.body)
        res.status(200).json({message: 'Updated User Details', data: updatedUser})
    }
    catch (err) {
        res.status(404).json({message: `No User Found With ID: ${id}`})
    }
}
exports.deleteUserWithId = async function (req, res) {
    var id = req.params.id;
    var newPassword = req.params.password;
    if (!id || !isUuid(id)) {
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
