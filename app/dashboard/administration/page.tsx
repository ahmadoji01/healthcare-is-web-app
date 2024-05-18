'use client';

import { useUserContext } from "@/contexts/user-context";
import AdministrationForm from "@/modules/organizations/application/form/administration.form";
import { Organization } from "@/modules/organizations/domain/organization";

const AdministrationPage = () => {

    const {organization, setOrganization} = useUserContext();

    const handleSubmit = (organization:Organization) => {
        console.log(organization);
    }

    return (
        <>
            <AdministrationForm initOrg={organization} handleSubmit={handleSubmit} />
        </>
    )

}

export default AdministrationPage;