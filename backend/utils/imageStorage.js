import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Créer les dossiers de stockage
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
const PHOTOS_DIR = path.join(UPLOADS_DIR, 'photos');
const PROJECTS_DIR = path.join(UPLOADS_DIR, 'projects');

// Fonction pour créer les dossiers s'ils n'existent pas
export const ensureDirectoryExists = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
};

// Fonction pour sauvegarder une image avec un ID unique
export const saveImageLocally = async (buffer, originalName, type = 'photos') => {
  try {
    // S'assurer que les dossiers existent
    await ensureDirectoryExists(UPLOADS_DIR);
    await ensureDirectoryExists(type === 'photos' ? PHOTOS_DIR : PROJECTS_DIR);

    // Générer un ID unique
    const uniqueId = uuidv4();
    
    // Extraire l'extension du fichier original
    const extension = path.extname(originalName).toLowerCase();
    
    // Créer le nom de fichier unique
    const filename = `${uniqueId}${extension}`;
    
    // Déterminer le chemin de sauvegarde
    const targetDir = type === 'photos' ? PHOTOS_DIR : PROJECTS_DIR;
    const filePath = path.join(targetDir, filename);
    
    // Sauvegarder le fichier
    await fs.writeFile(filePath, buffer);
    
    // Retourner les informations du fichier
    return {
      id: uniqueId,
      filename,
      originalName,
      path: filePath,
      relativePath: `uploads/${type}/${filename}`,
      url: `${process.env.API_BASE_URL || 'http://localhost:3001'}/images/${type}/${filename}`
    };
  } catch (error) {
    throw new Error(`Erreur lors de la sauvegarde de l'image: ${error.message}`);
  }
};

// Fonction pour supprimer une image à partir de son URL
export const deleteImageLocally = async (imageUrl) => {
  try {
    // Extraire le type et le filename de l'URL
    // Ex: https://api.rubnk.com/images/photos/uuid.jpg -> type: photos, filename: uuid.jpg
    const urlParts = imageUrl.split('/');
    const type = urlParts[urlParts.length - 2]; // 'photos' ou 'projects'
    const filename = urlParts[urlParts.length - 1]; // 'uuid.jpg'
    
    const targetDir = type === 'photos' ? PHOTOS_DIR : PROJECTS_DIR;
    const filePath = path.join(targetDir, filename);
    
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'image ${imageUrl}:`, error.message);
    return false;
  }
};

// Fonction pour obtenir le chemin complet d'une image
export const getImagePath = (filename, type = 'photos') => {
  const targetDir = type === 'photos' ? PHOTOS_DIR : PROJECTS_DIR;
  return path.join(targetDir, filename);
};

// Fonction pour vérifier si une image existe
export const imageExists = async (filename, type = 'photos') => {
  try {
    const filePath = getImagePath(filename, type);
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

// Fonction pour extraire le filename et type d'une URL
export const parseImageUrl = (imageUrl) => {
  const urlParts = imageUrl.split('/');
  const type = urlParts[urlParts.length - 2]; // 'photos' ou 'projects'
  const filename = urlParts[urlParts.length - 1]; // 'uuid.jpg'
  return { type, filename };
};