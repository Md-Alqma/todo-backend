const express = require("express");

const app = express();

let PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Todo App");
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});