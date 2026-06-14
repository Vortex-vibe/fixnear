const express = require("express");
const {
  createBooking,
  getBookings,
  updateBookingStatus,
  getBookingsByWorker,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBookings);
router.get("/worker/:workerId", getBookingsByWorker);
router.put("/:id", updateBookingStatus);

module.exports = router;