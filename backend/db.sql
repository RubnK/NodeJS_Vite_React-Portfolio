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

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  description TEXT,
  filename TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project_images (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (title, description, stack, link) VALUES
('Project 1', 'Description of project 1', ARRAY['JavaScript', 'React'], 'https://example.com/project1'),
('Project 2', 'Description of project 2', ARRAY['Python', 'Django'], 'https://example.com/project2'),
('Project 3', 'Description of project 3', ARRAY['Java', 'Spring'], 'https://example.com/project3');

INSERT INTO project_images (project_id, filename) VALUES
(1, 'project1_image1.jpg'),
(1, 'project1_image2.jpg'),
(2, 'project2_image1.jpg'),
(3, 'project3_image1.jpg'),
(3, 'project3_image2.jpg');