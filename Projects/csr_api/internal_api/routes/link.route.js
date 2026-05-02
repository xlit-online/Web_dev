const {
  shortenUrl,
  getAllLinks,
  getLinkAnalytics,
  redirectToOriginal,
} = require("../controllers/link.controller");

function linkRoutes(req, res) {
  // POST /api/shorten
  if (req.url === "/api/shorten" && req.method === "POST") {
    shortenUrl(req, res);
    return true;
  }

  // GET /api/links
  if (req.url === "/api/links" && req.method === "GET") {
    getAllLinks(req, res);
    return true;
  }

  // GET /api/links/:code
  if (req.url.startsWith("/api/links/") && req.method === "GET") {
    const code = req.url.split("/")[3];
    getLinkAnalytics(req, res, code);
    return true;
  }

  // GET /:code (redirect)
  if (!req.url.startsWith("/api") && req.method === "GET") {
    const code = req.url.substring(1);
    if (code) {
      redirectToOriginal(req, res, code);
      return true;
    }
  }

  return false;
}

module.exports = linkRoutes;