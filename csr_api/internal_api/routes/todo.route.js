const todoController = require("../controllers/todo.controller");

function todoRoutes(req, res) {
  const url = req.pathname; // 👈 from router.js
  const method = req.method;

  // GET all todos
  if (url === "/api/todos" && method === "GET") {
    todoController.getTodos(req, res);
    return true;
  }

  // POST todo
  if (url === "/api/todos" && method === "POST") {
    todoController.addTodo(req, res);
    return true;
  }

  // PUT todo
  if (url === "/api/todos" && method === "PUT") {
    todoController.updateTodo(req, res);
    return true;
  }

  // DELETE todo
  if (url === "/api/todos" && method === "DELETE") {
    todoController.deleteTodo(req, res);
    return true;
  }

  return false;
}

module.exports = todoRoutes;