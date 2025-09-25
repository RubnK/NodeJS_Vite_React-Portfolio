import pool from "../db.js";

export const saveProjectImage = async (projectId, imageUrl) => {
  const res = await pool.query(
    "INSERT INTO project_images (project_id, image_url) VALUES ($1, $2) RETURNING *",
    [projectId, imageUrl]
  );
  return res.rows[0];
};

export const getImagesByProjectId = async (projectId) => {
  const res = await pool.query(
    "SELECT * FROM project_images WHERE project_id = $1 ORDER BY id ASC",
    [projectId]
  );
  return res.rows;
};
