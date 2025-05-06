import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiUser, FiCode, FiCamera, FiMail, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'CV', path: '/cv', icon: <FiUser className="mr-2" /> },
    { name: 'Projets', path: '/projets', icon: <FiCode className="mr-2" /> },
    { name: 'Photos', path: '/photos', icon: <FiCamera className="mr-2" /> },
    { name: 'Contact', path: '/contact', icon: <FiMail className="mr-2" /> },
  ];

  return (
    <header className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo avec dégradé et animation inversée */}
          <motion.div
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <NavLink 
              to="/" 
              className="text-xl font-bold flex items-center"
            >
              <motion.span
                initial={{ backgroundImage: 'linear-gradient(to right, #3B82F6, #EC4899)' }}
                whileHover={{
                  backgroundImage: 'linear-gradient(to right, #EC4899, #3B82F6)',
                  scale: 1.1
                }}
                transition={{ duration: 0.4 }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500"
              >
                Ruben
              </motion.span>
            </NavLink>
          </motion.div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center text-sm font-medium px-3 py-2 rounded-md transition-colors
                    ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'}`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Bouton menu mobile */}
          <motion.button
            className="md:hidden p-2 -mr-2 rounded-md focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6 text-gray-600" />
            ) : (
              <FiMenu className="h-6 w-6 text-gray-600" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Menu mobile animé */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center px-3 py-3 text-base font-medium rounded-md mx-2
                    ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-500'}`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;