import { motion } from "framer-motion";
import { FiGithub, FiInstagram, FiTwitch, FiYoutube, FiArrowRight } from "react-icons/fi";
import { FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import { useEffect } from "react";

const links = [
  { name: "GitHub", icon: <FiGithub />, url: "https://github.com/rubnk", color: "from-gray-800 to-gray-900" },
  { name: "LinkedIn", icon: <FaLinkedinIn />, url: "https://linkedin.com/in/ruben-k1", color: "from-blue-700 to-blue-800" },
  { name: "Instagram", icon: <FiInstagram />, url: "https://instagram.com/rubnk", color: "from-pink-600 to-purple-600" },
  { name: "Twitch", icon: <FiTwitch />, url: "https://twitch.tv/rubnk", color: "from-purple-600 to-violet-800" },
  { name: "X (Twitter)", icon: <FaXTwitter />, url: "https://x.com/RubnK00", color: "from-gray-800 to-gray-700" },
  { name: "YouTube", icon: <FiYoutube />, url: "https://youtube.com/@RubnK_", color: "from-red-600 to-red-700" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  }
};

export default function Links() {
  useEffect(() => {
    document.title = "Liens | RubnK";
  }, []);
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          RubnK
        </h1>
        <p className="text-sm text-gray-400">Développeur Web & Logiciel</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-md space-y-4"
      >
        {links.map((link) => (
          <motion.a
            key={link.name}
            variants={item}
            whileHover={{ 
              y: -3,
              scale: 1.02,
              transition: { type: "spring", stiffness: 500 }
            }}
            whileTap={{ scale: 0.98 }}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block group relative overflow-hidden rounded-xl bg-gradient-to-r ${link.color} p-0.5 shadow-lg`}
          >
            <div className="bg-gray-900 rounded-lg p-4 flex items-center gap-4 transition-all duration-300 group-hover:bg-opacity-90">
              <span className="text-2xl text-white">{link.icon}</span>
              <span className="font-medium text-lg">{link.name}</span>
              <FiArrowRight className="ml-auto text-gray-400 group-hover:text-white transition-colors" />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}