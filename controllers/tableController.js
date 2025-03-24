import tableModel from "../models/tableModel.js";

const getAllTables = async (req, res) => {
  try {
    const tables = await tableModel.find();
    if (!tables || tables.length === 0) {
      return res.status(404).json({ message: "No Tables Found" });
    }
    return res.status(200).json(tables);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTable = async (req, res) => {
  try {
    const table = await tableModel.create(req.body);
    res.status(201).json(`Table added successfully! ${table}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTableById = async (req, res) => {
  try {
    const id = req.params.id;
    const table = await tableModel.findById(id);
    return res.status(200).json(table);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    const updateData = req.body;

    const updatedTable = await tableModel.findByIdAndUpdate(tableId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTable) {
      return res.status(404).json({ message: "Table not found." });
    }

    return res.status(200).json({
      message: "Table updated successfully.",
      table: updatedTable,
    });
  } catch (error) {
    console.error("Error updating table:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteTable = async (req, res) => {
  try {
    const id = req.params.id;
    await tableModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export{
  getAllTables,
  createTable,
  getTableById,
  updateTable,
  deleteTable
};
