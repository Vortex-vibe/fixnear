const express = require("express");
const {
  addWorker,
  getWorkers,
  getWorkerById,
  deleteWorker,
} = require("../controllers/workerController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getWorkers);
router.get("/:id", getWorkerById);

router.post("/", protect, addWorker);
router.delete("/:id", protect, adminOnly, deleteWorker);

module.exports = router;