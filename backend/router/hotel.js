const express = require("express");

const hotelController=require('../controller/hotel')

const router = express.Router();

router.get('/hotel/:hotelId',hotelController.getHotel)

router.get("/room/:roomId", hotelController.getRoom);


module.exports = router;
