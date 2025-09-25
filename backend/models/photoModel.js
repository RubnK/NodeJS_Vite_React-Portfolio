import pool from "../db.js";

export const savePhoto = async ({
  title,
  location,
  took_at,
  image_url,
  categoryIds = [],
}) => {
  const res = await pool.query(
    `INSERT INTO photos (title, location, took_at, image_url)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, location, took_at, image_url]
  );

  const photo = res.rows[0];

  // Lier les catégories si fournies
  for (const catId of categoryIds) {
    await pool.query(
      `INSERT INTO photo_category_links (photo_id, category_id) VALUES ($1, $2)`,
      [photo.id, catId]
    );
  }

  return photo;
};

export const getPhotosPaginated = async (limit, offset) => {
  const res = await pool.query(`
    SELECT
      p.id,
      p.title,
      p.filename,
      p.took_at,
      p.location,
      COALESCE(json_agg(pc.name) FILTER (WHERE pc.name IS NOT NULL), '[]') AS categories
    FROM photos p
    LEFT JOIN photo_category_links pcl ON p.id = pcl.photo_id
    LEFT JOIN photo_categories pc ON pcl.category_id = pc.id
    GROUP BY p.id
    ORDER BY p.took_at DESC
    LIMIT $1 OFFSET $2
  `, [limit, offset]);

  return res.rows;
};


