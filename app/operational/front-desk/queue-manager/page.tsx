'use client';

import { PhysicalCheckup, defaultPhysicalCheckup, physicalCheckupMapper, physicalCheckupNoIDMapper } from "@/modules/physical-checkups/domain/physical-checkup";
import BoardSectionList from "./common/kanban/components/BoardSectionList";
import { DataModalProvider, useDataModalContext } from "@/contexts/data-modal-context";
import { createAPhysicalCheckup } from "@/modules/physical-checkups/domain/physical-checkup.actions";
import { useUserContext } from "@/contexts/user-context";
import { useAlertContext } from "@/contexts/alert-context";
import { ALERT_MESSAGE } from "@/constants/alert";
import { createAMedicalRecord } from "@/modules/medical-records/domain/medical-records.actions";
import { defaultMedicalRecord, medicalRecordMapper, medicalRecordNoIDMapper } from "@/modules/medical-records/domain/medical-record";
import { updateVisit } from "@/modules/visits/domain/visits.actions";
import { useVisitContext } from "@/contexts/visit-context";

const QueueManager = () => {

    const {accessToken, user} = useUserContext();
    const {activeVisit} = useVisitContext();
    const {openSnackbarNotification} = useAlertContext();
    const {handleModal} = useDataModalContext();

    const handleSubmit = (checkup:PhysicalCheckup) => {
        let checkupNoID = physicalCheckupNoIDMapper(checkup, user.organizationID, checkup.patient.id);
        let checkupRes = defaultPhysicalCheckup;
        createAPhysicalCheckup(accessToken, checkupNoID).then( res => {
            checkupRes = physicalCheckupMapper(res);
        }).catch( err => { openSnackbarNotification(ALERT_MESSAGE.server_error, 'error'); console.log(err); return; });

        let medicalRecordNoID = medicalRecordNoIDMapper(defaultMedicalRecord, user.organizationID);
        let medicalRecordRes = defaultMedicalRecord;
        medicalRecordNoID.doctor = activeVisit.doctor;
        medicalRecordNoID.patient = checkup.patient;
        createAMedicalRecord(accessToken, medicalRecordNoID).then( res => {
            medicalRecordRes = medicalRecordMapper(res);
        }).catch( err => { openSnackbarNotification(ALERT_MESSAGE.server_error, 'error'); console.log(err); return; });

        let visit = { status: 'to_be_examined', medical_record: medicalRecordRes, doctor: activeVisit.doctor };
        updateVisit(accessToken, activeVisit.id, visit).then( () => {
            handleModal(true, true);
            location.reload();
            openSnackbarNotification(ALERT_MESSAGE.success, 'success');
            return;
        }).catch( err => { openSnackbarNotification(ALERT_MESSAGE.server_error, 'error'); console.log(err); return; });
    }

    return (
        <DataModalProvider>
            <BoardSectionList handleSubmit={handleSubmit} />
        </DataModalProvider>
    );
}

export default QueueManager;