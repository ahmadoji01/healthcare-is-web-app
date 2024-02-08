import { Visit, defaultVisit, visitMapper } from '@/modules/visits/domain/visit';
import { getAllVisits, getVisitByDoctorID } from '@/modules/visits/domain/visits.actions';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './user-context';
import { useAlertContext } from './alert-context';
import { ALERT_MESSAGE } from '@/constants/alert';
 
interface VisitContextType {
    visits: Visit[],
    doctorVisits: Visit[],
    loading: boolean,
    handleDoctorVisits: (doctorID:number) => void,
}

export const VisitContext = createContext<VisitContextType | null>({
    visits: [],
    doctorVisits: [],
    loading: false,
    handleDoctorVisits: () => {},
});
 
export const VisitProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [visits, setVisits] = useState<Visit[]>([]);
    const [doctorVisits, setDoctorVisits] = useState<Visit[]>([]);
    const [loading, setLoading] = useState(false);
    const {accessToken} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();

    const handleDoctorVisits = (doctorID:number) => {
        setLoading(true);
        getVisitByDoctorID(accessToken, doctorID).then( res => {
            let vits:Visit[] = [];
            res?.map( (visit) => { vits.push(visitMapper(visit)); });
            setDoctorVisits(vits);
            setLoading(false);
        }).catch( err => {
            setLoading(false);
            openSnackbarNotification(ALERT_MESSAGE.server_error, 'error');
        })
    }

    useEffect( () => {
        setLoading(true);
        let interval = setInterval(async () => {
            await getAllVisits(accessToken, 1).then( res => { 
                let vits:Visit[] = [];
                res?.map( (visit) => { vits.push(visitMapper(visit)); });
                setVisits(vits);
                setLoading(false);
                clearInterval(interval);
            }).catch( err => {
                setLoading(false);
                openSnackbarNotification(ALERT_MESSAGE.server_error, 'error');
            })
        }, 100)

        return () => clearInterval(interval);
    }, [])

    return (
        <VisitContext.Provider value={{ visits, loading, doctorVisits, handleDoctorVisits }}>
            {children}
        </VisitContext.Provider>
    );
};
 
export const useVisitContext = () => {
    const context = useContext(VisitContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the ThemeProvider');
    }
    
    return context;
};