const todoController = require("../controllers/todo.controller");

function todoRoutes(req, res) {
  if (req.url === "/api/todos" && req.method === "GET") {
    todoController.getTodos(req, res);
    return true;
  }

  if (req.url === "/api/todos" && req.method === "POST") {
    todoController.addTodo(req, res);
    return true;
  }

  if (req.url.startsWith("/api/todos") && req.method === "PUT") {
    todoController.updateTodo(req, res);
    return true;
  }

  if (req.url.startsWith("/api/todos") && req.method === "DELETE") {
    todoController.deleteTodo(req, res);
    return true;
  }

  return false;
}

module.exports = todoRoutes;