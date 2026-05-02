const {
  shortenUrl,
  getAllLinks,
  getLinkAnalytics,
  redirectToOriginal,
} = require("../controllers/link.controller");

function linkRoutes(req, res) {
  const pathname = req.pathname;

  // POST /api/shorten
  if (pathname === "/api/shorten" && req.method === "POST") {
    shortenUrl(req, res);
    return true;
  }

  // GET /api/links
  if (pathname === "/api/links" && req.method === "GET") {
    getAllLinks(req, res);
    return true;
  }

  // GET /api/links/:code
  if (pathname.startsWith("/api/links/") && req.method === "GET") {
    const code = pathname.split("/")[3];
    getLinkAnalytics(req, res, code);
    return true;
  }

  // GET /:code (redirect short URL)
  if (!pathname.startsWith("/api") && req.method === "GET") {
    const code = pathname.substring(1);

    if (code) {
      redirectToOriginal(req, res, code);
      return true;
    }
  }

  return false;
}

module.exports = linkRoutes;