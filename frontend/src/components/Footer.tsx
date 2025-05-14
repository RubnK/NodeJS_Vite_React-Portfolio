import { motion } from "framer-motion";
import { FiGithub, FiInstagram, FiTwitch, FiYoutube, FiMail } from "react-icons/fi";
import { FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';

export default function Footer() {
  const socialLinks = [
    { icon: <FiGithub />, url: "https://github.com/rubnk" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com/in/ruben-k1" },
    { icon: <FiInstagram />, url: "https://instagram.com/rubnk" },
    { icon: <FiTwitch />, url: "https://twitch.tv/rubnk" },
    { icon: <FaXTwitter />, url: "https://x.com/RubnK00" },
    { icon: <FiYoutube />, url: "https://youtube.com/@RubnK_" },
    { icon: <FiMail />, url: "mailto:contact@rubnk.com" }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 mt-24 border-t border-gray-800">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8"
      >
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} RubnK. Tous droits réservés.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Développeur Web Fullstack, Logiciel & Photographe
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xl">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              whileHover={{ 
                y: -3,
                scale: 1.1,
                color: "#22d3ee" // cyan-400
              }}
              transition={{ type: "spring", stiffness: 400 }}
              aria-label={`Lien ${link.icon.type.name}`}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}