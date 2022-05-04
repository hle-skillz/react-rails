import {QueryFunctionContext, useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {AddNote, Note} from "./Note";

export interface NoteResponse {
    data: Note[];
    total: number;
}

// make backend camelCase for convenience, apply kebab/snake mapper if bored
interface QueryParams {
    page: number;
    pageSize: number;
    order: string;
    descending: boolean;
}

// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories
const noteKeys = {
    all: [{scope: 'notes'}] as const,
    lists: () => [{...noteKeys.all, entity: 'list'}] as const,
    list: (params: QueryParams) => [{...noteKeys.lists()[0], params}] as const
}

// Dying from types, go ask David.
// https://tkdodo.eu/blog/leveraging-the-query-function-context#object-query-keys
type Params = QueryFunctionContext<ReturnType<typeof noteKeys['list']>>;

function getNotes({queryKey: [{params}]} : Params) {
    params.page = params.page + 1; // kaminari uses 1-indexes
    
    return axios.get<NoteResponse>(
        'http://localhost:3000/notes',
        {
            params
        }).then(r => r.data);
}

export function useNotes(params : QueryParams) {
    return useQuery(noteKeys.list(params), getNotes);
}

function addNote(note: AddNote) {
    return axios.post('http://localhost:3000/notes', note)
}

export function useAddNote() {
    const queryClient = useQueryClient();

    return useMutation(addNote, {
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries(noteKeys.all);
        },
    })
}