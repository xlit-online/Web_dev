function linkRoutes(req, res) {
  const pathname = req.parsedUrl.pathname;

  if (pathname === "/api/shorten" && req.method === "POST") {
    shortenUrl(req, res);
    return true;
  }

  if (pathname === "/api/links" && req.method === "GET") {
    getAllLinks(req, res);
    return true;
  }

  if (pathname.startsWith("/api/links/") && req.method === "GET") {
    const code = pathname.split("/")[3];
    getLinkAnalytics(req, res, code);
    return true;
  }

  // redirect
  if (!pathname.startsWith("/api") && req.method === "GET") {
    const code = pathname.substring(1);
    if (code) {
      redirectToOriginal(req, res, code);
      return true;
    }
  }

  return false;
}