import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { useEffect } from 'react';

export default function Error404() {
  useEffect(() => {
      document.title = "Error 404 | RubnK";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-6"
    >
      {/* Titre style CV */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
      </motion.div>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl md:text-2xl text-gray-300 text-center max-w-2xl mb-8"
      >
        Oups ! La page que vous cherchez semble introuvable.
      </motion.p>

      {/* Illustration animée */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        className="mb-12"
      >
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse" />
          <div className="absolute inset-4 rounded-full border-4 border-dashed border-cyan-400/30 animate-[spin_60s_infinite]" />
          <div className="absolute inset-8 rounded-full bg-gray-800/50 backdrop-blur-sm flex items-center justify-center">
            <span className="text-4xl md:text-6xl font-bold text-cyan-400">?</span>
          </div>
        </div>
      </motion.div>

      {/* Bouton de retour */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          to="/"
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2"
        >
          <FiArrowLeft />
          <span>Retour à l'accueil</span>
        </Link>
      </motion.div>

      {/* Effets décoratifs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-blue-500 filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1.2 }}
        className="absolute top-10 right-10 w-40 h-40 rounded-full bg-cyan-500 filter blur-3xl"
      />
    </motion.div>
  );
}