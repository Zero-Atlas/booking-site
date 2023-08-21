const express = require("express");

const userController=require('../controller/user')

const router = express.Router();

router.get('/transaction/:userId',userController.getTransaction)

router.post('/user/booked',userController.postBooked)

router.post('/user/login',userController.postLogin)

router.post('/user/signup',userController.postSignup)

router.post('/user',userController.getUser)

module.exports = router;
