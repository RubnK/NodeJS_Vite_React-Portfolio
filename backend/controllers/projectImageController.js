import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { saveProjectImage } from "../models/projectImageModel.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export const uploadProjectImages = async (req, res) => {
  try {
    const { projectId } = req.body;

    const stream = cloudinary.uploader.upload_stream(
      { folder: "projects" },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Erreur Cloudinary" });
        }

        const image = await saveProjectImage({
          projectId,
          imageUrl: result.secure_url
        });

        res.status(201).json(image);
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne" });
  }
};

export const getProjectImages = async (req, res) => {
  const { id } = req.params;
  try {
    const images = await getAllProjectImages(id);
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne" });
  }
};

export default uploadProjectImages;