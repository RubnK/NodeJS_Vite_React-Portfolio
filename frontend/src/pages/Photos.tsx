import { useEffect, useState } from "react";

type Photo = {
  id: number;
  title: string;
  filename: string;
  location?: string;
  took_at?: string;
  categories: string[]; // vient du JOIN avec JSON_AGG
};

export default function Photos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/photos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Photos reçues :", data);
        setPhotos(data);
      })
      .catch((err) => {
        console.error("Erreur API /photos :", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-30 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Mes photos</h1>

      {loading && <p>Chargement...</p>}

      {!loading && photos.length === 0 && (
        <p className="text-gray-500">Aucune photo trouvée.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded shadow overflow-hidden"
          >
            <div className="relative w-full pb-[66.66%]">
              <img
                src={`http://localhost:3001/uploads/photos/${photo.filename}`}
                alt={photo.title}
                className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              />
            </div>

            <div className="p-4">
              <h2 className="font-semibold text-lg">{photo.title}</h2>

              {photo.categories?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {photo.categories.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-3 text-xs text-gray-500 space-y-1">
                {photo.took_at && (
                  <p>
                    📅 {new Date(photo.took_at).toLocaleDateString("fr-FR")}
                  </p>
                )}
                {photo.location && <p>📍 {photo.location}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl w-full px-4">
            <img
              src={`http://localhost:3001/uploads/photos/${selectedPhoto.filename}`}
              alt={selectedPhoto.title}
              className="w-full h-auto rounded shadow-lg"
            />
            <div className="text-white mt-4 text-center">
              <h2 className="text-xl font-semibold">{selectedPhoto.title}</h2>
              {selectedPhoto.location && (
                <p className="text-sm mt-1">📍 {selectedPhoto.location}</p>
              )}
              {selectedPhoto.took_at && (
                <p className="text-sm">📅 {new Date(selectedPhoto.took_at).toLocaleDateString('fr-FR')}</p>
              )}
              {selectedPhoto.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {selectedPhoto.categories.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-white/20 text-white text-xs px-2 py-1 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
