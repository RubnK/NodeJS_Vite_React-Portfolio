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
    // Log seulement en mode debug et si pagination non-standard
    if (process.env.NODE_ENV === 'development' && (limit !== 6 || offset !== 0)) {
      console.log("Projects pagination => limit:", limit, "offset:", offset);
    }

    const data = await getAllProjects(limit, offset);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur récupération projets" });
  }
};

export const getProject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Validation de l'ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const data = await getProjectById(id);
    data ? res.json(data) : res.status(404).json({ error: "Projet non trouvé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur récupération projet" });
  }
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
  try {
    const id = parseInt(req.params.id);
    
    // Validation de l'ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const { title, description, link, stack } = req.body;
    const data = await updateProject(
      id,
      title,
      description,
      link,
      stack || []
    );
    
    if (!data) {
      return res.status(404).json({ error: "Projet non trouvé" });
    }
    
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur mise à jour projet" });
  }
};

export const removeProject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Validation de l'ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const data = await deleteProject(id);
    
    if (!data) {
      return res.status(404).json({ error: "Projet non trouvé" });
    }
    
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur suppression projet" });
  }
};
