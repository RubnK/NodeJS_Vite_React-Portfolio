import { saveProjectImage, getImagesByProjectId } from "../models/projectImageModel.js";
import { saveImageLocally, deleteImageLocally } from "../utils/imageStorage.js";

export const uploadProjectImages = async (req, res) => {
  try {
    const { projectId } = req.body;

    // Sauvegarder l'image localement avec un ID unique
    const imageInfo = await saveImageLocally(
      req.file.buffer,
      req.file.originalname,
      'projects'
    );

    const image = await saveProjectImage(
      projectId,
      imageInfo.url
    );

    res.status(201).json({
      ...image,
      url: imageInfo.url
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne: " + err.message });
  }
};

export const getProjectImages = async (req, res) => {
  const { id } = req.params;
  try {
    const images = await getImagesByProjectId(id);
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne : " + err.message });
  }
};

export default uploadProjectImages;