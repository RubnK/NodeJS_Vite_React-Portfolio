import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Project } from "../types/Project";
import stackColors from "../utils/stackColors";

type ProjectWithImage = Project & { preview?: string };

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Projects() {
  const [projects, setProjects] = useState<ProjectWithImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3001/projects")
      .then((res) => res.json())
      .then(async (data: Project[]) => {
        const projectsWithImages = await Promise.all(
          data.map(async (project) => {
            try {
              const res = await fetch(
                `http://localhost:3001/projects/${project.id}/images`
              );
              const images = await res.json();
              const preview = images.length
                ? `http://localhost:3001/uploads/projects/${images[0].filename}`
                : undefined;
              return { ...project, preview };
            } catch {
              return { ...project };
            }
          })
        );
        setProjects(projectsWithImages);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="pt-30 px-6 max-w-6xl mx-auto min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="pt-32 px-6 max-w-7xl mx-auto min-h-screen"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-1"
      >
        Mes Projets
      </motion.h1>

      <motion.div
        variants={containerVariants}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to={`/projets/${project.id}`}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 block overflow-hidden border border-gray-100"
            >
              {project.preview && (
                <div className="relative w-full pb-[56.25%] overflow-hidden rounded-t-xl">
                  <img
                    src={project.preview}
                    alt={project.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  {project.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700"
                    >
                      <span
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: stackColors[tech] || "#ccc" }}
                      />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
