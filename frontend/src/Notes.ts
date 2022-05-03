import {useQuery} from "react-query";
import axios from "axios";
import {Note} from "./Note";

const NOTES = 'NOTES';

export interface NoteResponse {
    data: Note[];
    total: number;
}


function getNotes() {
    return axios.get<NoteResponse>('http://localhost:3000/notes').then(r => r.data);
}

export function useNotes() {
    return useQuery([NOTES], getNotes);
}