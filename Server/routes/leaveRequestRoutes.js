const express = require("express");
const {
  createLeaveRequest,
  getLeaveRequests,
  approveLeaveRequest,
  rejectLeaveRequest,
} = require("../controllers/leaveRequestController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createLeaveRequest);

router.get("/", protect, adminOnly, getLeaveRequests);

router.put("/approve/:id", protect, adminOnly, approveLeaveRequest);

router.put("/reject/:id", protect, adminOnly, rejectLeaveRequest);

module.exports = router;