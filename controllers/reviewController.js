import reviewModel from "../models/reviewModel.js";
import { io } from "../server.js";

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find();
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No Reviews Found" });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createReview = async (req, res) => {
  try {
    const review = await reviewModel.create(req.body);

    // Emit the new user review to all connected clients
    io.emit("newReview", review);

    res.status(201).json(`Review added successfully! ${review}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getReviewById = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await reviewModel.findById(id);
    return res.status(200).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const updateData = req.body;

    const updatedReview = await reviewModel.findByIdAndUpdate(reviewId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found." });
    }

    return res.status(200).json({
      message: "Review updated successfully.",
      review: updatedReview,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    await reviewModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export{
  getAllReviews,
  createReview,
  getReviewById,
  updateReview,
  deleteReview
};
