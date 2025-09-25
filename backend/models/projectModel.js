import pool from "../db.js";

export const getAllProjects = async (limit, offset) => {
  const res = await pool.query(
    "SELECT * FROM projects ORDER BY id DESC LIMIT $1 OFFSET $2",
    [limit, offset]
  );
  return res.rows;
};

export const getProjectById = async (id) => {
  const res = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
  return res.rows[0];
};

export const createProject = async (title, description, repo, link, stack) => {
  try {
    const res = await pool.query(
      "INSERT INTO projects (title, description, repo, link, stack) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, repo, link, stack]
    );
    return res.rows[0];
  } catch (error) {
    // Si erreur de clé dupliquée, on peut essayer avec un ID spécifique
    if (error.code === '23505') {
      // Récupérer le prochain ID disponible
      const maxIdRes = await pool.query("SELECT COALESCE(MAX(id), 0) + 1 as next_id FROM projects");
      const nextId = maxIdRes.rows[0].next_id;
      
      const res = await pool.query(
        "INSERT INTO projects (id, title, description, repo, link, stack) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [nextId, title, description, repo, link, stack]
      );
      return res.rows[0];
    }
    throw error;
  }
};

export const updateProject = async (id, title, description, repo, link, stack) => {
  const res = await pool.query(
    `UPDATE projects 
     SET title = $1, description = $2, repo = $3, link = $4, stack = $5, updated_at = CURRENT_TIMESTAMP
     WHERE id = $6 
     RETURNING *`,
    [title, description, repo, link, stack, id]
  );
  return res.rows[0];
};

export const deleteProject = async (id) => {
  const res = await pool.query(
    "DELETE FROM projects WHERE id = $1 RETURNING *",
    [id]
  );
  return res.rows[0];
};
