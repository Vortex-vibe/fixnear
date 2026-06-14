const express = require("express");
const { createRating } = require("../controllers/ratingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createRating);

module.exports = router;