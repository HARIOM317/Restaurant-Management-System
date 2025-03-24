import fs from "fs";
import path from "path";
import popupModel from "../models/popupModel.js";

// Get all popups
const getAllPopups = async (req, res) => {
  try {
    const popups = await popupModel.find();
    if (!popups || popups.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Popups Found" });
    }
    return res.status(200).json({ success: true, popups });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get a popup by ID
const getPopupById = async (req, res) => {
  try {
    const id = req.params.id;
    const popup = await popupModel.findById(id);
    if (!popup) {
      return res
        .status(404)
        .json({ success: false, message: "Popup not found" });
    }
    return res.status(200).json({ success: true, popup });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Create a new popup
const createPopup = async (req, res) => {
  try {
    let image_url = `popup_images/${req.file.filename}`;
    req.body.image_url = image_url;
    const popup = new popupModel(req.body);
    await popup.save();
    res
      .status(201)
      .json({ success: true, message: "Popup created successfully!", popup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update a popup
const updatePopup = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (req.file) {
      let image_url = `popup_images/${req.file.filename}`;
      updateData.image_url = image_url;

      // Find the popup to delete the old image file
      const popup = await popupModel.findById(id);
      if (popup && popup.image_url) {
        fs.unlink(path.resolve(popup.image_url), (err) => {
          if (err) console.log("Error deleting old image: ", err);
        });
      }
    }

    const updatedPopup = await popupModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPopup) {
      return res
        .status(404)
        .json({ success: false, message: "Popup not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Popup updated successfully.",
      popup: updatedPopup,
    });
  } catch (error) {
    console.error("Error updating popup:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a popup
const deletePopup = async (req, res) => {
  try {
    const id = req.params.id;
    const popup = await popupModel.findByIdAndDelete(id);

    if (popup && popup.image_url) {
      fs.unlink(path.resolve(popup.image_url), (err) => {
        if (err) console.log("Error deleting image: ", err);
      });
    }

    if (!popup) {
      return res
        .status(404)
        .json({ success: false, message: "Popup not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Popup deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { getAllPopups, getPopupById, createPopup, updatePopup, deletePopup };
