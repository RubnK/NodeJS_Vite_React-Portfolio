import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../models/projectModel.js";
import { saveProjectImage } from "../models/projectImageModel.js";
import { saveImageLocally, deleteImageLocally } from "../utils/imageStorage.js";

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
    const { title, description, stack, repo, link } = req.body;

    const imageInfos = [];

    // Sauvegarder chaque image localement avec un ID unique
    for (const file of req.files) {
      const imageInfo = await saveImageLocally(
        file.buffer,
        file.originalname,
        'projects'
      );
      imageInfos.push(imageInfo);
    }

    const parsedStack =
      typeof stack === "string" ? stack.split(",").map((s) => s.trim()) : stack;

    const project = await createProject(title, description, repo, link, parsedStack);

    // Sauvegarder les informations des images dans la base de données
    for (const imageInfo of imageInfos) {
      await saveProjectImage(project.id, imageInfo.url);
    }

    res.status(201).json({
      ...project,
      images: imageInfos.map(img => ({ url: img.url }))
    });
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

    const { title, description, repo, link, stack } = req.body;
    const data = await updateProject(
      id,
      title,
      description,
      repo,
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
