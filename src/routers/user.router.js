const router = require('express').Router();
const userFunctionalities = require('../controllers/user.controller')


router.get('/', userFunctionalities.getAllUsers)
router.get('/:id', userFunctionalities.getUserWithId)
router.post('/', userFunctionalities.postUser)
router.put('/:id', userFunctionalities.updateUserWithId)
router.get('/:id', userFunctionalities.deleteUserWithId)

module.exports = router