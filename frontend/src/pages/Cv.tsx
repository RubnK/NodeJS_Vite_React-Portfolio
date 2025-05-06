import { cv } from "../utils/cv";

export default function Cv() {
  return (
    <div className="pt-30 px-6 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <section>
        <h1 className="text-4xl font-bold text-blue-700">{cv.name}</h1>
        <p className="text-lg text-gray-700 mt-2">{cv.title}</p>
        <p className="text-sm text-gray-500 italic mt-1">{cv.objective}</p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact</h2>
        <ul className="text-gray-700 space-y-1">
          <li>
            <strong>Email :</strong> <a href={`mailto:${cv.contact.email}`}>{cv.contact.email}</a>
          </li>
          <li>
            <strong>Tél :</strong> {cv.contact.phone}
          </li>
          <li>
            <strong>Ville :</strong> {cv.contact.city}
          </li>
          <li>
            <strong>LinkedIn :</strong> {cv.contact.linkedin}
          </li>
          <li>
            <strong>GitHub :</strong> {cv.contact.github}
          </li>
        </ul>
      </section>

      {/* Compétences */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Compétences</h2>
        {Object.entries(cv.skills).map(([key, list]) => (
          <div key={key} className="mb-2">
            <p className="font-medium capitalize">{key.replace(/_/g, " ")}</p>
            <p className="text-gray-700 text-sm">{list.join(", ")}</p>
          </div>
        ))}
      </section>

      {/* Expériences */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Expériences</h2>
        {cv.experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <p className="font-semibold text-blue-600">
              {exp.title} - {exp.company} ({exp.period})
            </p>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              {exp.details.map((d, j) => (
                <li key={j}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Formation */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Formation</h2>
        {cv.education.map((edu, i) => (
          <div key={i} className="mb-4">
            <p className="font-semibold text-blue-600">
              {edu.title} - {edu.school} ({edu.years})
            </p>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              {edu.details.map((d, j) => (
                <li key={j}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Certifications</h2>
        {cv.certifications.map((cert, i) => (
          <div key={i} className="mb-3">
            <p className="font-semibold text-blue-600">{cert.title}</p>
            <p className="text-sm text-gray-700">
              {cert.issuer} - {cert.issued}
              {cert.id && ` · ID : ${cert.id}`}
            </p>
            {cert.skills && cert.skills.length > 0 && (
              <p className="text-sm text-gray-600">Compétences : {cert.skills.join(", ")}</p>
            )}
          </div>
        ))}
      </section>

      {/* Intérêts */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Centres d'intérêt</h2>
        <ul className="list-disc ml-5 text-sm text-gray-700">
          {cv.interests.map((interest, i) => (
            <li key={i}>{interest}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
