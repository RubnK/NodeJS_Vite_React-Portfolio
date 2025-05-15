import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Photo = {
  id: number;
  title: string;
  filename: string;
  location?: string;
  took_at?: string;
  categories: string[];
};

export default function Photos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pageRef = useRef(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const isFetchingRef = useRef(false);

  const fetchPhotos = async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const res = await fetch(
        `https://api.rubnk.com/photos?limit=${limit}&offset=${
          pageRef.current * limit
        }`
      );
      const data = await res.json();
      if (data.length < limit) setHasMore(false);
      setPhotos((prev) => [...prev, ...data]);
      pageRef.current += 1;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
    await new Promise((res) => setTimeout(res, 300));
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingRef.current) {
          setLoading(true);
          fetchPhotos();
        }
      },
      { threshold: 1 }
    );

    const currentRef = loaderRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loaderRef, hasMore, loading]);

  const openLightbox = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const navigatePhotos = (direction: "prev" | "next") => {
    if (!selectedPhoto) return;

    let newIndex;
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    }

    setSelectedPhoto(photos[newIndex]);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;

      switch (e.key) {
        case "Escape":
          setSelectedPhoto(null);
          break;
        case "ArrowLeft":
          navigatePhotos("prev");
          break;
        case "ArrowRight":
          navigatePhotos("next");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, currentIndex]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Mes Photos
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
      </motion.div>

      {photos.length === 0 && !loading && (
        <p className="text-center text-gray-400">Aucune photo trouvée.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <div
              className="bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 overflow-hidden hover:border-cyan-400 transition-all cursor-pointer"
              onClick={() => openLightbox(photo, index)}
            >
              <div className="relative w-full pb-[66.666%] transition-transform duration-500 group-hover:scale-105">
                <img
                  src={photo.filename}
                  alt={photo.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-4">
                <h2 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {photo.title}
                </h2>

                {photo.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {photo.categories.map((cat, i) => (
                      <span
                        key={i}
                        className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-3 text-xs text-gray-400 space-y-1">
                  {photo.took_at && (
                    <p>
                      📅 {new Date(photo.took_at).toLocaleDateString("fr-FR")}
                    </p>
                  )}
                  {photo.location && <p>📍 {photo.location}</p>}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Loader / Fin de scroll */}
      <div ref={loaderRef} className="text-center py-10">
        {hasMore ? (
          <div className="text-gray-400">Chargement en cours...</div>
        ) : (
          <div className="text-gray-500">Toutes les photos sont chargées.</div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
              aria-label="Fermer"
            >
              <FiX />
            </button>

            <button
              className="absolute left-4 text-white text-3xl p-2 z-50"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhotos("prev");
              }}
              aria-label="Photo précédente"
            >
              <FiChevronLeft size={32} />
            </button>

            <motion.div
              className="relative w-full max-w-6xl mx-auto"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ maxHeight: "80vh" }}>
                <img
                  src={selectedPhoto.filename}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>

              <div className="text-white mt-4 text-center max-h-[20vh] overflow-y-auto px-4">
                <h2 className="text-xl font-semibold">{selectedPhoto.title}</h2>
                <div className="space-y-1 mt-2">
                  {selectedPhoto.location && (
                    <p className="text-sm">📍 {selectedPhoto.location}</p>
                  )}
                  {selectedPhoto.took_at && (
                    <p className="text-sm">
                      📅{" "}
                      {new Date(selectedPhoto.took_at).toLocaleDateString(
                        "fr-FR"
                      )}
                    </p>
                  )}
                </div>
                {selectedPhoto.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mt-3 pb-2">
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
            </motion.div>

            <button
              className="absolute right-4 text-white text-3xl p-2 z-50"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhotos("next");
              }}
              aria-label="Photo suivante"
            >
              <FiChevronRight size={32} />
            </button>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
              {photos.map((_, index) => (
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
