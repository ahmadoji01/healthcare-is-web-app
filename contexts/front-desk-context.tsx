import { Doctor, DoctorOrganization, defaultDoctor, doctorMapper, doctorOrgMapper } from '@/modules/doctors/domain/doctor';
import { getAllDoctors, getDoctorsInOrg, getPresentDoctors } from '@/modules/doctors/domain/doctors.actions';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './user-context';
import { useVisitContext } from './visit-context';
 
interface FrontDeskContextType {
    presentDoctors: Doctor[],
    activeDoctor: Doctor,
    loading: boolean,
    newQueues: boolean[],
    notifyNewQueue: (doctorId:number) => void,
    setPresentDoctors: Dispatch<SetStateAction<Doctor[]>>,
    setActiveDoctor: Dispatch<SetStateAction<Doctor>>,
    setNewQueues: Dispatch<SetStateAction<boolean[]>>,
}

export const FrontDeskContext = createContext<FrontDeskContextType | null>({
    presentDoctors: [defaultDoctor],
    activeDoctor: defaultDoctor,
    loading: false,
    newQueues: [],
    notifyNewQueue: () => {},
    setPresentDoctors: () => {},
    setActiveDoctor: () => {},
    setNewQueues: () => {},
});
 
export const FrontDeskProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [presentDoctors, setPresentDoctors] = useState<Doctor[]>([]);
    const [activeDoctor, setActiveDoctor] = useState<Doctor>(defaultDoctor);
    const [notifiedIndex, setNotifiedIndex] = useState<number>(0);
    const [newQueues, setNewQueues] = useState<boolean[]>([]);
    const [loading, setLoading] = useState(false);
    const {accessToken} = useUserContext();
    const {handleDoctorVisits} = useVisitContext();
    const notifySound = new Audio('/sounds/notification-sound.mp3');

    const playNotificationSound = () => {
        notifySound.play();
    }

    useEffect( () => {
        setLoading(true);
        let interval = setInterval(async () => {
            await getPresentDoctors(accessToken).then( res => { 
                let docs:Doctor[] = [];
                let newQs:boolean[] = [];
                res?.map( (docOrg) => { 
                    let org = doctorOrgMapper(docOrg);
                    docs.push(org.doctor);
                    newQs.push(false);
                });
                setPresentDoctors(docs);
                setNewQueues(newQs);
                if (docs.length >= 1) {
                    setActiveDoctor(docs[0]);
                    handleDoctorVisits(docs[0].id);
                }
                setLoading(false);
                clearInterval(interval);
            }).catch( err => {
                setLoading(false);
            });
        }, 110)

        return () => clearInterval(interval);
    }, [])

    const notifyNewQueue = (doctorId:number) => {
        let key = presentDoctors.findIndex( (doc) => doc.id === doctorId );

        if (key === -1)
            return;
        
        let newQ = [...newQueues];
        newQ[key] = true;
        setNewQueues(newQ);
        playNotificationSound();
    }

    return (
        <FrontDeskContext.Provider value={{ presentDoctors, activeDoctor, loading, newQueues, setNewQueues, notifyNewQueue, setPresentDoctors, setActiveDoctor }}>
            {children}
        </FrontDeskContext.Provider>
    );
};
 
export const useFrontDeskContext = () => {
    const context = useContext(FrontDeskContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the ThemeProvider');
    }
    
    return context;
};