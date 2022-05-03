export enum NoteCategory {
    request = 'request',
    alert = 'alert',
    comment = 'comment'
}

export interface Note {
    note: string;
    category: NoteCategory;
}