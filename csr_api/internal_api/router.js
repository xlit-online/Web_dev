const todoRoutes = require("./routes/todo.route");

function router(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  res.setHeader("Content-Type", "application/json");

  // 🔥 IMPORTANT FIX: clean URL properly
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  const handled = todoRoutes({ ...req, url: pathname }, res);

  if (handled) return;

  res.writeHead(404);
  res.end(JSON.stringify({
    message: "Route not found",
    path: pathname,
    method: req.method
  }));
}

module.exports = router;