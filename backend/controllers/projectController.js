import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../models/projectModel.js";

export const getProjects = async (req, res) => {
  const data = await getAllProjects();
  res.json(data);
};

export const getProject = async (req, res) => {
  const data = await getProjectById(req.params.id);
  data ? res.json(data) : res.status(404).json({ error: "Projet non trouvé" });
};

export const addProject = async (req, res) => {
  const { title, description, link, stack } = req.body;
  if (!title) return res.status(400).json({ error: "Titre obligatoire" });
  const data = await createProject(title, description, link, stack || []);
  res.status(201).json(data);
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
