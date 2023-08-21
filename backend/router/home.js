const express = require("express");

const homeController=require('../controller/home')

const router = express.Router();

router.get('/home/city',homeController.getCity)
router.get('/home/type',homeController.getType)
router.get('/home/top-rating',homeController.getTop)

module.exports = router;
