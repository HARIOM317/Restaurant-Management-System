import contactModel from "../models/contactModel.js";
import { io } from "../server.js";

const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts Found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createContact = async (req, res) => {
  try {
    const contact = await contactModel.create(req.body);

    // Emit the new user contact message to all connected clients
    io.emit("newContactMessage", contact);

    res.status(201).json(`Contact added successfully! ${contact}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await contactModel.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const updateData = req.body;

    const updatedContact = await contactModel.findByIdAndUpdate(
      contactId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    return res.status(200).json({
      message: "Contact updated successfully.",
      contact: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    await contactModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
};
