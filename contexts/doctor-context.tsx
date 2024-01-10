import { Doctor } from '@/modules/doctors/domain/doctor';
import { doctorsFakeData } from '@/modules/doctors/infrastructure/doctors.fakes';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
 
interface DoctorContextType {
    doctors: Doctor[],
    activeDoctor: Doctor,
    setDoctors: Dispatch<SetStateAction<Doctor[]>>,
    setActiveDoctor: Dispatch<SetStateAction<Doctor>>,
}

export const DoctorContext = createContext<DoctorContextType | null>({
    doctors: doctorsFakeData,
    activeDoctor: doctorsFakeData[0],
    setDoctors: () => {},
    setActiveDoctor: () => {},
});
 
export const DoctorProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [doctors, setDoctors] = useState<Doctor[]>(doctorsFakeData);
    const [activeDoctor, setActiveDoctor] = useState<Doctor>(doctorsFakeData[0]);

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