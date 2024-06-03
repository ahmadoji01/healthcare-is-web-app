'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import TreatmentForm from "@/modules/treatments/application/form/treatment.form";
import { Treatment, defaultTreatment, treatmentCreatorMapper } from "@/modules/treatments/domain/treatment";
import { createATreatment, treatmentExistChecker } from "@/modules/treatments/domain/treatments.actions";

import { useState } from "react";
import { useTranslation } from "react-i18next";

const TreatmentCreatePage = () => {
  const [treatment, setTreatment] = useState(defaultTreatment);
  const {accessToken, organization} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const {t} = useTranslation();

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
      openSnackbarNotification(t('alert_msg.data_exists'), "error");
      return;
    }

    let treatmentNoID = treatmentCreatorMapper(treatment, organization.id);
    await createATreatment(accessToken, treatmentNoID).then( () => {
      openSnackbarNotification(t('alert_msg.success'), "success");
      window.location.href = '/dashboard/treatments'
      return;
    }).catch( err => {
      openSnackbarNotification(t('alert_msg.server_error'), "error");
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