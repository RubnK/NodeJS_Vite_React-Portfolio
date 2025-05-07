import pool from "../db.js";

export const saveContactMessage = async (name, email, message) => {
  const res = await pool.query(
    "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *",
    [name, email, message]
  );
  return res.rows[0];
};

export const getMessagesFromDb = async () => {
  const res = await pool.query("SELECT * FROM contacts ORDER BY sent_at DESC");
  return res.rows;
}