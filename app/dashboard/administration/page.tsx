'use client';

import { ALERT_MESSAGE } from "@/constants/alert";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import AdministrationForm from "@/modules/organizations/application/form/administration.form";
import { Organization, defaultOrganization, organizationMapper } from "@/modules/organizations/domain/organization";
import { getOrganization, updateOrganization, uploadClinicLogo } from "@/modules/organizations/domain/organizations.actions";
import { ChangeEvent, useEffect, useState } from "react";

const AdministrationPage = () => {

    const {organization, setOrganization, accessToken} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();

    const handleSubmit = (organization:Organization) => {
        console.log(organization);
    }

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
          return;
        }
    
        let file = e.target.files[0];
        let data = new FormData();
        data.append('file-1', file, file.name);
        let logo = {};
        await uploadClinicLogo(accessToken, data)
          .then( res => logo = res)
          .catch( err => {
            openSnackbarNotification(ALERT_MESSAGE.server_error, "error");
          });
        await updateOrganization(accessToken, organization.id, { logo: logo })
          .then( res => { 
            openSnackbarNotification(ALERT_MESSAGE.success, "success");
            setOrganization({ ...organization, logo: { id: logo.id, filename_download: logo.filename_download } })
          })
          .catch( err => {
            openSnackbarNotification(ALERT_MESSAGE.server_error, "error");
          });
      };

    return (
        <>
            <AdministrationForm initOrg={organization} handleSubmit={handleSubmit} handleFileChange={handleFileChange} />
        </>
    )

}

export default AdministrationPage;