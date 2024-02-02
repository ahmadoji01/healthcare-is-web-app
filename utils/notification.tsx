import { useAlertContext } from "@/contexts/alert-context";
import { AlertColor } from "@mui/material";

const {setOpen, setMessage, setStatus} = useAlertContext();

export function openSnackbarNotification(message:string, status:AlertColor) {
    setOpen(true);
    setMessage(message);
    setStatus(status);
}