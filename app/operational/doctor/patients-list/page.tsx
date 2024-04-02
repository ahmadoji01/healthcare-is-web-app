'use client';

import { useEffect, useState } from "react";
import PatientToExamineListTable from "../common/patient-to-examine-list-table";
import { Patient, patientMapper } from "@/modules/patients/domain/patient";
import { useUserContext } from "@/contexts/user-context";
import { getPatientsToBeExamined, getTotalPatients } from "@/modules/patients/domain/patients.actions";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useMedicalRecordContext } from "@/contexts/medical-record-context";
import { getTotalVisits, getVisitByStatus } from "@/modules/visits/domain/visits.actions";
import { VISIT_STATUS } from "@/modules/visits/domain/visit.constants";
import { Visit, visitMapper } from "@/modules/visits/domain/visit";

const PatientsList = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [visits, setVisits] = useState<Visit[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const {accessToken} = useUserContext();
    const {activeMedicalRecord, setActiveMedicalRecord} = useMedicalRecordContext();

    useEffect( () => {
        if (!dataLoaded || patients.length == 0) {
            getVisitByStatus(accessToken, VISIT_STATUS.to_be_examined)
                .then( res => {
                    let vits:Visit[] = [];
                    res?.map( (visit) => { vits.push(visitMapper(visit)); });
                    setVisits(vits);
                    setDataLoaded(true);
                });
            getPatientsToBeExamined(accessToken, 1)
                .then( res => {
                    let pats:Patient[] = [];
                    res?.map( (patient) => { pats.push(patientMapper(patient)); });
                    setPatients(pats);
                    setDataLoaded(true);
                });
            getTotalVisits(accessToken)
                .then( res => { 
                    let total = res[0].count? parseInt(res[0].count) : 0;
                    let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
                    setTotalPages(pages);
                })
        }
    });

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setDataLoaded(false);
        getPatientsToBeExamined(accessToken, value)
          .then( res => {
            let pats:Patient[] = [];
            res?.map( (patient) => { pats.push(patientMapper(patient)); });
            setPatients(pats);
            setDataLoaded(true);
          });
      };
      
    return (
        <>
            <h2 className="text-3xl font-extrabold text-black dark:text-white mb-2">Patients to be Examined</h2>
            <PatientToExamineListTable visits={visits} totalPages={totalPages} handlePageChange={handlePageChange} setActiveMedicalRecord={setActiveMedicalRecord} />
        </>
    )
}

export default PatientsList;