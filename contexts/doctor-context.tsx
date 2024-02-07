import { Doctor, defaultDoctor, doctorMapper } from '@/modules/doctors/domain/doctor';
import { getAllDoctors } from '@/modules/doctors/domain/doctors.actions';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './user-context';
 
interface DoctorContextType {
    doctors: Doctor[],
    activeDoctor: Doctor,
    setDoctors: Dispatch<SetStateAction<Doctor[]>>,
    setActiveDoctor: Dispatch<SetStateAction<Doctor>>,
}

export const DoctorContext = createContext<DoctorContextType | null>({
    doctors: [defaultDoctor],
    activeDoctor: defaultDoctor,
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
    const {accessToken} = useUserContext();

    useEffect( () => {
        getAllDoctors(accessToken, 1).then( res => { 
            let docs:Doctor[] = [];
            res?.map( (doctor) => { docs.push(doctorMapper(doctor)); });
            setDoctors(docs);
        })
    })

    return (
        <DoctorContext.Provider value={{ doctors, activeDoctor, setDoctors, setActiveDoctor }}>
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