import { saveContactMessage, getMessagesFromDb } from "../models/contactModel.js";

export const handleContact = async (req, res) => {
  const { name, email, message } = req.body;
  if (!email || !message)
    return res.status(400).json({ error: "Email et message requis" });

  const saved = await saveContactMessage(name, email, message);
  res.status(201).json({ success: true, data: saved });
};

export const getContactMessages = async (req, res) => {
  const messages = await getMessagesFromDb();
  res.json(messages);
};
