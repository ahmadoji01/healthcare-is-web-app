import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useOrderSummaryModalContext } from "@/contexts/order-summary-modal-context";
import { PaymentMethod } from "@/modules/payment-methods/domain/payment-method";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

const Footer = () => {

    const { selectedPayment, handleModal } = useOrderSummaryModalContext();
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const handleClick = () => {
        if (typeof(selectedPayment) !== 'undefined') {
            handleModal(false,false,true);
            return;
        }
        setOpenSnackbar(true);
        return;
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbar(false);
    };

    return (
        <footer className="sticky bottom-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="block text-black dark:text-white font-extrabold text-xl">
                    Total: Rp. 180000
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <Link
                        href="#payment_method"
                        onClick={handleClick}
                        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                        <span>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </span>
                        Checkout
                    </Link>
                    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnackbar} autoHideDuration={6000} onClose={handleClose} style={{ zIndex: 99999999999 }}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            Choose the right payment method first!
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </footer>
    )

}

export default Footer;