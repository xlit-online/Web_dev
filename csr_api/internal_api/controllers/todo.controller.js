const Todo = require("../models/Todo");
const getRequestBody = require("../helpers/bodyParser");

// GET /api/todos
async function getTodos(req, res) {
  try {
    const todos = await Todo.find();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error", error: error.message }));
  }
}

// POST /api/todos
async function addTodo(req, res) {
  try {
    const body = (await getRequestBody(req)) || {};

    if (!body.title) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Todo title is required" }));
    }

    const newTodo = await Todo.create({
      title: body.title,
      completed: false,
    });

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newTodo));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error", error: error.message }));
  }
}

// PUT /api/todos?id=123
async function updateTodo(req, res) {
  try {
    const body = (await getRequestBody(req)) || {};

    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const id = urlObj.searchParams.get("id");

    if (!id || id.length !== 24) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid todo id" }));
    }

    const updateData = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.completed !== undefined) updateData.completed = body.completed;

    const updatedTodo = await Todo.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedTodo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Todo not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedTodo));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error", error: error.message }));
  }
}

// DELETE /api/todos?id=123
async function deleteTodo(req, res) {
  console.log("DELETE ID:", id);
  try {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const id = urlObj.searchParams.get("id");

    if (!id || id.length !== 24) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid todo id" }));
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Todo not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Todo deleted successfully" }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error", error: error.message }));
  }
  
}

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};