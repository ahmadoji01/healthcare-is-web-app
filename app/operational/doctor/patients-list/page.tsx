'use client';

import { useEffect, useRef, useState } from "react";
import PatientToExamineListTable from "../common/patient-to-examine-list-table";
import { Patient, patientMapper } from "@/modules/patients/domain/patient";
import { useUserContext } from "@/contexts/user-context";
import { getPatientsToBeExamined } from "@/modules/patients/domain/patients.actions";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useMedicalRecordContext } from "@/contexts/medical-record-context";
import { getTotalVisitsWithFilter, getVisitByStatus, getVisitsWithFilter } from "@/modules/visits/domain/visits.actions";
import { VISIT_STATUS } from "@/modules/visits/domain/visit.constants";
import { Visit, visitMapper } from "@/modules/visits/domain/visit";
import { useVisitContext } from "@/contexts/visit-context";
import { WebSocketClient } from "@directus/sdk";
import { subsOutputMapper } from "@/modules/websockets/domain/websocket";
import { WS_EVENT_TYPE } from "@/modules/websockets/domain/websocket.constants";
import { websocketClient } from "@/utils/request-handler";
import { statusFilter } from "@/modules/orders/domain/order.specifications";
import { useTranslations } from "next-intl";

const PatientsList = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [wsClient, setWSClient] = useState<WebSocketClient<any>>();
    const [patients, setPatients] = useState<Patient[]>([]);
    const [visits, setVisits] = useState<Visit[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const {accessToken, user} = useUserContext();
    const {setActiveMRID} = useMedicalRecordContext();
    const {setActiveVisit} = useVisitContext();
    const t = useTranslations();
    const filter = statusFilter(VISIT_STATUS.to_be_examined);
    const fields = ['id', 'patient.id', 'patient.name', 'patient.address', 'patient.id_card_number', 'doctor.id', 'doctor.name', 'doctor.specialization', 'medical_record.id'];
    const notifSound = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined" ? new Audio('/sounds/notification-sound.mp3') : undefined
    );

    const playNotificationSound = () => {
        notifSound.current?.play();
    }

    async function subsToVisit() { 
        if ( typeof(wsClient) === 'undefined')
            return;

        const { subscription } = await wsClient.subscribe('visits', {
            event: 'update',
            query: { fields: ['id', 'patient.id', 'patient.name', 'patient.address', 'patient.id_card_number', 'doctor.id', 'doctor.name', 'doctor.specialization', 'medical_record.id'] },
        });
    
        for await (const item of subscription) {
            let output = subsOutputMapper(item);
            if (output.event === WS_EVENT_TYPE.update && output.data.length > 0) {
                let visit = visitMapper(output.data[0]);
                
                if (visit.status !== VISIT_STATUS.to_be_examined)
                    return;

                let newVisits = [...visits];
                newVisits.push(visit);
                setVisits(newVisits);
                playNotificationSound();
            }
        }
    }

    useEffect( () => {
        let interval = setInterval(async () => {
            if (user.id !== "") {
                let client = websocketClient(accessToken);
                setWSClient(client);
                client.connect();
            }
            clearInterval(interval);
        }, 110);
        return () => clearInterval(interval);
    }, [user]);

    useEffect( () => {
        let interval = setInterval(async () => {
            if (typeof(wsClient) !== "undefined") {
                subsToVisit();
            }
            clearInterval(interval);
        }, 110);
        return () => clearInterval(interval);
    }, [wsClient]);

    useEffect( () => {
        if (!dataLoaded || visits.length == 0) {
            getVisitsWithFilter(accessToken, filter, '-date_updated', 1, fields)
                .then( res => {
                    let vits:Visit[] = [];
                    res?.map( (visit) => { vits.push(visitMapper(visit)); });
                    setVisits(vits);
                    setDataLoaded(true);
                });
            getTotalVisitsWithFilter(accessToken, filter)
                .then( res => { 
                    let total = res[0].count? parseInt(res[0].count) : 0;
                    let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
                    setTotalPages(pages);
                })
        }
    }, [user]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setDataLoaded(false);
        getVisitsWithFilter(accessToken, filter, '-date_updated', value, fields)
          .then( res => {
            let pats:Patient[] = [];
            res?.map( (patient) => { pats.push(patientMapper(patient)); });
            setPatients(pats);
            setDataLoaded(true);
          });
      };
      
    return (
        <>
            <h2 className="text-3xl font-extrabold text-black dark:text-white mb-2">{ t('patients_to_be_examined') }</h2>
            <PatientToExamineListTable visits={visits} totalPages={totalPages} handlePageChange={handlePageChange} setActiveMRID={setActiveMRID} setActiveVisit={setActiveVisit} />
        </>
    )
}

export default PatientsList;