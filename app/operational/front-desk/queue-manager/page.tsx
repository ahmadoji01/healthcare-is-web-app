'use client';

import { PhysicalCheckup, defaultPhysicalCheckup, physicalCheckupMapper, physicalCheckupNoIDMapper } from "@/modules/physical-checkups/domain/physical-checkup";
import BoardSectionList from "./common/kanban/components/BoardSectionList";
import { DataModalProvider, useDataModalContext } from "@/contexts/data-modal-context";
import { createAPhysicalCheckup } from "@/modules/physical-checkups/domain/physical-checkup.actions";
import { useUserContext } from "@/contexts/user-context";
import { useAlertContext } from "@/contexts/alert-context";
import { createAMedicalRecord } from "@/modules/medical-records/domain/medical-records.actions";
import { defaultMedicalRecord, medicalRecordCreatorMapper, medicalRecordMapper, medicalRecordNoIDMapper } from "@/modules/medical-records/domain/medical-record";
import { updateVisit } from "@/modules/visits/domain/visits.actions";
import { useVisitContext } from "@/contexts/visit-context";
import { VISIT_STATUS } from "@/modules/visits/domain/visit.constants";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ORG_STATUS } from "@/modules/organizations/domain/organizations.constants";
import DashboardModal from "@/components/Modal/Modal";
import Link from "next/link";

const QueueManager = () => {

    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const {accessToken, user, organization} = useUserContext();
    const {activeVisit} = useVisitContext();
    const {openSnackbarNotification} = useAlertContext();
    const {handleModal} = useDataModalContext();
    const {t} = useTranslation();

    useEffect( () => {
        if (organization.status === ORG_STATUS.close) {
            setStatusModalOpen(true);
        } else {
            setStatusModalOpen(false);
        }
    }, [organization])

    const handleSubmit = async (checkup:PhysicalCheckup) => {
        let checkupNoID = physicalCheckupNoIDMapper(checkup, organization.id, checkup.patient.id);
        let checkupRes = defaultPhysicalCheckup;
        await createAPhysicalCheckup(accessToken, checkupNoID).then( res => {
            checkupRes = physicalCheckupMapper(res);
        }).catch( err => { openSnackbarNotification(t('alert_msg.server_error'), 'error'); return; });

        let medicalRecordCreator = medicalRecordCreatorMapper(defaultMedicalRecord, organization.id);
        let medicalRecordRes = defaultMedicalRecord;
        medicalRecordCreator.doctor = activeVisit.doctor.id;
        medicalRecordCreator.patient = checkup.patient.id;
        medicalRecordCreator.physical_checkup = checkupRes.id;
        await createAMedicalRecord(accessToken, medicalRecordCreator).then( res => {
            medicalRecordRes = medicalRecordMapper(res);
        }).catch( err => { openSnackbarNotification(t('alert_msg.server_error'), 'error'); return; });

        let visit = { medical_record: medicalRecordRes.id, status: VISIT_STATUS.to_be_examined };
        updateVisit(accessToken, activeVisit.id, visit).then( () => {
            handleModal(true, true);
            location.reload();
            openSnackbarNotification(t('alert_msg.success'), 'success');
            return;
        }).catch( err => { openSnackbarNotification(t('alert_msg.server_error'), 'error'); return; });
    }

    return (
        <div className="h-screen">
            <DashboardModal 
                open={statusModalOpen} 
                children={
                    <>
                        <h5 className="text-xl mt-6 mb-3 font-semibold text-black dark:text-white">
                            { t('front_desk.clinic_close_notif') }
                        </h5>
                        <Link
                            href="/operational/front-desk"
                            className="w-full inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                            <p className="text-5xl text-bold">{ t('front_desk.open_clinic') }</p>
                        </Link>
                    </>
                } 
                title={ t('clinic_close') } />
            <DataModalProvider>
                <BoardSectionList handleSubmit={handleSubmit} />
            </DataModalProvider>
        </div>
    );
}

export default QueueManager;