import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function Home() {
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://api.rubnk.com/photos")
      .then((res) => res.json())
      .then((data) => {
        const thumbs = data
          .slice(0, 3)
          .map(
            (p: any) => `${p.filename}`
          );
        setThumbnails(thumbs);
      })
      .catch(console.error);
  }, []);

  // Variants pour les animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="pt-24 px-6 max-w-6xl mx-auto space-y-20 text-gray-100"
    >
      {/* Introduction */}
      <motion.section variants={item}>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-[1.3]">
          Bienvenue, je m'appelle Ruben
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl">
          Étudiant en développement web & logiciel à l'EFREI à la recherche
          d'une alternance.
        </p>
      </motion.section>

      {/* Call to action */}
      <motion.section variants={item} className="flex flex-wrap gap-6">
        <motion.div whileHover="hover">
          <Link
            to="/cv"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 hover:shadow-cyan-500/20 relative overflow-hidden"
          >
            <motion.span
              variants={{
                hover: { x: 5 },
              }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex items-center gap-2"
            >
              Voir mon CV <FiArrowRight />
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"
              variants={{
                hover: { opacity: 0.1 },
              }}
            />
          </Link>
        </motion.div>

        <motion.div whileHover="hover">
          <Link
            to="/projets"
            className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-gray-800/50 transition-all flex items-center gap-2 relative overflow-hidden"
          >
            <motion.span
              variants={{
                hover: { x: 5 },
              }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex items-center gap-2"
            >
              Découvrir mes projets <FiArrowRight />
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-cyan-400/10 opacity-0 hover:opacity-100 transition-opacity"
              variants={{
                hover: { opacity: 0.1 },
              }}
            />
          </Link>
        </motion.div>
      </motion.section>

      {/* Section à propos */}
      <motion.section
        variants={item}
        className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm"
      >
        <h2 className="text-3xl font-semibold mb-4 text-cyan-400">
          À propos de moi
        </h2>
        <div className="prose prose-invert max-w-none">
          <p>
            Je suis un développeur web et logiciel passionné, actuellement étudiant à
            l'EFREI. Je suis passionné par le développement, l'écriture et la photographie.
            Je suis à l'aise à l'oral et à l'écrit, ce qui me permet de m'adapter à
            différents environnements de travail. J'aime travailleur en équipe et je suis
            toujours prêt à acquérir de nouvelles compétences.
          </p>
          <p>
            Je m'investis dans des projets à fort impact, que ce soit dans le cadre de mes
            études ou en dehors. Je suis toujours à la recherche de nouvelles opportunités
            pour apprendre.
          </p>
        </div>
      </motion.section>

      {/* Section photos */}
      <motion.section variants={item}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-cyan-400">
            Quelques photos
          </h2>
          <Link
            to="/photos"
            className="flex items-center gap-1 text-cyan-400 hover:underline"
          >
            Voir la galerie <FiArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {thumbnails.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="relative w-full pb-[100%] rounded-xl shadow-lg overflow-hidden group border border-gray-700"
            >
              <img
                src={src}
                alt={`Aperçu photo ${i + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Section contact */}
      <motion.section
        variants={item}
        className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm"
      >
        <h2 className="text-3xl font-semibold mb-4 text-cyan-400">
          Envie de me contacter ?
        </h2>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl">
          Je suis ouvert à toutes les opportunités de collaboration et
          d'alternance. <br/>N'hésitez pas à me contacter !
        </p>
        <motion.div whileHover="hover">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
          >
            <motion.span
              variants={{
                hover: { x: 5 },
              }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex items-center gap-2"
            >
              Me contacter <FiArrowRight />
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"
              variants={{
                hover: { opacity: 0.1 },
              }}
            />
          </Link>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
