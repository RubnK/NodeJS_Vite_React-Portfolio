import { savePhoto, getAllPhotos } from "../models/photoModel.js";
import path from "path";
import fs from "fs";

export const uploadPhoto = async (req, res) => {
  try {
    const { title, location, took_at, categoryIds } = req.body;
    const filename = req.file.filename;

    const parsedCategories = Array.isArray(categoryIds)
      ? categoryIds
      : categoryIds
        ? JSON.parse(categoryIds)
        : [];

    const photo = await savePhoto({
      title,
      location,
      took_at,
      filename,
      categoryIds: parsedCategories,
    });

    res.status(201).json(photo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l’upload de la photo' });
  }
};


export const getPhotos = async (req, res) => {
  const photos = await getAllPhotos();
  res.json(photos);
};

export const servePhoto = async (req, res) => {
  const file = `uploads/${req.params.filename}`;
  if (!fs.existsSync(file))
    return res.status(404).json({ error: "Image non trouvée" });
  res.sendFile(path.resolve(file));
};
