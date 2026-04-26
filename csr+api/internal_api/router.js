const todoRoutes = require("./routes/todo.route");

function router(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // OPTIONS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  res.setHeader("Content-Type", "application/json");

  const handled = todoRoutes(req, res);
  if (handled) return;

  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route not found" }));
}

module.exports = router;