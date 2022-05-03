import {Button, MenuItem, Select, Stack, TextField} from "@mui/material";
import {useForm, Controller} from "react-hook-form";
import {NoteCategory, noteSchema} from "./Note";
import {yupResolver} from "@hookform/resolvers/yup";
import {ErrorMessage} from '@hookform/error-message';

function enumOptions(enums : Record<string, string>) {
    return Object.values(enums).map((option) => (
        <MenuItem key={option} value={option}>{option}</MenuItem>
    ));
}

export function NoteForm() {
    const {register, handleSubmit, control, formState: {errors}} = useForm({
        resolver: yupResolver(noteSchema)
    });
    const onSubmit = (data: any) => alert(JSON.stringify(data));

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
            <TextField
                type="number"
                margin="normal"
                id="user_id"
                label="User ID"
                {...register('user_id')}
            />
            <ErrorMessage errors={errors} name="user_id" />

            <Controller
                control={control}
                name='category'
                render={({field: {onChange, value}}) => (
                    <Select onChange={onChange} value={value}>
                        {enumOptions(NoteCategory)}
                    </Select>
                )}
            />
            <ErrorMessage errors={errors} name="category" />

            <TextField
                multiline
                rows={3}
                margin="normal"
                id="note"
                label="Note"
                {...register('note')}
            />
            <ErrorMessage errors={errors} name="note" />

            <Button
                type="submit"
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Add Notes
            </Button>
        </Stack>
    </form>)
}