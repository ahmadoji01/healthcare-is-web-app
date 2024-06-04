import { Modal } from "@mui/material";
import React from "react";
import { motion } from 'framer-motion';
import Link from "next/link";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '80%',
    overflow: 'auto',
};

interface DashboardModalProps {
    open: boolean,
    handleClose?: any,
    children: React.ReactElement,
    title: string,
}

const DashboardModal = ({ open, handleClose, children, title }: DashboardModalProps) => {
    return (
        <motion.div
            animate={{ x: 100 }}
            transition={{
                ease: "linear",
                duration: 2,
                x: { duration: 1 }
            }}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={ {zIndex: 99999999999} }
                >
                <>
                    { handleClose && 
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
                    </motion.div> }
                    <div 
                        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-11/12 sm:w-11/12 md:w-5/6 lg:w-4/6 p-8 md:p-10 lg:p-12"
                        style={style}>
                        <h2 className="text-title-md2 font-semibold text-black dark:text-white mb-4">
                            { title }
                        </h2>
                        { children }
                    </div>
                </>
            </Modal>
        </motion.div>
    )
}

export default DashboardModal;