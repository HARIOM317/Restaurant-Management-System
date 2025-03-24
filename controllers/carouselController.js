import fs from "fs";
import path from "path";
import carouselModel from "../models/carouselModel.js";

// Get all carousel items
const getAllCarouselItems = async (req, res) => {
  try {
    const carouselItems = await carouselModel.find();
    if (!carouselItems || carouselItems.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Carousel Items Found" });
    }
    return res.status(200).json({ success: true, carouselItems });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get a carousel item by ID
const getCarouselItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const carouselItem = await carouselModel.findById(id);
    if (!carouselItem) {
      return res
        .status(404)
        .json({ success: false, message: "Carousel Item not found" });
    }
    return res.status(200).json({ success: true, carouselItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Create a new carousel item
const createCarouselItem = async (req, res) => {
  try {
    let image_filename = `carousel_images/${req.file.filename}`;
    req.body.image = image_filename;
    const carouselItem = new carouselModel(req.body);
    await carouselItem.save();
    res.status(201).json({
      success: true,
      message: "Carousel Item created successfully!",
      carouselItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update a carousel item
const updateCarouselItem = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (req.file) {
      let image_url = `carousel_images/${req.file.filename}`;
      updateData.image = image_url;

      // Find the carousel item to delete the old image file
      const carouselItem = await carouselModel.findById(id);
      if (carouselItem && carouselItem.image) {
        fs.unlink(path.resolve(carouselItem.image), (err) => {
          if (err) console.log("Error deleting old image: ", err);
        });
      }
    }

    const updatedCarouselItem = await carouselModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCarouselItem) {
      return res
        .status(404)
        .json({ success: false, message: "Carousel Item not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Carousel Item updated successfully.",
      carouselItem: updatedCarouselItem,
    });
  } catch (error) {
    console.error("Error updating carousel item:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a carousel item
const deleteCarouselItem = async (req, res) => {
  try {
    const id = req.params.id;
    const carouselItem = await carouselModel.findByIdAndDelete(id);

    if (!carouselItem) {
      return res
        .status(404)
        .json({ success: false, message: "Carousel Item not found" });
    }

    if (carouselItem.image) {
      fs.unlink(path.resolve(carouselItem.image), (err) => {
        if (err) console.log("Error deleting image: ", err);
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Carousel Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  getAllCarouselItems,
  getCarouselItemById,
  createCarouselItem,
  updateCarouselItem,
  deleteCarouselItem,
};
