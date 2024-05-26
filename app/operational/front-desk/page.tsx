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
import { Doctor, DoctorOrganization, doctorMapper, doctorOrgMapper } from "@/modules/doctors/domain/doctor";
import DashboardModal from "@/components/Modal/Modal";
import { getAllDoctors, getDoctorsInOrg, updateDoctorOrgsStatus } from "@/modules/doctors/domain/doctors.actions";
import { useAlertContext } from "@/contexts/alert-context";
import { ALERT_MESSAGE } from "@/constants/alert";
import Spinner from "@/components/Spinner";

const OpenCloseClinic = () => {

    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [doctors, setDoctors] = useState<DoctorOrganization[]>([]);

    const {accessToken, organization} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();
    const router = useRouter();

    const fetchDoctors = () => {
        setLoading(true);
        getDoctorsInOrg(accessToken).then( res => {
            let docOrgs:DoctorOrganization[] = [];
            res?.map( (docOrg) => { docOrgs.push(doctorOrgMapper(docOrg)) });
            setDoctors(docOrgs);
            setLoading(false);
        }).catch( () => {
            openSnackbarNotification(ALERT_MESSAGE.server_error, "error");
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

        await updateDoctorOrgsStatus(accessToken, selectedDoctorOrgIds, { status: "present" })
            .catch( () => {
                isError = true;
                openSnackbarNotification(ALERT_MESSAGE.server_error, "error");
            })
        
        if (isError)
            return;

        updateOrganization(accessToken, organization.id, { status: ORG_STATUS.open }).then( res => {
            openSnackbarNotification(ALERT_MESSAGE.success, "success");
            router.push("front-desk/queue-manager");
        });
    }

    return (
        <div className="relative flex flex-1 flex-col h-dvh p-6">
            <DashboardModal open={modalOpen} handleClose={() => setModalOpen(false)} 
                children={ loading ? <Spinner /> :
                    <>
                        <h4 className="text-title-md mb-3 font-bold text-black dark:text-white text-center h-fit">
                            Select the following doctors that are present
                        </h4>
                        <DoctorPresence doctorOrgs={doctors} handleSubmit={handleSubmit} />
                    </>
                } title="" /> 
            <h4 className="text-title-md font-bold text-black dark:text-white text-center h-fit">
                Welcome, click the button below to open the clinic
            </h4>
            <div className="h-full">
                { organization.status == ORG_STATUS.close && 
                    <div className="flex justify-end mt-2 h-1/2">
                        <Button
                            onClick={() => openOrCloseClinic(ORG_STATUS.open)}
                            className="inline-block align-middle w-full bg-meta-3 py-4 px-10 text-center text-white lg:px-8 xl:px-10">
                            <p className="text-3xl text-bold">Open Clinic</p>
                        </Button>
                    </div>
                }
                { organization.status == ORG_STATUS.open && 
                    <div className="flex justify-end mt-2 h-1/2">
                        <Button
                            onClick={() => openOrCloseClinic(ORG_STATUS.close)}
                            className="flex-1 grow bg-primary py-4 px-10 text-center text-white lg:px-8 xl:px-10">
                            <p className="text-3xl text-bold">Close Clinic</p>
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default OpenCloseClinic;