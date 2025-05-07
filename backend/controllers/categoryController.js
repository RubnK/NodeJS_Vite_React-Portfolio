import { getAllCategories } from "../models/categoryModel.js";

export const fetchCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err) {
    console.error("Erreur fetchCategories:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
