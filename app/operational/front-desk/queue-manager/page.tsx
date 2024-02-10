'use client';

import { PhysicalCheckup, defaultPhysicalCheckup, physicalCheckupMapper, physicalCheckupNoIDMapper } from "@/modules/physical-checkups/domain/physical-checkup";
import BoardSectionList from "./common/kanban/components/BoardSectionList";
import { DataModalProvider, useDataModalContext } from "@/contexts/data-modal-context";
import { createAPhysicalCheckup } from "@/modules/physical-checkups/domain/physical-checkup.actions";
import { useUserContext } from "@/contexts/user-context";
import { useAlertContext } from "@/contexts/alert-context";
import { ALERT_MESSAGE, ALERT_STATUS } from "@/constants/alert";
import { createAMedicalRecord } from "@/modules/medical-records/domain/medical-records.actions";
import { defaultMedicalRecord, medicalRecordMapper, medicalRecordNoIDMapper } from "@/modules/medical-records/domain/medical-record";
import { updateVisit } from "@/modules/visits/domain/visits.actions";

const QueueManager = () => {

    const {accessToken, user} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();
    const {handleModal} = useDataModalContext();

    const handleSubmit = (checkup:PhysicalCheckup) => {
        let checkupNoID = physicalCheckupNoIDMapper(checkup, user.organizationID);
        let checkupRes = defaultPhysicalCheckup;
        createAPhysicalCheckup(accessToken, checkupNoID).then( res => {
            checkupRes = physicalCheckupMapper(res);
        }).catch( err => { openSnackbarNotification(ALERT_MESSAGE.server_error, 'error'); return; });

        let medicalRecordNoID = medicalRecordNoIDMapper(defaultMedicalRecord, user.organizationID);
        let medicalRecordRes = defaultMedicalRecord;
        createAMedicalRecord(accessToken, medicalRecordNoID).then( res => {
            medicalRecordRes = medicalRecordMapper(res);
        }).catch( err => { openSnackbarNotification(ALERT_MESSAGE.server_error, 'error'); return; });

        let visit = { status: 'to_be_examined' };
        updateVisit(accessToken, visit).then( () => {
            openSnackbarNotification(ALERT_MESSAGE.success, 'success');
            handleModal(true, true);
            return;
        }).catch( err => { openSnackbarNotification(ALERT_MESSAGE.server_error, 'error'); return; });
    }

    return (
        <DataModalProvider>
            <BoardSectionList handleSubmit={handleSubmit} />
        </DataModalProvider>
    );
}

export default QueueManager;