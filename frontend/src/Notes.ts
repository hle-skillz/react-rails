import {useQuery} from "react-query";
import axios from "axios";
import {Note} from "./Note";

const NOTES = 'NOTES';

export interface NoteResponse {
    data: Note[];
    total: number;
}

interface QueryParams {
    page: number;
    pageSize: number;
}

function getNotes(params: QueryParams) {
    return axios.get<NoteResponse>(
        'http://localhost:3000/notes',
        {
            params: {
                page: params.page + 1, // kaminari uses 1-indexes
                page_size: params.pageSize
            }
        }).then(r => r.data);
}


export function useNotes(params : QueryParams) {
    return useQuery([NOTES, params], () => getNotes(params));
}