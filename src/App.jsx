import React, { useState, useEffect } from "react";
import NotesList from "./components/NotesList";
import AddNote from "./components/AddNote";



const App = () => {
  const [notes, setNotes] = useState([]);

  // Load notes from localStorage when the app starts
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>
      <AddNote setNotes={setNotes} />
      <NotesList notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default App;
