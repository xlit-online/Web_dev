const API_BASE = "https://YOUR_RENDER_URL_HERE/api/notes";

let notes = [];
let editNoteId = null;

const notesContainer = document.getElementById("notesContainer");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const tagsInput = document.getElementById("tagsInput");

const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");
const searchInput = document.getElementById("searchInput");

async function fetchNotes() {
  try {
    const res = await fetch(API_BASE);
    const data = await res.json();

    notes = data.notes || data;
    renderNotes(notes);
  } catch (err) {
    console.error("Error fetching notes:", err);
  }
}

async function saveNote() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  const tags = tagsInput.value
    .split(",")
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  if (!title || !content) {
    alert("Title and content are required!");
    return;
  }

  try {
    // CREATE
    if (!editNoteId) {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, tags }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create note");
        return;
      }
    }

    // UPDATE
    else {
      const res = await fetch(`${API_BASE}/${editNoteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, tags }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update note");
        return;
      }
    }

    resetForm();
    fetchNotes();
  } catch (err) {
    console.error("Error saving note:", err);
  }
}

async function deleteNote(id) {
  if (!confirm("Delete this note?")) return;

  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to delete note");
      return;
    }

    fetchNotes();
  } catch (err) {
    console.error("Error deleting note:", err);
  }
}

function startEdit(note) {
  editNoteId = note._id;

  titleInput.value = note.title;
  contentInput.value = note.content;
  tagsInput.value = note.tags ? note.tags.join(", ") : "";

  formTitle.innerText = "Edit Note";
  saveBtn.innerText = "Update Note";

  cancelBtn.style.display = "inline-block";
}

function resetForm() {
  editNoteId = null;

  titleInput.value = "";
  contentInput.value = "";
  tagsInput.value = "";

  formTitle.innerText = "Create Note";
  saveBtn.innerText = "Save Note";

  cancelBtn.style.display = "none";
}

function renderNotes(list) {
  notesContainer.innerHTML = "";

  if (list.length === 0) {
    notesContainer.innerHTML = "<p>No notes found.</p>";
    return;
  }

  list.forEach(note => {
    const div = document.createElement("div");
    div.className = "note-card";

    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <small><b>Tags:</b> ${(note.tags && note.tags.length > 0) ? note.tags.join(", ") : "None"}</small>
      <small><b>Created:</b> ${note.createdAt ? new Date(note.createdAt).toLocaleString() : "N/A"}</small>

      <div class="note-actions">
        <button class="btn-edit">Edit</button>
        <button class="btn-delete">Delete</button>
      </div>
    `;

    div.querySelector(".btn-edit").addEventListener("click", () => startEdit(note));
    div.querySelector(".btn-delete").addEventListener("click", () => deleteNote(note._id));

    notesContainer.appendChild(div);
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filtered = notes.filter(note =>
    note.title.toLowerCase().includes(query) ||
    note.content.toLowerCase().includes(query) ||
    (note.tags && note.tags.join(" ").toLowerCase().includes(query))
  );

  renderNotes(filtered);
});

saveBtn.addEventListener("click", saveNote);
cancelBtn.addEventListener("click", resetForm);

fetchNotes();