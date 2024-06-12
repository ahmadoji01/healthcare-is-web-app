import { ALERT_STATUS } from "@/constants/alert";
import { Modal } from "@mui/material"
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { motion } from 'framer-motion';
import AlertTitle from "../AlertTitle";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '80%',
    overflow: 'auto',
};

interface AlertModalProps {
    message: string,
    alertStatus: string,
    action: string,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}

const AlertModal = ({ message, alertStatus, action, open, setOpen }:AlertModalProps) => {

    const handleClose = () => {
        if (action === 'refresh') {
            setOpen(false);
            window.location.reload();
            return;
        }
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={ {zIndex: 99999999999} }
            >
            <>
                <motion.div 
                    onClick={handleClose}
                    whileHover={ { scale: 1.2, transition: { duration: 0.2 }} } 
                    whileTap={ { scale:0.9 } }
                    className="absolute top-[11%] right-[5%] md:right-[10%] lg:right-[18%] z-[999999]">
                    <Link
                        style={ { backgroundColor: 'red' } }
                        href="#"
                        className="inline-flex items-center justify-center bg-primary rounded-full py-4 px-6 text-center font-medium text-white hover:bg-opacity-90"
                        >
                        X
                    </Link>
                </motion.div>
                <div 
                    className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-11/12 sm:w-11/12 md:w-5/6 lg:w-4/6 p-8 md:p-10 lg:p-12"
                    style={style}>
                    <h2 className="text-title-md2 font-semibold text-black dark:text-white mb-4">
                        <AlertTitle alertStatus={alertStatus} />
                    </h2>
                    <h4 className="text-black dark:text-white text-xl font-extrabold text-center">{ message }</h4>
                </div>
            </>
        </Modal>
    )
} 

export default AlertModal;