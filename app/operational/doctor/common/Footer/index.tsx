'use client';

import MiniSpinner from "@/components/MiniSpinner";
import { useMedicalRecordContext } from "@/contexts/medical-record-context";
import { faMedkit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const Footer = () => {

    const t = useTranslations();
    const [submitting, setSubmitting] = useState(false);
    const {loading} = useMedicalRecordContext();

    useEffect( () => {
        setSubmitting(loading);
    }, [loading]);

    return (
        <footer className="sticky bottom-0 z-9 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none" style={ { zIndex: 99999 } }>
            <div className="flex flex-row-reverse w-full px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                { submitting && <MiniSpinner /> }
                <button disabled={!submitting} className="inline-flex gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    <span>
                        <FontAwesomeIcon icon={faMedkit} />
                    </span>
                    { t('finish_examination') }
                </button>
            </div>
        </footer>
    )

}

export default Footer;