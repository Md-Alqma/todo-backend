const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

let PORT = process.env.PORT || 3000;

const DATA_FILE = "todos.json";

const loadTodos = () => {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  }
  return [];
};

const saveTodos = (todos) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
};

let todos = loadTodos();

function generateRandomId() {
  return Math.floor(Math.random() * 1000 + 1);
}

app.get("/", (req, res) => {
  res.send("Welcome to Todo App");
});

app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const todo = todos.find((todo) => todo.id === id);

  res.json(todo);
});

app.post("/todos", (req, res) => {
  let todo = {
    id: generateRandomId(),
    title: req.body.title,
    description: req.body.description,
  };

  todos.push(todo);
  saveTodos(todos);

  res.status(201).json(todo);
});

app.put("/todos/:id", (req, res) => {});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  todos.splice(todoIndex, 1);

  saveTodos(todos);

  res.status(200).send("Todo deleted successfully");
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
