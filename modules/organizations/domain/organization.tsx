import { Patient } from "@/modules/patients/domain/patient"
import { PhysicalCheckup } from "@/modules/physical-checkups/domain/physical-checkup"
import { Treatment } from "@/modules/treatments/domain/treatment"
import Medication from "./medication"
import { Doctor } from "@/modules/doctors/domain/doctor"
import { ORG_STATUS } from "./organizations.constants"

export interface Organization {
    id: number,
    name: string,
    type: string,
    subscription_type: string,
    subscription_expiry: Date,
    domain_name: string,
    slug: string,
    logo: string,
    status: string,
}

export const defaultOrganization:Organization = {
    id: 0,
    name: "",
    type: "",
    subscription_type: "",
    subscription_expiry: new Date,
    domain_name: "",
    slug: "",
    logo: "",
    status: ORG_STATUS.close,
}

export function organizationMapper(res:Record<string,any>) {
    let organization = defaultOrganization;
    organization = { 
        id: res.id,
        name: res.name,
        type: res.type? res.type : "",
        subscription_type: res.subscription_type,
        subscription_expiry: new Date,
        domain_name: res.domain_name? res.domain_name : "",
        slug: res.slug? res.slug : "",
        logo: res.logo? res.logo : "",
        status: res.status? res.status : ORG_STATUS.close,
    }
    return organization;
}

export type OrganizationPatcher = Omit<Organization, 'subscription_type'|'subscription_expiry'|'domain_name'|'slug'>;
export function organizationPatcherMapper(organization:Organization) {

    let organizationPatcher: OrganizationPatcher = {
        id: organization.id,
        name: organization.name,
        type: organization.type? organization.type : "",
        logo: organization.logo? organization.logo : "",
        status: organization.status? organization.status : ORG_STATUS.close,
    }
    return organizationPatcher;
}