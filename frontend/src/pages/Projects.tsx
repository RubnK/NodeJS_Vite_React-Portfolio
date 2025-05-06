import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../types/Project";
import stackColors from "../utils/stackColors";

type ProjectWithImage = Project & { preview?: string };

export default function Projects() {
  const [projects, setProjects] = useState<ProjectWithImage[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/projects")
      .then((res) => res.json())
      .then(async (data: Project[]) => {
        // Récupérer la première image de chaque projet
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
      .catch(console.error);
  }, []);

  return (
    <div className="pt-30 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mes projets</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            to={`/projets/${project.id}`}
            key={project.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition block overflow-hidden"
          >
            {project.preview && (
              <div className="relative w-full pb-[56.25%] overflow-hidden rounded-t-xl">
                <img
                  src={project.preview}
                  alt={project.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2 text-blue-700">
                {project.title}
              </h2>
              <p className="text-gray-600 mb-3 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 text-sm text-gray-700"
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        stackColors[tech] || "bg-gray-300"
                      }`}
                    />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
