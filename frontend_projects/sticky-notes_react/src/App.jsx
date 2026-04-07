import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("stickyNotes")) || [];
  });

  useEffect(() => {
    localStorage.setItem("stickyNotes", JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    setNotes([...notes, ""]);
  }

  function updateNote(index, value) {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  }

  function deleteNote(index) {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  }

  return (
    <div className="container">
      <h1>📝 Sticky Notes</h1>

      <button className="addBtn" onClick={addNote}>
        + Add Note
      </button>

      <div className="notes-container">
        {notes.map((note, index) => (
          <div className="note" key={index}>
            <button className="delete-btn" onClick={() => deleteNote(index)}>
              X
            </button>

            <textarea
              value={note}
              onChange={(e) => updateNote(index, e.target.value)}
              placeholder="Write your note..."
            />
          </div>
        ))}
      </div>
    </div>
  );
}