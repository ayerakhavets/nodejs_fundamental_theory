import express from "express";
import bodyParser from "body-parser";
import { SERVER_PORT, USER_DELETED, USER_NOT_FOUND, USER_UPDATED } from "./constants";
import { mockedUsers } from "./mocked_users";
import { User, userSchema, joiValidator } from "./utils";
import { passwordValidator } from "./utils";

const app = express();

const users: Array<User> = [...mockedUsers];

app.use(bodyParser.urlencoded({extended : true}));

app.get("/users", (_, res) => {
  res.send(users.filter(user => !user.isDeleted));
});

app.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send(USER_NOT_FOUND)
  }
});

app.post("/users/add", [
  joiValidator.body(userSchema),
  passwordValidator,
  (req, res) => {
    const index = users.findIndex((user) => user.id === req.params.id);
    if (index === -1) {
      users.push(req.body);
    } else {
      users[index] = req.body;
    }
    res.status(200).send(USER_UPDATED);
  },
]);

// Soft deletes the user.
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((user) => user.id === req.params.id);
  if (index === -1) {
    res.status(404).send(USER_NOT_FOUND);
  } else {
    const user = users[index];
    user.isDeleted = true;
    users[index] = user;
    res.status(200).send(USER_DELETED);
  }
});

app.get("/users-sorted", (req, res) => {
  const { limit, loginSubString } = req.query;
  const result = users
    .filter((user) =>
      user.login
        .toLocaleLowerCase()
        .includes(loginSubString.toLocaleLowerCase())
    )
    .sort()
    .slice(0, limit);
  res.send(result);
});

app.listen(SERVER_PORT, () => {
  console.log(`User service is listening on port ${SERVER_PORT}`);
});
