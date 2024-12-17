import React from "react";
import Note from "./Note";

import './NoteList.css';


const NotesList = ({ notes, setNotes }) => {
  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (id, newHeader, newText) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, header: newHeader, text: newText }
          : note
      )
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div key={note.id} className="note-item">
          <Note
            note={note}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      ))}
    </div>
  );
};

export default NotesList;
