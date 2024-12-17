import React, { useState } from "react";
import './AddNote.css';

const AddNote = ({ setNotes }) => {
  const [noteHeader, setNoteHeader] = useState("");
  const [noteText, setNoteText] = useState("");

  const handleAddNote = () => {
    if (noteHeader.trim() === "" || noteText.trim() === "") return;

    const newNote = {
      id: Date.now(),
      header: noteHeader,
      text: noteText,
      date: new Date().toLocaleString(),
    };

    console.log("Adding note:", newNote);

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setNoteHeader("");
    setNoteText("");
  };

  const calculateLines = (text) => {
    return text.split("\n").length;
  };

  const calculateCharacters = (text) => {
    return text.length;
  };

  console.log("Rendering AddNote");

  return (
    <div className="add-note">
      <input
        type="text"
        placeholder="Note Title"
        value={noteHeader}
        onChange={(e) => setNoteHeader(e.target.value)}
      />
      <textarea
        placeholder="Note Content"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      ></textarea>
      <div className="text-info">
        <p>Characters : {calculateCharacters(noteText)}</p>
        <p>Lines : {calculateLines(noteText)}</p>
      </div>
      <button className="header-data" onClick={handleAddNote}>Add Note</button>
    </div>
  );
};

export default AddNote;
