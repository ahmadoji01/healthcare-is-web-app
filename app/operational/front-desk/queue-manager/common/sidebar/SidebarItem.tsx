import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { useDoctorContext } from "@/contexts/doctor-context";
import Loader from "@/components/Loader";
import Spinner from "@/components/Spinner";
import { Doctor } from "@/modules/doctors/domain/doctor";
import { getVisitByDoctorID } from "@/modules/visits/domain/visits.actions";
import { useUserContext } from "@/contexts/user-context";
import { useVisitContext } from "@/contexts/visit-context";
import { useFrontDeskContext } from "@/contexts/front-desk-context";

interface SidebarItemProps {
    sidebarExpanded: Boolean,
    setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>,
}

const SidebarItem = ({ sidebarExpanded, setSidebarExpanded }: SidebarItemProps) => {
    const { loading, presentDoctors, activeDoctor, setActiveDoctor } = useFrontDeskContext();
    const {handleDoctorVisits} = useVisitContext();

    const handleClick = (event: React.MouseEvent<HTMLElement>, doctor:Doctor) => {
        event.preventDefault();
        setActiveDoctor(doctor);
        handleDoctorVisits(doctor.id);
        
        if (!sidebarExpanded) {
            setSidebarExpanded(true);
        }
    }
    
    return (
        <>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                PRACTICING DOCTORS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
                { loading && <Spinner /> }
                { !loading && presentDoctors?.map((doctor) => 
                    (doctor.id !== 0) &&
                        <Link
                            href={"/operational/front-desk/queue-manager"}
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                (doctor === activeDoctor) &&
                                "bg-graydark dark:bg-meta-4"
                            }`}
                            onClick={(e) => { handleClick(e, doctor) }}
                            >
                            <FontAwesomeIcon icon={faUserDoctor} width={18} height={18} />
                            { doctor.name }
                        </Link>
                )}
            </ul>
        </>
    )
}

export default SidebarItem;