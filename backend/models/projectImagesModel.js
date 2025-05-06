import pool from "../db.js";

export const saveProjectImage = async (projectId, filename) => {
  const res = await pool.query(
    "INSERT INTO project_images (project_id, filename) VALUES ($1, $2) RETURNING *",
    [projectId, filename]
  );
  return res.rows[0];
};

export const getImagesByProjectId = async (projectId) => {
  const res = await pool.query(
    "SELECT * FROM project_images WHERE project_id = $1 ORDER BY uploaded_at DESC",
    [projectId]
  );
  return res.rows;
};
