-- Seed Subjects
INSERT INTO subjects (id, name, weightage, total_chapters) VALUES
  (gen_random_uuid(), 'Mathematics', 30, 15),
  (gen_random_uuid(), 'Science', 30, 16),
  (gen_random_uuid(), 'English', 15, 20),
  (gen_random_uuid(), 'Social Science (SST)', 10, 21),
  (gen_random_uuid(), 'Sanskrit', 10, 10),
  (gen_random_uuid(), 'Gujarati', 10, 10),
  (gen_random_uuid(), 'Computer Studies', 5, 5);

-- Seed Chapters (Mathematics Example)
WITH math AS (SELECT id FROM subjects WHERE name = 'Mathematics' LIMIT 1)
INSERT INTO chapters (subject_id, name, order_index, difficulty, estimated_hours) VALUES
  ((SELECT id FROM math), 'Real Numbers', 1, 'Medium', 6),
  ((SELECT id FROM math), 'Polynomials', 2, 'Medium', 8),
  ((SELECT id FROM math), 'Pair of Linear Equations', 3, 'Medium', 10),
  ((SELECT id FROM math), 'Quadratic Equations', 4, 'Hard', 12),
  ((SELECT id FROM math), 'Arithmetic Progressions', 5, 'Medium', 8),
  ((SELECT id FROM math), 'Triangles', 6, 'Hard', 15),
  ((SELECT id FROM math), 'Coordinate Geometry', 7, 'Medium', 7),
  ((SELECT id FROM math), 'Introduction to Trigonometry', 8, 'Hard', 12),
  ((SELECT id FROM math), 'Some Applications of Trigonometry', 9, 'Medium', 8),
  ((SELECT id FROM math), 'Circles', 10, 'Medium', 8),
  ((SELECT id FROM math), 'Constructions', 11, 'Easy', 5),
  ((SELECT id FROM math), 'Areas Related to Circles', 12, 'Medium', 8),
  ((SELECT id FROM math), 'Surface Areas and Volumes', 13, 'Hard', 12),
  ((SELECT id FROM math), 'Statistics', 14, 'Medium', 10),
  ((SELECT id FROM math), 'Probability', 15, 'Easy', 5);

-- Seed Chapters (Science Example)
WITH sci AS (SELECT id FROM subjects WHERE name = 'Science' LIMIT 1)
INSERT INTO chapters (subject_id, name, order_index, difficulty, estimated_hours) VALUES
  ((SELECT id FROM sci), 'Chemical Reactions and Equations', 1, 'Medium', 8),
  ((SELECT id FROM sci), 'Acids Bases and Salts', 2, 'Medium', 10),
  ((SELECT id FROM sci), 'Metals and Non-Metals', 3, 'Medium', 10),
  ((SELECT id FROM sci), 'Carbon and Its Compounds', 4, 'Hard', 15),
  ((SELECT id FROM sci), 'Life Processes', 5, 'Hard', 15),
  ((SELECT id FROM sci), 'Control and Coordination', 6, 'Medium', 10),
  ((SELECT id FROM sci), 'How do Organisms Reproduce', 7, 'Hard', 12),
  ((SELECT id FROM sci), 'Heredity and Evolution', 8, 'Medium', 10),
  ((SELECT id FROM sci), 'Light – Reflection and Refraction', 9, 'Hard', 15),
  ((SELECT id FROM sci), 'Human Eye and Colourful World', 10, 'Medium', 8),
  ((SELECT id FROM sci), 'Electricity', 11, 'Hard', 15),
  ((SELECT id FROM sci), 'Magnetic Effects of Electric Current', 12, 'Hard', 12),
  ((SELECT id FROM sci), 'Sources of Energy', 13, 'Easy', 5),
  ((SELECT id FROM sci), 'Our Environment', 14, 'Easy', 5),
  ((SELECT id FROM sci), 'Sustainable Management of Natural Resources', 15, 'Easy', 5);
