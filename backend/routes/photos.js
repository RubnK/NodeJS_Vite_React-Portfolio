import express from "express";
import upload from "../middleware/uploadPhotos.js";
import {
  uploadPhoto,
  getPhotos,
  servePhoto,
} from "../controllers/photoController.js";

const router = express.Router();

router.post("/", upload.single("image"), uploadPhoto);
router.get("/", getPhotos);
router.get("/image/:filename", servePhoto);

export default router;
