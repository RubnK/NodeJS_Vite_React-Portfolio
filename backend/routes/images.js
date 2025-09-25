import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getImagePath, imageExists } from '../utils/imageStorage.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route pour servir les images des photos
router.get('/photos/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    
    // Vérifier si l'image existe
    const exists = await imageExists(filename, 'photos');
    if (!exists) {
      return res.status(404).json({ error: 'Image non trouvée' });
    }
    
    // Obtenir le chemin complet de l'image
    const imagePath = getImagePath(filename, 'photos');
    
    // Servir l'image
    res.sendFile(imagePath);
  } catch (error) {
    console.error('Erreur lors du service de l\'image:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// Route pour servir les images des projets
router.get('/projects/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    
    // Vérifier si l'image existe
    const exists = await imageExists(filename, 'projects');
    if (!exists) {
      return res.status(404).json({ error: 'Image non trouvée' });
    }
    
    // Obtenir le chemin complet de l'image
    const imagePath = getImagePath(filename, 'projects');
    
    // Servir l'image
    res.sendFile(imagePath);
  } catch (error) {
    console.error('Erreur lors du service de l\'image:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

export default router;