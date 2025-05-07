import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Créer les dossiers s’ils n'existent pas
const uploadDirs = ["uploads", "uploads/photos", "uploads/projects"];

uploadDirs.forEach((dir) => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Dossier créé : ${fullPath}`);
  }
});

import "./db.js";
import projectRoutes from "./routes/projects.js";
import contactRoutes from "./routes/contact.js";
import photoRoutes from "./routes/photos.js";
import projectImageRoutes from "./routes/projectImages.js";
import categoryRoutes from "./routes/categories.js";
import adminRoutes from "./routes/admin.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/api/projects", projectImageRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin", adminRoutes);

// Servir les fichiers statiques d'images
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Route par défaut
app.get("/api", (req, res) => {
  res.send("API opérationnelle");
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
}

export default app;