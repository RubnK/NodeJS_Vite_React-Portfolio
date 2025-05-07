import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "photos",
    allowed_formats: ["jpg", "png", "webp"]
  }
});

const uploadPhotos = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

export default uploadPhotos;
