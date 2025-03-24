import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added Successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error to add food!" });
  }
};

// List all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error to list foods!" });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed Successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unable to remove food item!" });
  }
};
// Update availability of food item
const updateAvailability = async (req, res) => {
  const { id, available } = req.body;
  console.log(id);
  console.log("available",available);
  try {
    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      { available },
      { new: true }
    );
    console.log(updatedFood);
    if (!updatedFood) {
      return res.json({ success: false, message: "Food item not found!" });
    }

    res.json({ success: true, message: "Availability Updated Successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unable to update availability!" });
  }
};


export { addFood, listFood, removeFood, updateAvailability };
