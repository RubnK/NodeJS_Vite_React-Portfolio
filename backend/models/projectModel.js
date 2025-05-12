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

export const createProject = async (title, description, link, stack) => {
  const res = await pool.query(
    "INSERT INTO projects (title, description, link, stack) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, description, link, stack]
  );
  return res.rows[0];
};

export const updateProject = async (id, title, description, link, stack) => {
  const res = await pool.query(
    `UPDATE projects 
     SET title = $1, description = $2, link = $3, stack = $4, updated_at = CURRENT_TIMESTAMP
     WHERE id = $5 
     RETURNING *`,
    [title, description, link, stack, id]
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
