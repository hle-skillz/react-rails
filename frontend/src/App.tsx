import React, {useState} from 'react';
import './App.css';
import {Note} from "./Note";
import {useNotes} from "./Notes";
import {CircularProgress} from "@mui/material";
import {DataGrid, GridColDef, GridSortModel} from "@mui/x-data-grid";

const noteColumns : GridColDef[] = [
    {field: 'id', headerName: 'ID', sortable: true},
    {field: 'user_id', headerName: 'User', sortable: true},
    {field: 'category', headerName: 'Category', sortable: true},
    {field: 'note', headerName: 'Note', width: 400, sortable: false},
]

function App() {

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'id', sort: 'asc'}]);

  const sortModelChanged = (newModel: GridSortModel) => {setSortModel(newModel)};
  const pageChanged = (page: number) => {setPage(page)};

    /*
    Don't destructure the useQuery() results:
    1. If there's more than one query, the grouping is more clear.
    2. Discriminated types! 'isSuccess == true' lets you access 'data' without null-check.
     */
  const notes = useNotes({
      page,
      pageSize,
      order: sortModel[0]?.field,
      descending: sortModel[0]?.sort == 'desc'
  });

  return (
    <div className="App">
        {notes.isLoading && <Loading/>}
        {notes.isSuccess && <DataGrid
            columns={noteColumns}
            rows={notes.data.data} rowCount={notes.data.total}
            pageSize={pageSize}
            paginationMode='server'
            page={page} onPageChange={pageChanged}
            sortingMode='server'
            sortModel={sortModel} onSortModelChange={sortModelChanged}
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
