CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  age int NOT NULL,
  is_deleted boolean NOT NULL,
  login varchar(40),
  password varchar(40),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

INSERT INTO users (age, is_deleted, login, password) VALUES
  (18, false, 'login1', 'password1'),
  (19, false, 'login2', 'password2'),
  (20, false, 'login3', 'password3'),
  (21, false, 'login4', 'password4')