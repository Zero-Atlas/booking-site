const express = require("express");

const adminController = require("../controller/admin");
const hotelController = require("../controller/hotel");

const router = express.Router();

router.post("/login", adminController.postLogin);

router.post("/", adminController.postAdmin);

// check admin account is login
router.use("/:adminId", adminController.useAdminAuth);

router.get("/:adminId/transaction", adminController.getTransaction);

router.post("/:adminId/hotel/new", hotelController.postHotel);

router.post("/:adminId/hotel/update", hotelController.postUpdateHotel);

router.get("/:adminId/hotel", hotelController.getHotels);

router.delete("/:adminId/delete-hotel/:hotelId", hotelController.deleteHotel);

router.post("/:adminId/room/new", hotelController.postRoom);

router.post("/:adminId/room/update", hotelController.postUpdateRoom);

router.get("/:adminId/room", hotelController.getRooms);

router.delete("/:adminId/delete-room/:roomId", hotelController.deleteRoom);

module.exports = router;
