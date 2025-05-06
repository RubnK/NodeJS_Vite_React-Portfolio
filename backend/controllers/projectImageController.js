import {
  saveProjectImage,
  getImagesByProjectId,
} from "../models/projectImageModel.js";

export const uploadProjectImages = async (req, res) => {
  const projectId = req.params.id;
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ error: "Aucun fichier reçu" });
  }

  const savedImages = [];
  for (const file of files) {
    const saved = await saveProjectImage(projectId, file.filename);
    savedImages.push(saved);
  }

  res.status(201).json(savedImages);
};

export const getProjectImages = async (req, res) => {
  const projectId = req.params.id;
  const images = await getImagesByProjectId(projectId);
  res.json(images);
};
