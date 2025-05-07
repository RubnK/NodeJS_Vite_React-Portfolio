import pool from "../db.js";

export const getAllCategories = async () => {
  const res = await pool.query("SELECT id, name FROM photo_categories ORDER BY name");
  return res.rows;
};
