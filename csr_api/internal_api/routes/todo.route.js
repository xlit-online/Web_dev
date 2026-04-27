const todoController = require("../controllers/todo.controller");

function todoRoutes(req, res) {
  // GET /api/todos
  if (req.url.startsWith("/api/todos") && req.method === "GET") {
    todoController.getTodos(req, res);
    return true;
  }

  // POST /api/todos
  if (req.url.startsWith("/api/todos") && req.method === "POST") {
    todoController.addTodo(req, res);
    return true;
  }

  // PUT /api/todos?id=xxxx
  if (req.url.startsWith("/api/todos") && req.method === "PUT") {
    todoController.updateTodo(req, res);
    return true;
  }

  // DELETE /api/todos?id=xxxx
  if (req.url.startsWith("/api/todos") && req.method === "DELETE") {
    todoController.deleteTodo(req, res);
    return true;
  }

  return false;
}

module.exports = todoRoutes;