const LeaveRequest = require("../models/LeaveRequest");
const Worker = require("../models/Worker");

exports.createLeaveRequest = async (req, res) => {
  try {
    const { workerId, reason } = req.body;

    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    const request = await LeaveRequest.create({
      workerId,
      workerName: worker.name,
      reason,
    });

    res.status(201).json({
      message: "Leave request sent to admin",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send leave request",
      error: error.message,
    });
  }
};

exports.getLeaveRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find()
      .populate("workerId")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch leave requests",
      error: error.message,
    });
  }
};

exports.approveLeaveRequest = async (req, res) => {
  try {
    const request = await LeaveRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    await Worker.findByIdAndDelete(request.workerId);

    request.status = "Approved";
    await request.save();

    res.status(200).json({
      message: "Leave request approved and worker removed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve request",
      error: error.message,
    });
  }
};

exports.rejectLeaveRequest = async (req, res) => {
  try {
    const request = await LeaveRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    request.status = "Rejected";
    await request.save();

    res.status(200).json({
      message: "Leave request rejected",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reject request",
      error: error.message,
    });
  }
};