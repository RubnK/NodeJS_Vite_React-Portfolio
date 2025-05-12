import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../types/Project";
import stackColors from "../utils/stackColors";
import truncateWords from "../utils/truncateWords";

type ProjectWithImage = Project & { preview?: string };

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function Projects() {
  const [projects, setProjects] = useState<ProjectWithImage[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const pageRef = useRef(0);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  const fetchProjects = async () => {
    if (isFetchingRef.current || !hasMore) return;
    isFetchingRef.current = true;

    try {
      const res = await fetch(
        `https://api.rubnk.com/projects?limit=${limit}&offset=${
          pageRef.current * limit
        }`
      );
      const data: Project[] = await res.json();

      if (data.length < limit) setHasMore(false);

      const projectsWithImages: ProjectWithImage[] = await Promise.all(
        data.map(async (project) => {
          try {
            const res = await fetch(
              `https://api.rubnk.com/projects/${project.id}/images`
            );
            const images = await res.json();
            const preview = images.length ? images[0].filename : undefined;
            return { ...project, preview };
          } catch {
            return { ...project };
          }
        })
      );

      setProjects((prev) => [...prev, ...projectsWithImages]);
      pageRef.current += 1;
    } catch (err) {
      console.error(err);
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    document.title = "Projets | RubnK";
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current) {
          fetchProjects();
        }
      },
      { threshold: 1 }
    );

    const currentRef = loaderRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-[1.3]">
          Mes Projets
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400 },
              }}
              className="group"
            >
              <Link to={`/projets/${project.id}`} className="block h-full">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden border border-gray-100 group-hover:border-blue-200">
                  {project.preview && (
                    <div className="relative w-full pb-[56.25%] overflow-hidden rounded-t-2xl">
                      <motion.img
                        src={project.preview}
                        alt={project.title}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        initial={{ opacity: 0.9 }}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.5 },
                        }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-gray-600 mb-4 flex-1">
                      {truncateWords(project.description, 20)}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {Array.isArray(project.stack) &&
                        project.stack.map((tech, i) => {
                          const color = stackColors[tech] || "#9CA3AF";
                          return (
                            <motion.span
                              key={i}
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200"
                              style={{ borderColor: color }}
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                              {tech}
                            </motion.span>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div ref={loaderRef} className="text-center py-10">
        {hasMore ? (
          <div className="text-gray-400">Chargement en cours...</div>
        ) : (
          <div className="text-gray-500">Tous les projets sont affichés.</div>
        )}
      </div>
    </motion.div>
  );
}
