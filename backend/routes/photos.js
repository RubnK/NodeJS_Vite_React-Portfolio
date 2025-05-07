import express from "express";
import upload from "../middleware/uploadPhotos.js"; // ← celui que tu as bien défini
import { uploadPhoto, getPhotos } from "../controllers/photoController.js";

const router = express.Router();

router.post("/", upload.single("image"), uploadPhoto);
router.get("/", getPhotos);

export default router;
