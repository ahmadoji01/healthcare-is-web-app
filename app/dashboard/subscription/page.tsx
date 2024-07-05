'use client';

import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import AdministrationForm from "@/modules/organizations/application/form/administration.form";
import { Organization } from "@/modules/organizations/domain/organization";
import { updateOrganization, updateSubscription, uploadClinicLogo } from "@/modules/organizations/domain/organizations.actions";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";

const SubscriptionPage = () => {

    const {organization, setOrganization, accessToken} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();
    const t = useTranslations();

    const handleSubmit = (organization:Organization) => {
      updateSubscription(accessToken, organization.id)
        .then(res => console.log(res))
        .catch(err => console.log(err));
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
            openSnackbarNotification(t("alert_msg.server_error"), "error");
          });
        await updateOrganization(accessToken, organization.id, { logo: logo })
          .then( res => { 
            openSnackbarNotification(t("alert_msg.success"), "success");
            setOrganization({ ...organization, logo: { id: logo.id, filename_download: logo.filename_download } })
          })
          .catch( err => {
            openSnackbarNotification(t("alert_msg.server_error"), "error");
          });
      };

    return (
        <>
            <AdministrationForm initOrg={organization} handleSubmit={handleSubmit} handleFileChange={handleFileChange} />
        </>
    )

}

export default SubscriptionPage;