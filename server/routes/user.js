const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const authVerify = require('../middlewares/authVerify')

router.post('/register',UserController.postSigup)

router.post('/login',UserController.postLogin)

router.get('/userProfile',UserController.userProfile)

router.post('/editProfilePhoto',UserController.editProfilePhoto)



module.exports=router