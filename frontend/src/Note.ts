import {object, string, number, date, InferType, ObjectSchema} from 'yup';

export enum NoteCategory {
    request = 'request',
    alert = 'alert',
    comment = 'comment'
}

export const noteSchema = object({
    user_id: number().min(1).max(10000).required(),
    category: string().oneOf(Object.values(NoteCategory)).required(),
    note: string()
        .matches(
            /.*PASSWORD.*/,
            {message: 'must contain top secret word', excludeEmptyString: true}
        )
})

export type Note = InferType<typeof noteSchema>;