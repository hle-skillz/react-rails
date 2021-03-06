import {QueryFunctionContext, useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {AddNote, Note, NoteCategory} from "./Note";

export interface PageResponse<T> {
    data: T[];
    total: number;
}

export type NoteResponse = PageResponse<NoteResponse>;

// make backend camelCase for convenience, apply kebab/snake mapper if bored
interface QueryParams {
    page: number;
    pageSize: number;
    order: string;
    descending: boolean;
    user_id: number | null;
    category: NoteCategory | null;
}

// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories
const noteKeys = {
    all: [{scope: 'notes'}] as const,
    lists: () => [{...noteKeys.all, entity: 'list'}] as const,
    list: (params: QueryParams) => [{...noteKeys.lists()[0], params}] as const
    // can define query keys for show(id), allows invalidating all lists or individual items
    // in case items contain more fields than list
}

// Dying from types, go ask David.
// https://tkdodo.eu/blog/leveraging-the-query-function-context#object-query-keys
type Params = QueryFunctionContext<ReturnType<typeof noteKeys['list']>>;

function getNotes({queryKey: [{params}]} : Params) {

    params = {...params, page: params.page + 1}; // kaminari uses 1-indexes
    
    return axios.get<NoteResponse>(
        'http://localhost:3000/notes',
        {
            params
        }).then(r => r.data);
}

// https://react-query.tanstack.com/typescript#defining-custom-hooks
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