import { Alert, AlertColor, Snackbar } from '@mui/material';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
 
interface AlertContextType {
    setOpen: (open:boolean) => void,
    setMessage: Dispatch<SetStateAction<string>>,
    setStatus: Dispatch<SetStateAction<AlertColor>>,
}

export const AlertContext = createContext<AlertContextType | null>({
    setOpen: () => {},
    setMessage: () => {},
    setStatus: () => {},
});
 
export const AlertProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [message, setMessage] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<AlertColor>("error");

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    return (
        <AlertContext.Provider value={{ setMessage, setOpen, setStatus }}>
            {children}
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose} sx={{ zIndex: 2147483647 }}>
                <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
                    { message }
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};
 
export const useAlertContext = () => {
    const context = useContext(AlertContext);
    
    if (!context) {
        throw new Error('useAlertContext must be used inside the AlertProvider');
    }
    
    return context;
};