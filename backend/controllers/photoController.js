import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { savePhoto, getAllPhotos } from "../models/photoModel.js";
import e from "express";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export const uploadPhoto = async (req, res) => {
  try {
    const { title, location, took_at, categoryIds } = req.body;
    const parsedCategories = Array.isArray(categoryIds)
      ? categoryIds
      : categoryIds
        ? JSON.parse(categoryIds)
        : [];

    const stream = cloudinary.uploader.upload_stream(
      { folder: "photos" },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Erreur d'upload Cloudinary", error });
        }

        const photo = await savePhoto({
          title,
          location,
          took_at,
          filename: result.secure_url,
          categoryIds: parsedCategories
        });

        res.status(201).json(photo);
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne" });
  }
};

export const getPhotos = async (req, res) => {
  const photos = await getAllPhotos();
  res.json(photos);
};
