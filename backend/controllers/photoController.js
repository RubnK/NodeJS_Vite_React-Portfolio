import { savePhoto, getAllPhotos } from "../models/photoModel.js";
import path from "path";
import fs from "fs";

export const uploadPhoto = async (req, res) => {
  const { title, description } = req.body;
  const filename = req.file.filename;
  const photo = await savePhoto(title, description, filename);
  res.status(201).json(photo);
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
