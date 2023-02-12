CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  age int NOT NULL,
  login varchar(40),
  password varchar(40),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
)

INSERT INTO users (age, login, password) VALUES
  (18, 'login1', 'password1'),
  (19, 'login2', 'password2'),
  (20, 'login3', 'password3'),
  (21, 'login4', 'password4')

SELECT * FROM users

DROP TABLE users