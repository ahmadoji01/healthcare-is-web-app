'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import PatientForm from "@/modules/patients/application/form/patient.form";
import { Patient, defaultPatient, patientNoIDMapper } from "@/modules/patients/domain/patient";
import { createAPatient, patientExistChecker } from "@/modules/patients/domain/patients.actions";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { useState } from "react";

const PatientCreatePage = () => {
  const [patient, setPatient] = useState(defaultPatient);
  const {accessToken, organization} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const t = useTranslations();
  const router = useRouter();

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
      openSnackbarNotification(t("alert_msg.data_exists"), "success");
      return;
    }

    let patientNoID = patientNoIDMapper(patient, organization.id);
    await createAPatient(accessToken, patientNoID).then( () => {
      openSnackbarNotification(t("alert_msg.success"), "success");
      router.push('/dashboard/patients');
      return;
    }).catch( err => {
      openSnackbarNotification(t("alert_msg.server_error"), "error");
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
