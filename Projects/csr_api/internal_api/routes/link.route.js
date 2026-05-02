const {
  shortenUrl,
  getAllLinks,
  getLinkAnalytics,
  redirectToOriginal,
} = require("../controllers/link.controller");

function linkRoutes(req, res) {
  const url = req.pathname;
  const method = req.method;

  // POST /api/shorten
  if (url === "/api/shorten" && method === "POST") {
    shortenUrl(req, res);
    return true;
  }

  // GET /api/links
  if (url === "/api/links" && method === "GET") {
    getAllLinks(req, res);
    return true;
  }

  // GET /api/links/:code
  if (url.startsWith("/api/links/") && method === "GET") {
    const code = url.split("/")[3];
    getLinkAnalytics(req, res, code);
    return true;
  }

  // GET /:code (redirect short URL)
  if (!url.startsWith("/api") && method === "GET") {
    const code = url.substring(1);

    if (code) {
      redirectToOriginal(req, res, code);
      return true;
    }
  }

  return false;
}

module.exports = linkRoutes;