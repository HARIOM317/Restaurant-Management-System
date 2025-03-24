import express from "express";
const contactRouter = express.Router();

import {createContact,deleteContact,getAllContacts,getContactById,updateContact} from '../controllers/contactController.js';
import authMiddleware from "../middleware/auth.js";

contactRouter.get('/', authMiddleware(["admin","staff"]), getAllContacts);
contactRouter.post('/', createContact);
contactRouter.get('/:id',authMiddleware(["admin","staff"]), getContactById);
contactRouter.patch('/:id',authMiddleware(["admin","staff"]), updateContact);
contactRouter.delete('/:id',authMiddleware(["admin","staff"]), deleteContact);

export default contactRouter;
