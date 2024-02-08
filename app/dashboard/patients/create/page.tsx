'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { ALERT_MESSAGE } from "@/constants/alert";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import PatientForm from "@/modules/patients/application/form/patient.form";
import { Patient, defaultPatient, patientNoIDMapper } from "@/modules/patients/domain/patient";
import { createAPatient, patientExistChecker } from "@/modules/patients/domain/patients.actions";

import { useState } from "react";

const PatientCreatePage = () => {
  const [patient, setPatient] = useState(defaultPatient);
  const {accessToken, user} = useUserContext();
  const {setOpen, setMessage, setStatus} = useAlertContext();

  const handleSubmit = async (patient:Patient) => {
    let patientExists = false;
    await patientExistChecker(accessToken, patient.id_card_number, patient.family_id_number ? patient.family_id_number : '')
      .then( res => {
        if (res.length != 0) {
          patientExists = true;
          return;
        }
      });
    
    if (patientExists) { 
      setOpen(true);
      setMessage(ALERT_MESSAGE.dataExists('patient'));
      setStatus("error");
      return;
    }

    let patientNoID = patientNoIDMapper(patient, user.organizationID);
    await createAPatient(accessToken, patientNoID).then( () => {
      setOpen(true);
      setMessage("Success! Patient has been created!");
      setStatus("success");
      window.location.href = '/dashboard/patients'
      return;
    }).catch( err => {
      setOpen(true);
      setMessage(ALERT_MESSAGE.server_error);
      setStatus("error");
      return;
    })
  }

  return (
    <>
      <Breadcrumb pageName="Add Patient" />
      <PatientForm handleSubmit={handleSubmit} initPatient={patient} />
    </>
  );
};

export default PatientCreatePage;
