import { motion } from "framer-motion";
import { cv } from "../utils/cv";
import stackColors from "../utils/stackColors";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiAward,
  FiBriefcase,
  FiBook,
  FiStar,
} from "react-icons/fi";

const Cv = () => {
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
      className="min-h-screen bg-gray-900 text-gray-100 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header avec animation spéciale */}
        <motion.section variants={item} className="mb-16 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {cv.name}
          </motion.h1>
          <motion.p
            className="text-xl text-cyan-200 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {cv.title}
          </motion.p>
          <motion.p
            className="max-w-2xl mx-auto text-blue-100 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {cv.objective}
          </motion.p>
        </motion.section>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Colonne gauche */}
          <div className="md:col-span-1 space-y-8">
            {/* Contact */}
            <motion.section
              variants={item}
              className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center text-cyan-400">
                <FiMapPin className="mr-2" /> Contact
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FiMail className="mr-3 text-blue-400" />
                  <a
                    href={`mailto:${cv.contact.email}`}
                    className="hover:text-cyan-400 transition"
                  >
                    {cv.contact.email}
                  </a>
                </li>
                <li className="flex items-center">
                  <FiPhone className="mr-3 text-blue-400" />
                  {cv.contact.phone}
                </li>
                <li className="flex items-center">
                  <FiLinkedin className="mr-3 text-blue-400" />
                  <a
                    href={cv.contact.linkedin}
                    target="_blank"
                    rel="noopener"
                    className="hover:text-cyan-400 transition"
                  >
                    {cv.contact.linkedin.split("/").pop()}
                  </a>
                </li>
                <li className="flex items-center">
                  <FiGithub className="mr-3 text-blue-400" />
                  <a
                    href={cv.contact.github}
                    target="_blank"
                    rel="noopener"
                    className="hover:text-cyan-400 transition"
                  >
                    {cv.contact.github.split("/").pop()}
                  </a>
                </li>
              </ul>
            </motion.section>

            {/* Compétences */}
            <motion.section
              variants={item}
              className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center text-cyan-400">
                <FiStar className="mr-2" /> Compétences
              </h2>
              {Object.entries(cv.skills).map(([key, list]) => (
                <div key={key} className="mb-4">
                  <p className="font-medium text-blue-300 capitalize mb-2">
                    {key.replace(/_/g, " ")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {list.map((skill, i) => {
                      const colorClass = stackColors[skill] || "bg-gray-400";
                      return (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center px-3 py-1 rounded-full bg-gray-800 text-sm"
                        >
                          <span
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: colorClass }}
                          />
                          <span>{skill}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.section>

            {/* Intérêts */}
            <motion.section
              variants={item}
              className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center text-cyan-400">
                <FiStar className="mr-2" /> Centres d'intérêt
              </h2>
              <ul className="space-y-2">
                {cv.interests.map((interest, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2"></span>
                    {interest}
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* Colonne droite */}
          <div className="md:col-span-2 space-y-8">
            {/* Expériences */}
            <motion.section variants={item}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center text-cyan-400">
                <FiBriefcase className="mr-2" /> Expériences
              </h2>
              <div className="space-y-8">
                {cv.experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border-l-4 border-cyan-400"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {exp.title}
                        </h3>
                        <p className="text-blue-300">{exp.company}</p>
                      </div>
                      <span className="text-sm bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {exp.details.map((d, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * j }}
                          className="flex items-start"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 mr-2 flex-shrink-0"></span>
                          <span>{d}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Formation */}
            <motion.section variants={item}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center text-cyan-400">
                <FiBook className="mr-2" /> Formation
              </h2>
              <div className="space-y-6">
                {cv.education.map((edu, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border-l-4 border-blue-400"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {edu.title}
                        </h3>
                        <p className="text-blue-300">{edu.school}</p>
                      </div>
                      <span className="text-sm bg-blue-400/10 text-blue-400 px-3 py-1 rounded-full">
                        {edu.years}
                      </span>
                    </div>
                    {edu.details && edu.details.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {edu.details.map((d, j) => (
                          <motion.li key={j} className="flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-2 flex-shrink-0"></span>
                            <span>{d}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Certifications */}
            <motion.section variants={item}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center text-cyan-400">
                <FiAward className="mr-2" /> Certifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cv.certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-gray-800/50 p-5 rounded-xl backdrop-blur-sm border border-gray-700"
                  >
                    <h3 className="font-semibold text-white">{cert.title}</h3>
                    <p className="text-sm text-blue-300 mt-1">{cert.issuer}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs bg-purple-400/10 text-purple-400 px-2 py-1 rounded">
                        {cert.issued}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cv;
