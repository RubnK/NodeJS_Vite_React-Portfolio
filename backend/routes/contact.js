import express from "express";
import { handleContact, getContactMessages } from "../controllers/contactController.js";

const router = express.Router();
router.post("/", handleContact);
router.get("/", getContactMessages);

export default router;
