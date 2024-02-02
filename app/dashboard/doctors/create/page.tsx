'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import DoctorForm from "@/modules/doctors/application/form/doctor.form";
import { Doctor, defaultDoctor, doctorNoIDMapper } from "@/modules/doctors/domain/doctor";
import { createADoctor, doctorExistChecker } from "@/modules/doctors/domain/doctors.actions";
import PatientForm from "@/modules/patients/application/form/patient.form";
import { Patient, defaultPatient, patientNoIDMapper } from "@/modules/patients/domain/patient";
import { createAPatient, patientExistChecker } from "@/modules/patients/domain/patients.actions";

import { useState } from "react";

const DoctorCreatePage = () => {
  const [patient, setPatient] = useState(defaultPatient);
  const [doctor, setDoctor] = useState(defaultDoctor);
  const {accessToken, user} = useUserContext();
  const {setOpen, setMessage, setStatus} = useAlertContext();

  const handleSubmit = async (doctor:Doctor) => {
    let doctorExists = false;
    await doctorExistChecker(accessToken, doctor.license_number)
      .then( res => {
        if (res.length != 0) {
          doctorExists = true;
          return;
        }
      });
    
    if (doctorExists) { 
      setOpen(true);
      setMessage("Doctor already exists. Click here to see this doctor's data");
      setStatus("error");
      return;
    }

    let doctorNoID = doctorNoIDMapper(doctor, user.organizationID);
    await createADoctor(accessToken, doctorNoID).then( () => {
      setOpen(true);
      setMessage("Success! Doctor has been created!");
      setStatus("success");
      window.location.href = '/dashboard/doctors'
      return;
    }).catch( err => {
      setOpen(true);
      setMessage("Oops! Something went wrong. Try again!");
      setStatus("error");
      return;
    })
  }

  return (
    <>
      <Breadcrumb pageName="Add Patient" />
      <DoctorForm handleSubmit={handleSubmit} initDoctor={doctor} />
    </>
  );
};

export default DoctorCreatePage;