CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  age int NOT NULL,
  login varchar(40),
  password varchar(40),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
)

INSERT INTO users (id, age, login, password) VALUES
  (1, 18, 'login1', 'password1'),
  (2, 19, 'login2', 'password2'),
  (3, 20, 'login3', 'password3'),
  (4, 21, 'login4', 'password4')

SELECT * FROM users

DROP TABLE users
