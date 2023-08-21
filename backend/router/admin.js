const express = require("express");

const adminController = require("../controller/admin");
const hotelController = require("../controller/hotel");

const router = express.Router();

router.post("/admin/login", adminController.postLogin);

router.post("/admin", adminController.postAdmin);

// check admin account is login
router.use("/admin/:adminId", adminController.useAdminAuth);

router.get("/admin/:adminId/transaction", adminController.getTransaction);

router.post("/admin/:adminId/hotel/new", hotelController.postHotel);

router.post("/admin/:adminId/hotel/update", hotelController.postUpdateHotel);

router.get("/admin/:adminId/hotel", hotelController.getHotels);

router.delete("/admin/:adminId/delete-hotel/:hotelId", hotelController.deleteHotel);

router.post("/admin/:adminId/room/new", hotelController.postRoom);

router.post("/admin/:adminId/room/update", hotelController.postUpdateRoom);

router.get("/admin/:adminId/room", hotelController.getRooms);

router.delete("/admin/:adminId/delete-room/:roomId", hotelController.deleteRoom);

module.exports = router;
