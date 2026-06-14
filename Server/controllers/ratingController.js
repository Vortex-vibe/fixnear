const Rating = require("../models/Rating");
const Worker = require("../models/Worker");
const Booking = require("../models/Booking");

exports.createRating = async (req, res) => {
  try {
    const { workerId, bookingId, rating, review } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status !== "Completed") {
      return res.status(400).json({
        message: "You can rate only after booking is completed",
      });
    }

    const existingRating = await Rating.findOne({ bookingId });

    if (existingRating) {
      return res.status(400).json({
        message: "You have already rated this booking",
      });
    }

    const newRating = await Rating.create({
      workerId,
      bookingId,
      rating,
      review,
      userId: req.user._id,
    });

    const allRatings = await Rating.find({ workerId });

    const totalRatings = allRatings.length;

    const averageRating =
      allRatings.reduce((sum, item) => sum + item.rating, 0) / totalRatings;

    await Worker.findByIdAndUpdate(workerId, {
      rating: averageRating.toFixed(1),
      totalRatings,
    });

    res.status(201).json({
      message: "Rating submitted successfully",
      rating: newRating,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit rating",
      error: error.message,
    });
  }
};
