'use client';

import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Organization, defaultOrganization, organizationMapper } from "@/modules/organizations/domain/organization";
import { getOrganization, updateOrganization } from "@/modules/organizations/domain/organizations.actions";
import { useUserContext } from "@/contexts/user-context";
import { useRouter } from "next/navigation";
import { ORG_STATUS } from "@/modules/organizations/domain/organizations.constants";
import { Button } from "@mui/material";

const OpenCloseClinic = () => {

    const [loading, setLoading] = useState(true);
    const {accessToken, organization} = useUserContext();
    const router = useRouter();

    const openOrCloseClinic = (status:string) => {
        if (status === ORG_STATUS.open) {
            updateOrganization(accessToken, organization.id, { status: ORG_STATUS.open }).then( res => {
                router.push("front-desk/queue-manager");
            })
            return;
        }
        updateOrganization(accessToken, organization.id, { status: ORG_STATUS.close }).then( res => {
            router.push("/dashboard");
        })
        return;
    }

    return (
        <div className="relative flex flex-1 flex-col h-dvh p-6">
            <h4 className="text-title-md font-bold text-black dark:text-white text-center h-fit">
                Welcome, click the button below to open the clinic
            </h4>
            <div className="h-full">
                { organization.status == ORG_STATUS.close && 
                    <div className="flex justify-end mt-2 h-1/2">
                        <Button
                            onClick={() => openOrCloseClinic(ORG_STATUS.open)}
                            className="inline-block align-middle w-full bg-meta-3 py-4 px-10 text-center text-white lg:px-8 xl:px-10">
                            <p className="text-3xl text-bold">Open Clinic</p>
                        </Button>
                    </div>
                }
                { organization.status == ORG_STATUS.open && 
                    <div className="flex justify-end mt-2 h-1/2">
                        <Button
                            onClick={() => openOrCloseClinic(ORG_STATUS.close)}
                            className="flex-1 grow bg-primary py-4 px-10 text-center text-white lg:px-8 xl:px-10">
                            <p className="text-3xl text-bold">Close Clinic</p>
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default OpenCloseClinic;