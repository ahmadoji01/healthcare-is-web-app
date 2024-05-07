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

    const [organization, setOrganization] = useState(defaultOrganization);
    const [loading, setLoading] = useState(true);
    const {accessToken} = useUserContext();
    const router = useRouter();
    
    useEffect( () => {
        let interval = setInterval(async () => {
            getOrganization(accessToken, 1).then( res => {
                if (res?.length < 1) {
                    clearInterval(interval);
                    return;
                }
                setOrganization(organizationMapper(res[0]));
                setLoading(false);
                clearInterval(interval);
            });
        }, 100);

        return () => clearInterval(interval);
    }, [loading]);

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
                            className="inline-block align-middle w-full bg-meta-3 py-4 px-10 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                            Open Clinic
                        </Button>
                    </div>
                }
                { organization.status == ORG_STATUS.open && 
                    <div className="flex justify-end mt-2 h-1/2">
                        <Button
                            onClick={() => openOrCloseClinic(ORG_STATUS.close)}
                            className="flex-1 grow bg-primary py-4 px-10 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                            Close Clinic
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default OpenCloseClinic;