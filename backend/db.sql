CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  stack TEXT[],
  link TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  message TEXT,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE photo_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  description TEXT,
  filename TEXT NOT NULL,
  location VARCHAR(100),
  category_id INTEGER REFERENCES photo_categories(id) ON DELETE SET NULL,
  took_at TIMESTAMP
);

CREATE TABLE project_images (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  title VARCHAR(100),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE photo_category_links (
  photo_id INTEGER REFERENCES photos(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES photo_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (photo_id, category_id)
);
