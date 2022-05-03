import {useQuery} from "react-query";
import axios from "axios";
import {Note} from "./Note";

const NOTES = 'NOTES';

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
    return useQuery([NOTES, params], () => getNotes(params));
}