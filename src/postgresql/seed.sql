-- seed.sql
INSERT INTO users (username, name, admin, disabled) VALUES
  ('tony',  'Tony Tan',    true,  false),
  ('maria', 'Maria Cruz',  false, false),
  ('jose',  'Jose Reyes',  false, false),
  ('ana',   'Ana Santos',  false, true)
ON CONFLICT (username) DO NOTHING;

INSERT INTO notes (content, important, date, user_id) VALUES
  ('Learn Sequelize associations',         true,  NOW() - INTERVAL '6 days', (SELECT id FROM users WHERE username = 'tony')),
  ('Fix the migration typos',              false, NOW() - INTERVAL '5 days', (SELECT id FROM users WHERE username = 'tony')),
  ('Deploy the notes app to Render',       true,  NOW() - INTERVAL '4 days', (SELECT id FROM users WHERE username = 'tony')),
  ('Practice React hooks for 30 minutes',  false, NOW() - INTERVAL '3 days', (SELECT id FROM users WHERE username = 'maria')),
  ('Write the README for the portfolio',   true,  NOW() - INTERVAL '2 days', (SELECT id FROM users WHERE username = 'maria')),
  ('Test the login route with curl',       false, NOW() - INTERVAL '2 days', (SELECT id FROM users WHERE username = 'jose')),
  ('Add search to the notes endpoint',     true,  NOW() - INTERVAL '1 day',  (SELECT id FROM users WHERE username = 'jose')),
  ('Review the Express error handling',    false, NOW(),                     (SELECT id FROM users WHERE username = 'jose')),
  ('Note from a disabled user',            false, NOW(),                     (SELECT id FROM users WHERE username = 'ana'));
