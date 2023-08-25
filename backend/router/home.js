const express = require("express");

const homeController=require('../controller/home')

const router = express.Router();

router.get('/city',homeController.getCity)
router.get('/type',homeController.getType)
router.get('/top-rating',homeController.getTop)

module.exports = router;
