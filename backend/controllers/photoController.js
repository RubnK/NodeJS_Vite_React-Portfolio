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
      filename: req.file.path, 
      categoryIds: parsedCategories,
    });

    res.status(201).json(photo);
  } catch (err) {
    console.error(err);
    console.error("req.file :", req.file);
    console.error("req.body :", req.body);
    res.status(500).json({ error: 'Erreur lors de l’upload de la photo : '+err });
  }
};


export const getPhotos = async (req, res) => {
  const photos = await getAllPhotos();
  res.json(photos);
};
