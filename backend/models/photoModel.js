import pool from "../db.js";

export const savePhoto = async (title, description, filename) => {
  const res = await pool.query(
    "INSERT INTO photos (title, description, filename) VALUES ($1, $2, $3) RETURNING *",
    [title, description, filename]
  );
  return res.rows[0];
};

export const getAllPhotos = async () => {
  const res = await pool.query(
    "SELECT * FROM photos ORDER BY uploaded_at DESC"
  );
  return res.rows;
};
