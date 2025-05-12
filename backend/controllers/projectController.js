import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../models/projectModel.js";
import { saveProjectImage } from "../models/projectImageModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const getProjects = async (req, res) => {
  const limit = parseInt(req.query.limit) || 6;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const data = await getAllProjects(limit, offset);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur récupération projets" });
  }
};

export const getProject = async (req, res) => {
  const data = await getProjectById(req.params.id);
  data ? res.json(data) : res.status(404).json({ error: "Projet non trouvé" });
};

export const addProject = async (req, res) => {
  try {
    const { title, description, stack, link } = req.body;

    const imageUrls = [];

    for (const file of req.files) {
      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "projects" },
            (err, result) => {
              if (err) return reject(err);
              resolve(result.secure_url);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(stream);
        });

      const imageUrl = await streamUpload();
      imageUrls.push(imageUrl);
    }

    const parsedStack =
      typeof stack === "string" ? stack.split(",").map((s) => s.trim()) : stack;

    const project = await createProject(title, description, link, parsedStack);

    for (const url of imageUrls) {
      await saveProjectImage(project.id, url);
    }

    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur ajout projet : " + err.message });
  }
};

export const editProject = async (req, res) => {
  const { title, description, link, stack } = req.body;
  const data = await updateProject(
    req.params.id,
    title,
    description,
    link,
    stack || []
  );
  res.json(data);
};

export const removeProject = async (req, res) => {
  const data = await deleteProject(req.params.id);
  res.json(data);
};
