import React, { useState } from "react";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sidebarMenuItems } from "@/config/dashboard/menu";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { Doctor } from "@/modules/doctors/domain/doctor";
import { doctorsFakeData } from "@/modules/doctors/infrastructure/doctors.fakes";
import { useDoctorContext } from "@/contexts/doctor-context";

interface SidebarItemProps {
    sidebarExpanded: Boolean,
    setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>,
}

const SidebarItem = ({ sidebarExpanded, setSidebarExpanded }: SidebarItemProps) => {
    const { doctors, activeDoctor, setActiveDoctor } = useDoctorContext();

    return (
        <>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                PRACTICING DOCTORS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
                { doctors?.map((doctor, i) => (
                    <Link
                        href={"/operational/front-desk/queue-manager"}
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (doctor === activeDoctor) &&
                            "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                            ? setActiveDoctor(doctors[i])
                            : setSidebarExpanded(true);
                        }}
                        >
                        <FontAwesomeIcon icon={faUserDoctor} width={18} height={18} />
                        { doctor.name }
                    </Link>
                ))}
            </ul>
        </>
    )
}

export default SidebarItem;