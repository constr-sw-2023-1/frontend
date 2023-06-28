import { Alert, AlertProps } from "@mui/material";

interface ToastProps extends AlertProps {
    message: string
}

export default function ToastComponent({
    message,
    ...props
}: ToastProps) {
    return (
        <Alert variant={'filled'} {...props}>
            {message}
        </Alert>
    )
}