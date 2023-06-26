import { Alert, AlertColor, AlertProps } from "@mui/material";

interface ToastProps extends AlertProps {
    message: string
}

export default function ToastComponent({
    message,
    ...props
}: ToastProps) {
    return (
        <Alert {...props}>
            {message}
        </Alert>
    )
}