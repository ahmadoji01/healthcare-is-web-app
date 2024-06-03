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

const QueueManager = () => {

    const {accessToken, user, organization} = useUserContext();
    const {activeVisit} = useVisitContext();
    const {openSnackbarNotification} = useAlertContext();
    const {handleModal} = useDataModalContext();
    const {t} = useTranslation();

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
            <DataModalProvider>
                <BoardSectionList handleSubmit={handleSubmit} />
            </DataModalProvider>
        </div>
    );
}

export default QueueManager;