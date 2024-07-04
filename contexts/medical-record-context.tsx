import { MedicalRecord, MedicineDoses, defaultMedicalRecord, defaultMedicineDoses } from '@/modules/medical-records/domain/medical-record';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
 
interface MedicalRecordContextType {
    medicalRecords: MedicalRecord[],
    activeMedicalRecord: MedicalRecord,
    medicineDoses: MedicineDoses[],
    loading: boolean,
    setMedicalRecords: Dispatch<SetStateAction<MedicalRecord[]>>,
    setActiveMedicalRecord: Dispatch<SetStateAction<MedicalRecord>>,
    setMedicineDoses: Dispatch<SetStateAction<MedicineDoses[]>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
}

export const MedicalRecordContext = createContext<MedicalRecordContextType | null>({
    medicalRecords: [defaultMedicalRecord],
    activeMedicalRecord: defaultMedicalRecord,
    medicineDoses: [defaultMedicineDoses],
    loading: false,
    setMedicalRecords: () => {},
    setActiveMedicalRecord: () => {},
    setMedicineDoses: () => {},
    setLoading: () => {},
});
 
export const MedicalRecordProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
    const [medicineDoses, setMedicineDoses] = useState<MedicineDoses[]>([]);
    const [activeMedicalRecord, setActiveMedicalRecord] = useState<MedicalRecord>(defaultMedicalRecord);
    const [loading, setLoading] = useState(false);

    return (
        <MedicalRecordContext.Provider value={{ medicalRecords, activeMedicalRecord, medicineDoses, loading, setLoading, setMedicineDoses, setMedicalRecords, setActiveMedicalRecord }}>
            {children}
        </MedicalRecordContext.Provider>
    );
};
 
export const useMedicalRecordContext = () => {
    const context = useContext(MedicalRecordContext);
    
    if (!context) {
        throw new Error('useMedicalRecordContext must be used inside the ThemeProvider');
    }
    
    return context;
};