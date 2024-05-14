'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { ALERT_MESSAGE } from "@/constants/alert";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import TreatmentForm from "@/modules/treatments/application/form/treatment.form";
import { Treatment, defaultTreatment, treatmentCreatorMapper } from "@/modules/treatments/domain/treatment";
import { createATreatment, treatmentExistChecker } from "@/modules/treatments/domain/treatments.actions";

import { useState } from "react";

const TreatmentCreatePage = () => {
  const [treatment, setTreatment] = useState(defaultTreatment);
  const {accessToken, user} = useUserContext();
  const {setOpen, setMessage, setStatus} = useAlertContext();

  const handleSubmit = async (treatment:Treatment) => {
    let treatmentExists = false;
    await treatmentExistChecker(accessToken, treatment.code)
      .then( res => {
        if (res.length != 0) {
          treatmentExists = true;
          return;
        }
      });
    
    if (treatmentExists) { 
      setOpen(true);
      setMessage(ALERT_MESSAGE.dataExists('treatment'));
      setStatus("error");
      return;
    }

    let treatmentNoID = treatmentCreatorMapper(treatment, user.organizationID);
    await createATreatment(accessToken, treatmentNoID).then( () => {
      setOpen(true);
      setMessage("Success! Treatment has been created!");
      setStatus("success");
      window.location.href = '/dashboard/treatments'
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
      <Breadcrumb pageName="Add Treatment" />
      <TreatmentForm handleSubmit={handleSubmit} initTreatment={treatment} />
    </>
  );
};

export default TreatmentCreatePage;