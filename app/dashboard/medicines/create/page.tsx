'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { ALERT_MESSAGE } from "@/constants/alert";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import MedicineForm from "@/modules/medicines/application/form/medicine.form";
import { Medicine, defaultMedicine, medicineNoIDMapper } from "@/modules/medicines/domain/medicine";
import { createAMedicine, medicineExistChecker } from "@/modules/medicines/domain/medicines.actions";
import TreatmentForm from "@/modules/treatments/application/form/treatment.form";
import { Treatment, defaultTreatment, treatmentCreatorMapper } from "@/modules/treatments/domain/treatment";
import { createATreatment, treatmentExistChecker } from "@/modules/treatments/domain/treatments.actions";

import { useState } from "react";

const TreatmentCreatePage = () => {
  const [medicine, setMedicine] = useState(defaultMedicine);
  const {accessToken, user} = useUserContext();
  const {setOpen, setMessage, setStatus} = useAlertContext();

  const handleSubmit = async (medicine:Medicine) => {
    let medicineExists = false;
    await medicineExistChecker(accessToken, medicine.name)
      .then( res => {
        if (res.length != 0) {
          medicineExists = true;
          return;
        }
      });
    
    if (medicineExists) { 
      setOpen(true);
      setMessage(ALERT_MESSAGE.dataExists('medicine'));
      setStatus("error");
      return;
    }

    let medicineNoID = medicineNoIDMapper(medicine, user.organizationID);
    await createAMedicine(accessToken, medicineNoID).then( () => {
      setOpen(true);
      setMessage("Success! Medicine has been created!");
      setStatus("success");
      window.location.href = '/dashboard/medicines'
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
      <Breadcrumb pageName="Add Medicine" />
      <MedicineForm handleSubmit={handleSubmit} initMedicine={medicine} />
    </>
  );
};

export default TreatmentCreatePage;