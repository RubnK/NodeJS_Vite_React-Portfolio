import express from "express";
import {
  getProjects,
  getProject,
  addProject,
  editProject,
  removeProject,
} from "../controllers/projectController.js";
import upload from "../middleware/uploadProjectImages.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", upload.array("images"), addProject); 
router.put("/:id", editProject);
router.delete("/:id", removeProject);

export default router;
