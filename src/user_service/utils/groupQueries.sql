CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name varchar(40),
  permissions varchar(40) ARRAY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

INSERT INTO groups (name, permissions) VALUES
  ('admin', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']),
  ('guest', ARRAY['READ'])

SELECT * FROM groups
SELECT * FROM "UserGroups"

DROP TABLE groups