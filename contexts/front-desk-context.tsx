import { Doctor, DoctorOrganization, defaultDoctor, doctorMapper, doctorOrgMapper } from '@/modules/doctors/domain/doctor';
import { getAllDoctors, getDoctorsInOrg, getPresentDoctors } from '@/modules/doctors/domain/doctors.actions';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './user-context';
import { useVisitContext } from './visit-context';
 
interface FrontDeskContextType {
    presentDoctors: Doctor[],
    activeDoctor: Doctor,
    loading: boolean,
    setPresentDoctors: Dispatch<SetStateAction<Doctor[]>>,
    setActiveDoctor: Dispatch<SetStateAction<Doctor>>,
}

export const FrontDeskContext = createContext<FrontDeskContextType | null>({
    presentDoctors: [defaultDoctor],
    activeDoctor: defaultDoctor,
    loading: false,
    setPresentDoctors: () => {},
    setActiveDoctor: () => {},
});
 
export const FrontDeskProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [presentDoctors, setPresentDoctors] = useState<Doctor[]>([]);
    const [activeDoctor, setActiveDoctor] = useState<Doctor>(defaultDoctor);
    const [loading, setLoading] = useState(false);
    const {accessToken} = useUserContext();
    const {handleDoctorVisits} = useVisitContext();

    useEffect( () => {
        setLoading(true);
        let interval = setInterval(async () => {
            await getPresentDoctors(accessToken).then( res => { 
                let docs:Doctor[] = [];
                res?.map( (docOrg) => { 
                    let org = doctorOrgMapper(docOrg);
                    docs.push(org.doctor);
                });
                setPresentDoctors(docs);
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

    return (
        <FrontDeskContext.Provider value={{ presentDoctors, activeDoctor, loading, setPresentDoctors, setActiveDoctor }}>
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