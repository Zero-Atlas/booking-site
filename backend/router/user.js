const express = require("express");

const userController=require('../controller/user')

const router = express.Router();

router.get('/transaction/:userId',userController.getTransaction)

router.post('/booked',userController.postBooked)

router.post('/login',userController.postLogin)

router.post('/signup',userController.postSignup)

router.post('/',userController.getUser)

module.exports = router;
