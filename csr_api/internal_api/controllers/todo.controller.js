const { readData, writeData } = require("../helpers/fileStorage");
const getRequestBody = require("../helpers/bodyParser");

// GET /api/todos
function getTodos(req, res) {
  const db = readData();

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(db.todos));
}

// POST /api/todos
async function addTodo(req, res) {
  const db = readData();
  const body = await getRequestBody(req);

  if (!body.name) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Todo name is required" }));
  }

  const newTodo = {
    id: Date.now(),
    name: body.name,
    completed: false,
  };

  db.todos.push(newTodo);
  writeData(db);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newTodo));
}

// PUT /api/todos?id=123
async function updateTodo(req, res) {
  const db = readData();
  const body = await getRequestBody(req);

  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const id = Number(urlObj.searchParams.get("id"));

  if (!id || isNaN(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Valid todo id is required" }));
  }

  const todoIndex = db.todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Todo not found" }));
  }

  db.todos[todoIndex] = {
    ...db.todos[todoIndex],
    name: body.name ?? db.todos[todoIndex].name,
    completed: body.completed ?? db.todos[todoIndex].completed,
  };

  writeData(db);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(db.todos[todoIndex]));
}

// DELETE /api/todos?id=123
function deleteTodo(req, res) {
  const db = readData();

  const urlObj = new URL(req.url, `http://${req.headers.host}`);

  const id = Number(urlObj.searchParams.get("id"));

  if (!id || isNaN(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Valid todo id is required" }));
  }

  const updatedTodos = db.todos.filter((todo) => todo.id !== id);

  if (updatedTodos.length === db.todos.length) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Todo not found" }));
  }

  db.todos = updatedTodos;
  writeData(db);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Todo deleted" }));
}

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
