const {
  shortenUrl,
  getAllLinks,
  getLinkAnalytics,
  redirectToOriginal,
} = require("../controllers/link.controller");

function noteRoutes(req, res) {
  const url = req.pathname;
  const method = req.method;

  if (url === "/api/notes" && method === "GET") {
    noteController.getNotes(req, res);
    return true;
  }

  if (url === "/api/notes" && method === "POST") {
    noteController.addNote(req, res);
    return true;
  }

  if (url === "/api/notes" && method === "PUT") {
    noteController.updateNote(req, res);
    return true;
  }

  if (url === "/api/notes" && method === "DELETE") {
    noteController.deleteNote(req, res);
    return true;
  }

  if (url === "/api/notes/search" && method === "GET") {
    noteController.searchNotes(req, res);
    return true;
  }

  return false;
}

module.exports = noteRoutes;