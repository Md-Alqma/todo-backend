const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let PORT = process.env.PORT || 3000;

let todos = [];

function generateRandomId() {
  return Math.floor(Math.random() * 1000 + 1);
}

app.get("/", (req, res) => {
  res.send("Welcome to Todo App");
});

app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

app.post("/todos", (req, res) => {
  let todo = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
  };

  todos.push(todo);

  res.status(201).json(todo);
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
