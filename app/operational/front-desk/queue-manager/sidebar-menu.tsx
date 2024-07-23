import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import Spinner from "@/components/Spinner";
import { Doctor } from "@/modules/doctors/domain/doctor";
import { useVisitContext } from "@/contexts/visit-context";
import { useFrontDeskContext } from "@/contexts/front-desk-context";
import { DoctorName } from "@/utils/doctor-name-format";
import { useTranslations } from "next-intl";

interface SidebarMenuProps {
    sidebarExpanded: Boolean,
    setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>,
}

const SidebarMenu = ({ sidebarExpanded, setSidebarExpanded }: SidebarMenuProps) => {
    const { loading, presentDoctors, activeDoctor, setActiveDoctor, newQueues, setNewQueues } = useFrontDeskContext();
    const {handleDoctorVisits} = useVisitContext();
    const [showBadges, setShowBadges] = useState<boolean[]>([]);
    const t = useTranslations();

    useEffect( () => {
        let displays:boolean[] = [];
        presentDoctors.map( () => displays.push(false));
        setShowBadges(displays);
    }, [presentDoctors]);

    useEffect( () => {
        setShowBadges(newQueues);
    }, [newQueues]);

    const handleClick = (event: React.MouseEvent<HTMLElement>, doctor:Doctor, key:number) => {
        event.preventDefault();
        setActiveDoctor(doctor);
        handleDoctorVisits(doctor.id);
        
        let displays = [...newQueues];
        displays[key] = false;
        setNewQueues(displays);

        if (!sidebarExpanded) {
            setSidebarExpanded(true);
        }
    }
    
    return (
        <>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                {t('front_desk.practicing_doctors')}
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
                { loading && <Spinner /> }
                { !loading && presentDoctors?.map((doctor, key) => 
                    (doctor.id !== '') &&
                        <Link
                            href={"/operational/front-desk/queue-manager"}
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                (doctor === activeDoctor) &&
                                "bg-graydark dark:bg-meta-4"
                            }`}
                            onClick={(e) => { handleClick(e, doctor, key) }}
                            key={key}
                            >
                            <FontAwesomeIcon icon={faUserDoctor} width={18} height={18} />
                            { DoctorName(doctor.name, doctor.specialization) }
                            { showBadges[key] === true && 
                                <span className={`absolute top-4 right-1 z-1 h-2 w-2 rounded-full bg-meta-1`}>
                                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                                </span>
                            }
                        </Link>
                )}
            </ul>
        </>
    )
}

export default SidebarMenu;