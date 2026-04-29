const todoRoutes = require("./routes/todo.route");
const noteRoutes = require("./routes/note.route");

function router(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  res.setHeader("Content-Type", "application/json");

  // ✅ IMPORTANT: DO NOT destroy query params
  const urlObj = new URL(req.url, `http://${req.headers.host}`);

  // Pass parsed URL to controllers (safe way)
  req.parsedUrl = urlObj;
  req.pathname = urlObj.pathname;

  const handled = todoRoutes(req, res);
  if (handled) return;

  const handled = noteRoutes(req, res);
  if (handled) return;

  res.writeHead(404);
  res.end(
    JSON.stringify({
      message: "Route not found",
      path: urlObj.pathname,
      method: req.method,
    })
  );
}

module.exports = router;