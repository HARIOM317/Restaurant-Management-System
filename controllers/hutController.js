import hutModel from "../models/hutModel.js";

const getAllHuts = async (req, res) => {
  try {
    const huts = await hutModel.find();
    if (!huts || huts.length === 0) {
      return res.status(404).json({ message: "No Huts Found" });
    }
    return res.status(200).json(huts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createHut = async (req, res) => {
  try {
    const hut = await hutModel.create(req.body);
    res.status(201).json(`Hut added successfully! ${hut}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getHutById = async (req, res) => {
  try {
    const id = req.params.id;
    const hut = await hutModel.findById(id);
    return res.status(200).json(hut);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateHut = async (req, res) => {
  try {
    const hutId = req.params.id;
    const updateData = req.body;

    const updatedHut = await hutModel.findByIdAndUpdate(hutId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedHut) {
      return res.status(404).json({ message: "Hut not found." });
    }

    return res.status(200).json({
      message: "Hut updated successfully.",
      hut: updatedHut,
    });
  } catch (error) {
    console.error("Error updating hut:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteHut = async (req, res) => {
  try {
    const id = req.params.id;
    await hutModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Hut deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllHuts, createHut, getHutById, updateHut, deleteHut };
