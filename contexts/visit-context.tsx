import { Visit, defaultVisit, visitMapper } from '@/modules/visits/domain/visit';
import { getAllVisits, getVisitByDoctorID, getVisitsWithFilter } from '@/modules/visits/domain/visits.actions';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './user-context';
import { useAlertContext } from './alert-context';
import { ALERT_MESSAGE } from '@/constants/alert';
import { Patient, defaultPatient } from '@/modules/patients/domain/patient';
import { PhysicalCheckup } from '@/modules/physical-checkups/domain/physical-checkup';
import { doctorIDEquals, statusEquals } from '@/modules/visits/domain/visit.specifications';
import { VISIT_STATUS } from '@/modules/visits/domain/visit.constants';
 
interface VisitContextType {
    visits: Visit[],
    doctorVisits: Visit[],
    activePatient: Patient,
    activeVisit: Visit,
    loading: boolean,
    setActivePatient: Dispatch<SetStateAction<Patient>>,
    setActiveVisit: Dispatch<SetStateAction<Visit>>,
    setDoctorVisits: Dispatch<SetStateAction<Visit[]>>,
    handleDoctorVisits: (doctorID:number) => void,
}

export const VisitContext = createContext<VisitContextType | null>({
    visits: [],
    doctorVisits: [],
    activePatient: defaultPatient,
    activeVisit: defaultVisit,
    loading: false,
    setActivePatient: () => {},
    setActiveVisit: () => {},
    setDoctorVisits: () => {},
    handleDoctorVisits: () => {},
});
 
export const VisitProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [visits, setVisits] = useState<Visit[]>([]);
    const [doctorVisits, setDoctorVisits] = useState<Visit[]>([]);
    const [activePatient, setActivePatient] = useState<Patient>(defaultPatient);
    const [activeVisit, setActiveVisit] = useState<Visit>(defaultVisit);
    const [loading, setLoading] = useState(false);
    const {accessToken} = useUserContext();

    const handleDoctorVisits = (doctorID:number) => {
        setLoading(true);
        let filter = { _and: [ doctorIDEquals(doctorID), { _or: [statusEquals(VISIT_STATUS.waiting), statusEquals(VISIT_STATUS.temporary_leave)] } ] }
        getVisitsWithFilter(accessToken, filter, 'date_created', 1).then( res => {
            let vits:Visit[] = [];
            res?.map( (visit) => { vits.push(visitMapper(visit)); });
            setDoctorVisits(vits);
            setLoading(false);
        }).catch( err => {
            setLoading(false);
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
                clearInterval(interval);
            })
        }, 100)

        return () => clearInterval(interval);
    }, [])

    return (
        <VisitContext.Provider value={{ visits, activeVisit, loading, doctorVisits, activePatient, setActivePatient, setActiveVisit, setDoctorVisits, handleDoctorVisits }}>
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