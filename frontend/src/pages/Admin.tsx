import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Types
interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  sent_at: string;
}

interface Category {
  id: number;
  name: string;
}

export default function AdminPanel() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("messages");
  const [notification, setNotification] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (authenticated) {
      fetchContacts();
      fetchCategories();
    }
  }, [authenticated]);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Erreur API contacts:", err);
      setNotification("Erreur lors du chargement des messages");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Erreur API categories:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setAuthenticated(true);
    } else {
      setNotification("Mot de passe incorrect");
    }
  };

  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Projet ajouté avec succès");
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Photo ajoutée avec succès");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Admin Panel
          </h1>
          {notification && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {notification}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Se connecter
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="bg-gray-800 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          </div>

          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("messages")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "messages"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Messages
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "projects"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Projets
              </button>
              <button
                onClick={() => setActiveTab("photos")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "photos"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Photos
              </button>
            </nav>
          </div>

          {notification && (
            <div className="p-4 bg-green-100 text-green-700 border-l-4 border-green-500">
              {notification}
            </div>
          )}

          <div className="p-6">
            {activeTab === "messages" && (
              <section>
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Messages reçus
                </h2>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : contacts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Aucun message trouvé.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <motion.div
                        key={contact.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-lg">
                              {contact.name}
                            </p>
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-blue-600 hover:underline"
                            >
                              {contact.email}
                            </a>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(contact.sent_at).toLocaleString("fr-FR")}
                          </span>
                        </div>
                        <p className="mt-3 text-gray-700 whitespace-pre-line">
                          {contact.message}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === "projects" && (
              <section>
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Ajouter un projet
                </h2>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Titre"
                    className="w-full border px-4 py-2 rounded"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    className="w-full border px-4 py-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Technos (React, Node...)"
                    className="w-full border px-4 py-2 rounded"
                    required
                  />
                  <input
                    type="url"
                    placeholder="Lien (optionnel)"
                    className="w-full border px-4 py-2 rounded"
                  />
                  <input
                    type="file"
                    multiple
                    className="w-full border px-4 py-2 rounded"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Ajouter
                  </button>
                </form>
              </section>
            )}

            {activeTab === "photos" && (
              <section>
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Ajouter une photo
                </h2>
                <form onSubmit={handleAddPhoto} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Titre"
                    className="w-full border px-4 py-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Lieu (optionnel)"
                    className="w-full border px-4 py-2 rounded"
                  />
                  <input
                    type="date"
                    className="w-full border px-4 py-2 rounded"
                  />
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={cat.id}
                          checked={selectedCategories.includes(cat.id)}
                          onChange={() => handleCategoryChange(cat.id)}
                        />
                        {cat.name}
                      </label>
                    ))}
                  </div>
                  <input
                    type="file"
                    className="w-full border px-4 py-2 rounded"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Ajouter
                  </button>
                </form>
              </section>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
