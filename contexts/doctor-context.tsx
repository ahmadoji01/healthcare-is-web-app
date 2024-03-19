import { Doctor, defaultDoctor, doctorMapper } from '@/modules/doctors/domain/doctor';
import { getAllDoctors } from '@/modules/doctors/domain/doctors.actions';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './user-context';
import { useAlertContext } from './alert-context';
import { ALERT_MESSAGE } from '@/constants/alert';
 
interface DoctorContextType {
    doctors: Doctor[],
    activeDoctor: Doctor,
    loading: boolean,
    setDoctors: Dispatch<SetStateAction<Doctor[]>>,
    setActiveDoctor: Dispatch<SetStateAction<Doctor>>,
}

export const DoctorContext = createContext<DoctorContextType | null>({
    doctors: [defaultDoctor],
    activeDoctor: defaultDoctor,
    loading: false,
    setDoctors: () => {},
    setActiveDoctor: () => {},
});
 
export const DoctorProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [activeDoctor, setActiveDoctor] = useState<Doctor>(defaultDoctor);
    const [loading, setLoading] = useState(false);
    const {accessToken} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();

    useEffect( () => {
        setLoading(true);
        let interval = setInterval(async () => {
            await getAllDoctors(accessToken, 1).then( res => { 
                let docs:Doctor[] = [];
                res?.map( (doctor) => { docs.push(doctorMapper(doctor)); });
                setDoctors(docs);
                if (docs.length >= 1) {
                    setActiveDoctor(docs[0]);
                }

                setLoading(false);
                clearInterval(interval);
            }).catch( err => {
                setLoading(false);
                //openSnackbarNotification(ALERT_MESSAGE.server_error, 'error');
            })
        }, 100)

        return () => clearInterval(interval);
    }, [])

    return (
        <DoctorContext.Provider value={{ doctors, activeDoctor, loading, setDoctors, setActiveDoctor }}>
            {children}
        </DoctorContext.Provider>
    );
};
 
export const useDoctorContext = () => {
    const context = useContext(DoctorContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the ThemeProvider');
    }
    
    return context;
};