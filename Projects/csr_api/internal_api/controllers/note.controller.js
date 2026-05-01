const Note = require("../models/Note");
const getRequestBody = require("../helpers/bodyParser");

// GET /api/notes
async function getNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(notes));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error", error: error.message }));
  }
}

// POST /api/notes
async function addNote(req, res) {
  try {
    const body = await getRequestBody(req);

    if (!body.title || !body.content) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "Title and content are required" })
      );
    }

    const newNote = await Note.create({
      title: body.title,
      content: body.content,
      tags: body.tags || [],
    });

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newNote));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error", error: error.message }));
  }
}

// PUT /api/notes?id=NOTE_ID
async function updateNote(req, res) {
  try {
    const body = await getRequestBody(req);
    const id = req.parsedUrl.searchParams.get("id");

    if (!id) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Note id is required" }));
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        title: body.title,
        content: body.content,
        tags: body.tags,
      },
      { new: true }
    );

    if (!updatedNote) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Note not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedNote));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error", error: error.message }));
  }
}

// DELETE /api/notes?id=NOTE_ID
async function deleteNote(req, res) {
  try {
    const id = req.parsedUrl.searchParams.get("id");

    if (!id) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Note id is required" }));
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Note not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Note deleted successfully" }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error", error: error.message }));
  }
}

// GET /api/notes/search?query=abc
async function searchNotes(req, res) {
  try {
    const query = req.parsedUrl.searchParams.get("query");

    if (!query) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Search query is required" }));
    }

    const notes = await Note.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(notes));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error", error: error.message }));
  }
}

module.exports = {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  searchNotes,
};