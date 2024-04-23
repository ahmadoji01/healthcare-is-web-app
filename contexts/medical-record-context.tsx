import { MedicalRecord, MedicineDoses, defaultMedicalRecord, defaultMedicineDoses, medicalRecordMapper } from '@/modules/medical-records/domain/medical-record';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
 
interface MedicalRecordContextType {
    medicalRecords: MedicalRecord[],
    activeMedicalRecord: MedicalRecord,
    medicineDoses: MedicineDoses[],
    loading: boolean,
    setMedicalRecords: Dispatch<SetStateAction<MedicalRecord[]>>,
    setActiveMedicalRecord: Dispatch<SetStateAction<MedicalRecord>>,
    setMedicineDoses: Dispatch<SetStateAction<MedicineDoses[]>>,
}

export const MedicalRecordContext = createContext<MedicalRecordContextType | null>({
    medicalRecords: [defaultMedicalRecord],
    activeMedicalRecord: defaultMedicalRecord,
    medicineDoses: [defaultMedicineDoses],
    loading: false,
    setMedicalRecords: () => {},
    setActiveMedicalRecord: () => {},
    setMedicineDoses: () => {},
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
        <MedicalRecordContext.Provider value={{ medicalRecords, activeMedicalRecord, medicineDoses, loading, setMedicineDoses, setMedicalRecords, setActiveMedicalRecord }}>
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