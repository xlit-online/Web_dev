const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("stickyNotes")) || [];

function saveNotes() {
  localStorage.setItem("stickyNotes", JSON.stringify(notes));
}

function renderNotes() {
  notesContainer.innerHTML = "";

  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    const textarea = document.createElement("textarea");
    textarea.value = note;
    textarea.placeholder = "Write your note...";

    textarea.addEventListener("input", (e) => {
      notes[index] = e.target.value;
      saveNotes();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "X";

    deleteBtn.addEventListener("click", () => {
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    });

    noteDiv.appendChild(deleteBtn);
    noteDiv.appendChild(textarea);
    notesContainer.appendChild(noteDiv);
  });
}

addBtn.addEventListener("click", () => {
  notes.push("");
  saveNotes();
  renderNotes();
});

renderNotes();