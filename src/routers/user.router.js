const userRouter = require('express').Router();
const userFunctionalities = require('../controllers/user.controller')


userRouter.get('/', userFunctionalities.getAllUsers)
userRouter.get('/:id', userFunctionalities.getUserWithId)
userRouter.post('/', userFunctionalities.postUser)
userRouter.put('/:id', userFunctionalities.updateUserWithId)
userRouter.get('/:id', userFunctionalities.deleteUserWithId)

module.exports = userRouter