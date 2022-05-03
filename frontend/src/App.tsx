import React from 'react';
import './App.css';
import {Note, NoteCategory} from "./Note";
import {useNotes} from "./Notes";

function App() {
  const notes = useNotes();
  return (
    <div className="App">
        {notes.isLoading && <Loading/>}
        {notes.isSuccess && <Data notes={notes.data.data}/>}
    </div>
  );
}

function Loading() {
    return (
        <p>Loading...</p>
    )
}

interface DataProps {
    notes: Note[];
}
function Data({notes} : DataProps) {
    return (
        <pre>{JSON.stringify(notes)}</pre>
    )
}

export default App;
