const todoRoutes = require("./routes/todo.route");

function router(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  res.setHeader("Content-Type", "application/json");

  req.url = pathname; // ✅ FIX: DO NOT clone req, just mutate safely

  const handled = todoRoutes(req, res);
  if (handled) return;

  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route not found", path: pathname }));
}

module.exports = router;