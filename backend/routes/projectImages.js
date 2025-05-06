import express from "express";
import uploadProjectImagesMiddleware from "../middleware/uploadProjectImages.js";
import {
  uploadProjectImages,
  getProjectImages,
} from "../controllers/projectImageController.js";

const router = express.Router();

router.post(
  "/:id/images",
  uploadProjectImagesMiddleware.array("images", 10),
  uploadProjectImages
);
router.get("/:id/images", getProjectImages);

export default router;
