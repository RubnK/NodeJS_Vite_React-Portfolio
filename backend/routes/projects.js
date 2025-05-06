import express from "express";
import {
  getProjects,
  getProject,
  addProject,
  editProject,
  removeProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", addProject);
router.put("/:id", editProject);
router.delete("/:id", removeProject);

export default router;
