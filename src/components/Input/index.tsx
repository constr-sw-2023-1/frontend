import {
    MenuItem,
    TextField, TextFieldProps,
} from "@mui/material";

interface InputProps {
    label: string
    errorMessage?: string | null
    items?: []
}

export default function Input({
    label,
    errorMessage = null,
    items,
    select = false,
    ...props
}: InputProps & TextFieldProps) {
    const invalid = !!errorMessage

    return (
        <TextField
            select={select}
            error={invalid}
            label={label}
            id={'filled-start-adornment'}
            sx={{
                width: '100%',
            }}
            helperText={errorMessage}
            {...props}
        >
            {select ? items?.map(({ name, id }) => (
                <MenuItem key={id} value={name}>{name}</MenuItem>
            )) : null}
        </TextField>
    )
}