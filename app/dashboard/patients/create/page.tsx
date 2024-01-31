'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import PatientForm from "@/modules/patients/application/form/patient.form";
import { Patient, defaultPatient } from "@/modules/patients/domain/patient";
import { createAPatient, patientExistChecker } from "@/modules/patients/domain/patients.actions";

import { useState } from "react";

//export const metadata: Metadata = {
//  title: "Form Elements Page | Next.js E-commerce Dashboard Template",
//  description: "This is Form Elements page for TailAdmin Next.js",
  // other metadata
//};

const PatientCreatePage = () => {
  const [patient, setPatient] = useState(defaultPatient);
  const {accessToken} = useUserContext();
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
      setMessage("Patient already exists. Click here to see this patient's data");
      return;
    }

    createAPatient(accessToken, patient).then( () => {
      setOpen(true);
      setMessage("A patient has successfully been created!")
      setStatus("success");
      window.location.href = '/dashboard/patients';
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
