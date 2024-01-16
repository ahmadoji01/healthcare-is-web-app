import { faCartShopping, faMedkit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

const Footer = () => {

    const handleClick = () => {
        
    }

    return (
        <footer className="sticky bottom-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-row-reverse w-full px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <Link
                    href=""
                    onClick={handleClick}
                    className="inline-flex gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                    <span>
                        <FontAwesomeIcon icon={faMedkit} />
                    </span>
                    Confirm Medical Record
                </Link>
            </div>
        </footer>
    )

}

export default Footer;