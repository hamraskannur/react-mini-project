const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin')

router.post("/login",AdminController.postLogin)

router.get("/getUserDetails",AdminController.getUserDetails)

router.get("/DeleteUser/:id",AdminController.DeleteUser)

router.post("/EditeUser",AdminController.EditeUser)

module.exports=router