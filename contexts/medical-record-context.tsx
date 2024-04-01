import { MedicalRecord, defaultMedicalRecord, medicalRecordMapper } from '@/modules/medical-records/domain/medical-record';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
 
interface MedicalRecordContextType {
    medicalRecords: MedicalRecord[],
    activeMedicalRecord: MedicalRecord,
    loading: boolean,
    setMedicalRecords: Dispatch<SetStateAction<MedicalRecord[]>>,
    setActiveMedicalRecord: Dispatch<SetStateAction<MedicalRecord>>,
}

export const MedicalRecordContext = createContext<MedicalRecordContextType | null>({
    medicalRecords: [defaultMedicalRecord],
    activeMedicalRecord: defaultMedicalRecord,
    loading: false,
    setMedicalRecords: () => {},
    setActiveMedicalRecord: () => {},
});
 
export const MedicalRecordProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
    const [activeMedicalRecord, setActiveMedicalRecord] = useState<MedicalRecord>(defaultMedicalRecord);
    const [loading, setLoading] = useState(false);

    return (
        <MedicalRecordContext.Provider value={{ medicalRecords, activeMedicalRecord, loading, setMedicalRecords, setActiveMedicalRecord }}>
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