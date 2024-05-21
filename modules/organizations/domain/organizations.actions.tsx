import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler"
import { createItem, readItems, updateItem, uploadFiles, withToken } from "@directus/sdk";
import { ORG_STATUS } from "./organizations.constants";
import Link from "next/link";
import { Chip } from "@mui/material";

export const getOrganization = (token:string, page:number) => directusClient.request( withToken(token, readItems('organizations', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const updateOrganization = (token:string, id:number, data:object) => directusClient.request( withToken(token, updateItem('organizations', id, data)));
export const uploadClinicLogo = (token:string, data:FormData) => directusClient.request(withToken(token, uploadFiles(data)));

export const displayStatus = (status:string) => {
    switch (status) {
        case ORG_STATUS.open:
            return "Open";
        case ORG_STATUS.close:
            return "Close";
        default:
            return "";
    }

}

const handleStatusChip = (status:string) => {
    if (status === ORG_STATUS.open) {
      return <Link href="/operational/front-desk"><Chip label="Open" color="primary" /></Link>
    }
    if (status === ORG_STATUS.close) {
      return <Link href="/operational/front-desk"><Chip label="Close" color="error" /></Link>
    }
    return <Link href="/operational/front-desk"><Chip label="Loading..." color="warning" /></Link>
}