import React, {useState} from 'react';
import './App.css';
import {NoteCategory} from "./Note";
import {useNotes} from "./NotesQuery";
import {CircularProgress, Stack} from "@mui/material";
import {
    DataGrid,
    getGridNumericOperators,
    getGridSingleSelectOperators,
    GridColDef,
    GridFilterModel,
    GridLinkOperator,
    GridSortModel
} from "@mui/x-data-grid";
import {NoteForm} from "./NoteForm";

console.log(getGridSingleSelectOperators())

const noteColumns : GridColDef[] = [
    {field: 'id', type: 'number', headerName: 'ID', sortable: true, filterable: false},
    {field: 'user_id', type: 'number', headerName: 'User', sortable: true,
        filterOperators: getGridNumericOperators().filter((op) => op.value === '=')},
    {field: 'category', type: 'singleSelect', headerName: 'Category', sortable: true,
        valueOptions: Object.values(NoteCategory),
        filterOperators: getGridSingleSelectOperators().filter((op) => op.value === 'is')
    },
    {field: 'note', type: 'string', headerName: 'Note', width: 400, sortable: false, filterable: false},
]

function App() {

  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'id', sort: 'asc'}]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({items:[], linkOperator: GridLinkOperator.And})

  const sortModelChanged = (newModel: GridSortModel) => {setSortModel(newModel)};
  const pageChanged = (page: number) => {setPage(page)};
  const filterModelChanged = (newModel: GridFilterModel) => {setFilterModel(newModel);};

    /*
    Don't destructure the useQuery() results:
    1. If there's more than one query, the grouping is more clear.
    2. Discriminated types! 'isSuccess == true' lets you access 'data' without null-check.
     */
  const notes = useNotes({
      page,
      pageSize,
      order: sortModel[0]?.field,
      descending: sortModel[0]?.sort === 'desc',
      user_id: filterModel.items.find(i=> i.columnField === 'user_id')?.value,
      category: filterModel.items.find(i=> i.columnField === 'category')?.value
  });

  return (
    <Stack>
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
            filterMode='server'
            onFilterModelChange={filterModelChanged}
        />}
    </div>
    <NoteForm/>
    </Stack>
  );
}

function Loading() {
    return (
        <CircularProgress/>
    )
}

export default App;
