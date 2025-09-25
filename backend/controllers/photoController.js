import { savePhoto, getPhotosPaginated } from "../models/photoModel.js";
import { saveImageLocally, deleteImageLocally } from "../utils/imageStorage.js";

export const uploadPhoto = async (req, res) => {
  try {
    const { title, location, took_at, categoryIds } = req.body;
    const parsedCategories = Array.isArray(categoryIds)
      ? categoryIds
      : categoryIds
        ? JSON.parse(categoryIds)
        : [];

    // Sauvegarder l'image localement avec un ID unique
    const imageInfo = await saveImageLocally(
      req.file.buffer,
      req.file.originalname,
      'photos'
    );

    const photo = await savePhoto({
      title,
      location,
      took_at,
      image_url: imageInfo.url,
      categoryIds: parsedCategories
    });

    res.status(201).json(photo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne: " + err.message });
  }
};

export const getPhotos = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const offset = parseInt(req.query.offset) || 0;

    // Log seulement si c'est différent de la pagination par défaut ou en mode debug
    if (process.env.NODE_ENV === 'development' && (limit !== 6 || offset !== 0)) {
      console.log("Pagination => limit:", limit, "offset:", offset);
    }

    const photos = await getPhotosPaginated(limit, offset);
    res.json(photos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors du chargement des photos" });
  }
};