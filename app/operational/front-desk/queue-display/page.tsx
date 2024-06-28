'use client';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useFrontDeskContext } from '@/contexts/front-desk-context';
import { DoctorName } from '@/utils/doctor-name-format';
import { useVisitContext } from '@/contexts/visit-context';
import { Visit, visitMapper } from '@/modules/visits/domain/visit';
import { doctorIDEquals, filterVisitsArray, statusEquals } from '@/modules/visits/domain/visit.specifications';
import { VISIT_STATUS } from '@/modules/visits/domain/visit.constants';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { WebSocketClient } from '@directus/sdk';
import { subsOutputMapper } from '@/modules/websockets/domain/websocket';
import { WS_EVENT_TYPE } from '@/modules/websockets/domain/websocket.constants';
import { useUserContext } from '@/contexts/user-context';
import { websocketClient } from '@/utils/request-handler';
import QueueCard from './common/queue-card';
import { getVisitsWithFilter } from '@/modules/visits/domain/visits.actions';
import { useAlertContext } from '@/contexts/alert-context';
import DarkModeSwitcher from '@/components/Header/DarkModeSwitcher';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      </div>
    );
}
  
function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const QueueDisplay = () => {

    const [value, setValue] = useState(0);
    const {t} = useTranslation();
    const searchParams = useSearchParams();
    const { presentDoctors } = useFrontDeskContext();
    const { doctorVisits, handleDoctorVisits } = useVisitContext();
    const {openSnackbarNotification} = useAlertContext();
    const { user, accessToken } = useUserContext();
    const [toBeExaminedVisit, setToBeExaminedVisit] = useState<Visit[]>([]);
    const [waitingVisits, setWaitingVisits] = useState<Visit[]>([]);
    const [wsClient, setWSClient] = useState<WebSocketClient<any>>();
    const [nextTab, setNextTab] = useState(0);
    const router = useRouter();

    const fetchVisits = async () => {
        if (presentDoctors.length <= 0) {
            return;
        }

        let vits:Visit[] = [];
        let filter = { _and: [ doctorIDEquals(presentDoctors[value].id), { _or: [statusEquals(VISIT_STATUS.waiting), statusEquals(VISIT_STATUS.temporary_leave), statusEquals(VISIT_STATUS.to_be_examined)] } ] };
        await getVisitsWithFilter(accessToken, filter, 'date_created', 1).then( res => {
            res?.map( (visit) => { vits.push(visitMapper(visit)); });
        }).catch( err => openSnackbarNotification(t('alert_msg.server_error'), 'error'));

        let toBeExamined = filterVisitsArray(vits, VISIT_STATUS.to_be_examined);
        let waiting = filterVisitsArray(vits, VISIT_STATUS.waiting);
        let tempLeave = filterVisitsArray(vits, VISIT_STATUS.temporary_leave);
        setToBeExaminedVisit(toBeExamined);
        setWaitingVisits(waiting.concat(tempLeave));
    }

    async function subsToVisit() { 
        if ( typeof(wsClient) === 'undefined')
            return;

        let subs = [];
        let { subscription } = await wsClient.subscribe('visits', {
            event: 'create',
            query: { fields: ['queue_number','patient.name','doctor.id','status'] },
        });
        subs.push(subscription);
    
        for await (const item of subscription) {
            let output = subsOutputMapper(item);
            if (output.event === WS_EVENT_TYPE.update && output.data.length > 0) {
                let visit = visitMapper(output.data[0]);
                
                if (visit.status !== VISIT_STATUS.to_be_examined 
                    || !waitingVisits.some( v => v.id === visit.id )
                    || presentDoctors[value].id !== visit.doctor.id) {
                    return;
                }

                let index = waitingVisits.findIndex( v => v.id === visit.id );
                let newVisits = [...waitingVisits];
                newVisits.splice(index, 1);
                setWaitingVisits(newVisits);

                newVisits = [visit];
                setToBeExaminedVisit(newVisits);
            }
            if (output.event === WS_EVENT_TYPE.create && output.data.length > 0) {
                let visit = visitMapper(output.data[0]);
                
                if ((visit.status !== VISIT_STATUS.waiting && visit.status !== VISIT_STATUS.temporary_leave) 
                    || presentDoctors[value].id !== visit.doctor.id) {
                    return;
                }

                let newVisits = [...waitingVisits];
                newVisits.push(visit);
                setWaitingVisits(newVisits);
            }
        }
    }

    useEffect( () => {
        let interval = setInterval(async () => {
            if (user.id !== "") {
                let client = websocketClient(accessToken);
                setWSClient(client);
                client.connect();
            }
            clearInterval(interval);
        }, 110);
        return () => clearInterval(interval);
    }, [user]);

    useEffect( () => {
        let interval = setInterval(async () => {
            if (typeof(wsClient) !== "undefined") {
                subsToVisit();
            }
            clearInterval(interval);
        }, 110);
        return () => clearInterval(interval);
    }, [wsClient]);

    useEffect( () => {
        const activeTab = searchParams.get('activetab');

        if (activeTab === null) {
            setValue(0);
            return;
        }
        setValue(parseInt(activeTab));
        return;
    }, [searchParams])

    useEffect( () => {
        fetchVisits();
        if (value+1 >= presentDoctors.length) {
            setNextTab(0);
        } else {
            setNextTab(value+1);
        }
    }, [presentDoctors]);

    useEffect( () => {
        setInterval(function () {
            onTabClick(nextTab);
        }, 120000);
    }, [nextTab]);

    const onTabClick = (index:number) => {
        window.location.href = '/operational/front-desk/queue-display?activetab=' + index;
    }

    return (
        <>
            <div className="fixed top-[1%] right-[1%]">
                <DarkModeSwitcher />
            </div>
            <Box>
                <Tabs value={value} aria-label="basic tabs example" centered style={{ fontSize: 24 }}>
                    { presentDoctors.map( (doctor, index) => 
                        <Tab onClick={() => onTabClick(index)} label={ DoctorName(doctor.name, doctor.specialization) } {...a11yProps(index)} />
                    )}
                </Tabs>
            </Box>
            
            { presentDoctors.map( (doctor, index) =>          
                <CustomTabPanel value={value} index={index}>
                    <div className="flex">
                        <div className="flex-col w-1/4 overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="relative z-20 h-[calc(100vh-120px)] p-6 my-auto">
                                <h3 className="w-full font-bold text-xl text-black dark:text-white text-center">{t("visits_status.examining")}</h3>
                                <h3 className="w-full h-full flex items-center justify-center font-bold text-5xl text-black dark:text-white text-center">
                                    { toBeExaminedVisit.length > 0 ? 
                                        <Typography variant="h1" fontWeight="700" textAlign="center">{toBeExaminedVisit[0].queue_number}</Typography> : 
                                        t('vacant')    
                                    }
                                </h3>
                            </div>
                        </div>
                        <div className="flex-col w-3/4 overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="relative z-20 h-full p-6 my-auto">
                                <h3 className="w-full font-bold text-xl text-black dark:text-white text-center">{t("visits_status.waiting")}</h3>
                                <div className="flex flex-wrap">
                                    {
                                        waitingVisits?.map( (visit, index) =>
                                            <QueueCard number={parseInt(visit.queue_number)} name={visit.patient.name} />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomTabPanel>
            )}
        </>
    );
};

export default QueueDisplay;
