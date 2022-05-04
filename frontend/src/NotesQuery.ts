import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {Note} from "./Note";

const NotesQuery = 'notes';

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

function getNotes(params: QueryParams) {
    params.page = params.page + 1; // kaminari uses 1-indexes
    
    return axios.get<NoteResponse>(
        'http://localhost:3000/notes',
        {
            params
        }).then(r => r.data);
}


export function useNotes(params : QueryParams) {
    return useQuery([NotesQuery, params], () => getNotes(params));
}

function addNote(note: Note) {
    return axios.post('http://localhost:3000/notes', note)
}

export function useAddNote() {
    const queryClient = useQueryClient();

    return useMutation(addNote, {
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries([NotesQuery]);
        },
    })
}