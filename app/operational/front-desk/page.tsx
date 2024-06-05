'use client';

import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";

import { useState } from "react";
import { updateOrganization } from "@/modules/organizations/domain/organizations.actions";
import { useUserContext } from "@/contexts/user-context";
import { useRouter } from "next/navigation";
import { ORG_STATUS } from "@/modules/organizations/domain/organizations.constants";
import { Button } from "@mui/material";
import DoctorPresence from "@/modules/doctors/application/doctor.presence";
import { DoctorOrganization, doctorOrgMapper } from "@/modules/doctors/domain/doctor";
import DashboardModal from "@/components/Modal/Modal";
import { getDoctorsInOrg, updateDoctorOrgs } from "@/modules/doctors/domain/doctors.actions";
import { useAlertContext } from "@/contexts/alert-context";
import Spinner from "@/components/Spinner";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorClosed, faDoorOpen } from "@fortawesome/free-solid-svg-icons";

const OpenCloseClinic = () => {

    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [doctors, setDoctors] = useState<DoctorOrganization[]>([]);

    const {accessToken, organization} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();
    const {t} = useTranslation();
    const router = useRouter();

    const fetchDoctors = () => {
        setLoading(true);
        getDoctorsInOrg(accessToken).then( res => {
            let docOrgs:DoctorOrganization[] = [];
            res?.map( (docOrg) => { docOrgs.push(doctorOrgMapper(docOrg)) });
            setDoctors(docOrgs);
            setLoading(false);
        }).catch( () => {
            openSnackbarNotification(t('alert_msg.server_error'), "error");
            setLoading(false);
        })
    }

    const handleModal = () => {
        setModalOpen(true);
        fetchDoctors();
    }

    const openOrCloseClinic = (status:string) => {
        if (status === ORG_STATUS.open) {
            handleModal();
            return;
        }
        updateOrganization(accessToken, organization.id, { status: ORG_STATUS.close }).then( res => {
            router.push("/dashboard");
        })
        return;
    }

    const handleSubmit = async (selectedDoctorOrgIds:number[]) => {
        let isError = false;

        await updateDoctorOrgs(accessToken, selectedDoctorOrgIds, { status: "present" })
            .catch( () => {
                isError = true;
                openSnackbarNotification(t('alert_msg.server_error'), "error");
            })
        
        if (isError)
            return;

        updateOrganization(accessToken, organization.id, { status: ORG_STATUS.open }).then( res => {
            openSnackbarNotification(t('alert_msg.success'), "success");
            router.push("front-desk/queue-manager");
        });
    }

    return (
        <div className="relative flex flex-1 flex-col h-dvh p-6">
            <DashboardModal open={modalOpen} handleClose={() => setModalOpen(false)} 
                children={ loading ? <Spinner /> :
                    <>
                        <h4 className="text-title-md mb-3 font-bold text-black dark:text-white text-center h-fit">
                            {t("front_desk.select_present_doctor")}
                        </h4>
                        <DoctorPresence doctorOrgs={doctors} handleSubmit={handleSubmit} />
                    </>
                } title="" /> 
            <h4 className="text-title-md font-bold text-black dark:text-white text-center h-fit">
                {t("front_desk.welcome")}
            </h4>
            <div className="h-full">
                { organization.status == ORG_STATUS.close && 
                    <div className="flex justify-end mt-2 h-1/2 w-full">
                        <Button
                            onClick={() => openOrCloseClinic(ORG_STATUS.open)}
                            className="w-full inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                            <span>
                                <FontAwesomeIcon icon={faDoorOpen} size="2xl" width={20} height={20} />
                            </span>
                            <p className="text-5xl text-bold">{t("front_desk.open_clinic")}</p>
                        </Button>
                    </div>
                }
                { organization.status == ORG_STATUS.open && 
                    <div className="flex justify-end mt-2 h-1/2 w-full">
                        <Button
                            onClick={() => openOrCloseClinic(ORG_STATUS.close)}
                            className="w-full inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-10 lg:px-8 xl:px-10">
                            <span>
                                <FontAwesomeIcon icon={faDoorClosed} size="2xl" width={20} height={20} />
                            </span>
                            <p className="text-5xl text-bold">{t("front_desk.close_clinic")}</p>
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default OpenCloseClinic;