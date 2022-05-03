import React from 'react';
import './App.css';
import {Note} from "./Note";
import {useNotes} from "./Notes";
import {CircularProgress} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

const noteColumns : GridColDef[] = [
    {field: 'id', headerName: 'ID'},
    {field: 'user_id', headerName: 'User'},
    {field: 'category', headerName: 'Category'},
    {field: 'note', headerName: 'Note', width: 400},
]

function App() {
  /*
  Don't destructure the useQuery() results:
  1. If there's more than one query, the grouping is more clear.
  2. Discriminated types! 'isSuccess == true' lets you access 'data' without null-check.
   */
  const notes = useNotes();

  return (
    <div className="App">
        {notes.isLoading && <Loading/>}
        {notes.isSuccess && <DataGrid
            columns={noteColumns}
            rows={notes.data.data} rowCount={notes.data.total}
            pageSize={10}
        />}
    </div>
  );
}

function Loading() {
    return (
        <CircularProgress/>
    )
}

export default App;
