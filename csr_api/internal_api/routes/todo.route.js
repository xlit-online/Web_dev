const todoController = require("../controllers/todo.controller");

function todoRoutes(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (pathname === "/api/todos" && req.method === "GET") {
    todoController.getTodos(req, res);
    return true;
  }

  if (pathname === "/api/todos" && req.method === "POST") {
    todoController.addTodo(req, res);
    return true;
  }

  if (pathname === "/api/todos" && req.method === "PUT") {
    todoController.updateTodo(req, res);
    return true;
  }

  if (pathname === "/api/todos" && req.method === "DELETE") {
    todoController.deleteTodo(req, res);
    return true;
  }

  return false;
}

module.exports = todoRoutes;