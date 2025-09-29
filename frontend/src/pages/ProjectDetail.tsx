import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiLink,
} from "react-icons/fi";
import type { Project } from "../types/Project";
import stackColors from "../utils/stackColors";

type Image = {
  id: number;
  image_url: string;
  title?: string;
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Chargement des données
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`https://api.rubnk.com/projects/${id}`).then((res) => res.json()),
      fetch(`https://api.rubnk.com/projects/${id}/images`).then((res) =>
        res.json()
      ),
    ])
      .then(([projectData, imagesData]) => {
        setProject(projectData);
        setImages(imagesData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (project) {
      document.title = project.title + " | RubnK";
    }
  }, [project]);

  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      switch (e.key) {
        case "Escape":
          setSelectedImage(null);
          break;
        case "ArrowLeft":
          handleNavigation("prev");
          break;
        case "ArrowRight":
          handleNavigation("next");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex, images]);

  // Navigation dans la lightbox
  const handleNavigation = useCallback(
    (direction: "prev" | "next") => {
      let newIndex;
      if (direction === "prev") {
        newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      } else {
        newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      }
      setCurrentIndex(newIndex);
      setSelectedImage(images[newIndex]);
    },
    [currentIndex, images]
  );

  // Gestion du swipe
  const handleSwipe = useCallback(
    (swipeDirection: "left" | "right") => {
      if (swipeDirection === "left") {
        handleNavigation("next");
      } else {
        handleNavigation("prev");
      }
    },
    [handleNavigation]
  );

  // Ouverture de la lightbox
  const openLightbox = (img: Image, index: number) => {
    setSelectedImage(img);
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!project)
    return <div className="pt-20 px-6 text-gray-300">Projet non trouvé</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24 px-6 max-w-6xl mx-auto min-h-screen bg-gray-900 text-gray-100"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 pb-2"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight">
          {project.title}
        </h1>
        <p className="text-lg text-gray-300 mt-4 max-w-3xl">
          {project.description}
        </p>
      </motion.div>

      {/* Détails du projet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          {/* Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              Technologies
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 text-sm"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stackColors[tech] || "#9CA3AF" }}
                  />
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Liens et métadonnées */}
        <div>
          {(project.repo || project.link) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
                Liens
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-cyan-400"
                  >
                    <FiGithub className="text-lg" />
                    Voir sur GitHub
                    <FiExternalLink className="ml-1 text-sm" />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white"
                  >
                    <FiLink className="text-lg" />
                    Démonstration
                    <FiExternalLink className="ml-1 text-sm" />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Galerie d'images */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-cyan-400">Galerie</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-xl shadow-xl cursor-pointer"
              onClick={() => openLightbox(img, index)}
            >
              <img
                src={`${img.image_url}`}
                alt={img.title || project.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {img.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-sm font-medium text-white">{img.title}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Fermer"
            >
              <FiX />
            </button>

            <button
              className="absolute left-4 text-white text-3xl p-2 z-50"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation("prev");
              }}
              aria-label="Image précédente"
            >
              <FiChevronLeft size={32} />
            </button>

            <motion.div
              className="relative w-full h-full max-w-6xl max-h-[90vh] mb-8"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 50) {
                  handleSwipe("right");
                } else if (info.offset.x < -50) {
                  handleSwipe("left");
                }
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={`${selectedImage.image_url}`}
                alt={selectedImage.title || project.title}
                className="w-full h-full object-contain pb-4 rounded-xl shadow-lg"
              />
              {selectedImage.title && (
                <p className="text-white text-center mt-4 text-lg">
                  {selectedImage.title}
                </p>
              )}
            </motion.div>

            <button
              className="absolute right-4 text-white text-3xl p-2 z-50"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation("next");
              }}
              aria-label="Image suivante"
            >
              <FiChevronRight size={32} />
            </button>

            {/* Indicateurs */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentIndex === index ? "bg-cyan-400" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
