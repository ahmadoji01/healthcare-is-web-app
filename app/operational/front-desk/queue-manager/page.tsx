'use client';

import { PhysicalCheckup, defaultPhysicalCheckup, physicalCheckupMapper, physicalCheckupNoIDMapper } from "@/modules/physical-checkups/domain/physical-checkup";
import BoardSectionList from "./common/kanban/components/BoardSectionList";
import { DataModalProvider, useDataModalContext } from "@/contexts/data-modal-context";
import { createAPhysicalCheckup } from "@/modules/physical-checkups/domain/physical-checkup.actions";
import { useUserContext } from "@/contexts/user-context";
import { useAlertContext } from "@/contexts/alert-context";
import { createAMedicalRecord, updateAMedicalRecord } from "@/modules/medical-records/domain/medical-records.actions";
import { defaultMedicalRecord, medicalRecordCreatorMapper, medicalRecordMapper } from "@/modules/medical-records/domain/medical-record";
import { deleteAVisit, updateVisit } from "@/modules/visits/domain/visits.actions";
import { useVisitContext } from "@/contexts/visit-context";
import { VISIT_STATUS } from "@/modules/visits/domain/visit.constants";
import { useEffect, useState } from "react";
import { ORG_STATUS } from "@/modules/organizations/domain/organizations.constants";
import DashboardModal from "@/components/Modal/Modal";
import Link from "next/link";
import { websocketClient } from "@/utils/request-handler";
import { WebSocketClient } from "@directus/sdk";
import { useFrontDeskContext } from "@/contexts/front-desk-context";
import { subsOutputMapper } from "@/modules/websockets/domain/websocket";
import { visitMapper } from "@/modules/visits/domain/visit";
import { WS_EVENT_TYPE } from "@/modules/websockets/domain/websocket.constants";
import { useTranslations } from "next-intl";
import QueueModal from "./common/Modal";
import PatientInfo from "./common/patient-info";
import PhysicalCheckupForm from "@/modules/physical-checkups/application/form/physical-checkup.form";
import DeleteModal from "@/components/Modal/DeleteModal";

const QueueManager = () => {

    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {accessToken, user, organization, wsClient} = useUserContext();
    const {activePatient, activeVisit} = useVisitContext();
    const {openSnackbarNotification} = useAlertContext();
    const {editModalOpen, deleteModalOpen, handleModal} = useDataModalContext();
    const {presentDoctors, notifyNewQueue} = useFrontDeskContext();
    const t = useTranslations();

    async function subsToVisit() {
        if ( typeof(wsClient) === 'undefined')
            return;

        const { subscription } = await wsClient.subscribe('visits', {
            event: 'create',
            query: { fields: ['id', 'date_updated', 'patient.id', 'patient.name', 'patient.id_card_number', 'patient.family_id_number', 'doctor.id', 'doctor.name', 'queue_number', 'doctor.specialization', 'status'] },
        });
    
        for await (const item of subscription) {
            let output = subsOutputMapper(item);
            if (output.event === WS_EVENT_TYPE.create && output.data.length > 0) {
                let visit = visitMapper(output.data[0]);
                notifyNewQueue(visit.doctor.id);
            }
        }
    }

    useEffect(() => {
        if (presentDoctors.length === 0)
            return;
        
        if (typeof(wsClient) === "undefined") 
            return;
        
        subsToVisit();
    }, [presentDoctors]);

    useEffect( () => {
        if (organization.status === ORG_STATUS.close && organization.id !== 0) {
            setStatusModalOpen(true);
        } else {
            setStatusModalOpen(false);
        }
    }, [organization]);

    const handleDelete = () => {
        deleteAVisit(accessToken, activeVisit.id)
        .then( () => {
            openSnackbarNotification(t('alert_msg.success'), "success");
            window.location.reload();
        }).catch( () => {
            openSnackbarNotification(t('alert_msg.server_error'), "error");
        })
    }

    const handleSubmit = async (checkup:PhysicalCheckup) => {
        setLoading(true);
        let isError = false;
        let checkupNoID = physicalCheckupNoIDMapper(checkup, organization.id, checkup.patient.id);
        let checkupRes = defaultPhysicalCheckup;
        await createAPhysicalCheckup(accessToken, checkupNoID).then( res => {
            checkupRes = physicalCheckupMapper(res);
            return;
        }).catch( err => { isError=true; return; });

        if (isError) {
            setLoading(false);
            openSnackbarNotification(t('alert_msg.server_error'), 'error');
            return;
        }

        let medicalRecordCreator = medicalRecordCreatorMapper(defaultMedicalRecord, [], organization.id);
        let medicalRecordRes = defaultMedicalRecord;
        medicalRecordCreator.doctor = activeVisit.doctor.id;
        medicalRecordCreator.patient = checkup.patient.id;
        medicalRecordCreator.physical_checkup = checkupRes.id;
        await updateAMedicalRecord(accessToken, activeVisit.medical_record.id, { doctor: activeVisit.doctor.id, patient: checkup.patient.id, physical_checkup: checkupRes.id }).then( res => {
            medicalRecordRes = medicalRecordMapper(res);
        }).catch( err => { isError=true; return; });

        if (isError) {
            setLoading(false);
            openSnackbarNotification(t('alert_msg.server_error'), 'error');
            return;
        }

        let visit = { medical_record: medicalRecordRes.id, status: VISIT_STATUS.to_be_examined };
        updateVisit(accessToken, activeVisit.id, visit).then( () => {
            handleModal(true, true);
            window.location.reload();
            openSnackbarNotification(t('alert_msg.success'), 'success');
            setLoading(false);
            return;
        }).catch( err => { setLoading(false); openSnackbarNotification(t('alert_msg.server_error'), 'error'); return; });
    }

    return (
        <div className="min-h-screen h-full">
            <QueueModal open={editModalOpen} handleClose={ () => handleModal(true, true) } title={t("front_desk.initial_checkup")} queueNumber={activeVisit.queue_number} patientName={activePatient.name}>
                <>
                    <PatientInfo patient={activePatient} />
                    <PhysicalCheckupForm loading={loading} patient={activePatient} initCheckup={defaultPhysicalCheckup} handleSubmit={handleSubmit} />
                </>
            </QueueModal>
            <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <DeleteModal name={t("this_visit")} handleDelete={handleDelete} handleClose={ () => handleModal(true, false)} /> } title="" />
            
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
            <BoardSectionList />
        </div>
    );
}

export default QueueManager;