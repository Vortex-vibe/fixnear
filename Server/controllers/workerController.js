const Worker = require("../models/Worker");

exports.addWorker = async (req, res) => {
  try {
    const worker = await Worker.create(req.body);

    res.status(201).json({
      message: "Worker added successfully",
      worker,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add worker",
      error: error.message,
    });
  }
};

exports.getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find().sort({ createdAt: -1 });

    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch workers",
      error: error.message,
    });
  }
};
exports.getWorkerById = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      });
    }

    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch worker",
      error: error.message,
    });
  }
};
exports.deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      });
    }

    res.status(200).json({
      message: "Worker deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete worker",
      error: error.message,
    });
  }
};