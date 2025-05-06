import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Project } from "../types/Project";
import stackColors from "../utils/stackColors";

type Image = {
  id: number;
  filename: string;
  title?: string;
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/projects/${id}`)
      .then((res) => res.json())
      .then(setProject)
      .catch(console.error);

    fetch(`http://localhost:3001/projects/${id}/images`)
      .then((res) => res.json())
      .then(setImages)
      .catch(console.error);
  }, [id]);

  if (!project) return <div className="pt-20 px-6">Chargement...</div>;

  return (
    <div className="pt-30 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">{project.title}</h1>
      <p className="text-gray-700 mb-6">{project.description}</p>

      <div className="flex flex-wrap gap-3 mb-6">
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

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-8 text-blue-600 hover:underline text-sm"
        >
          Voir le projet en ligne
        </a>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id}>
            <img
              src={`http://localhost:3001/uploads/projects/${img.filename}`}
              alt={img.title || project.title}
              className="w-full h-48 object-cover rounded shadow"
            />
            {img.title && (
              <p className="text-sm text-center mt-2 text-gray-700">
                {img.title}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
