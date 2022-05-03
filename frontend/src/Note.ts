import {object, string, number, date, InferType, ObjectSchema} from 'yup';

export enum NoteCategory {
    request = 'request',
    alert = 'alert',
    comment = 'comment'
}

export const noteSchema = object({
    user_id: number().required(),
    category: string().oneOf(Object.values(NoteCategory)).required(),
    note: string(),
})

export type Note = InferType<typeof noteSchema>;