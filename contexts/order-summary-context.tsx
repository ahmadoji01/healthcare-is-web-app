import { Patient } from '@/modules/patients/domain/patient';
import { patientsFakeData } from '@/modules/patients/infrastructure/patients.fakes';
import { PaymentMethod } from '@/modules/payment-methods/domain/payment-method';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
 
interface OrderSummaryContextType {
    deleteModalOpen: boolean,
    itemModalOpen: boolean,
    checkoutModalOpen: boolean,
    selectedPayment: PaymentMethod|undefined,
    patients: Patient[],
    selectedPatient: Patient|undefined,
    handleModal: (deleteModalOpen: boolean, itemModalOpen: boolean, checkoutModalOpen: boolean) => void,
    setSelectedPayment: Dispatch<SetStateAction<PaymentMethod|undefined>>,
    setPatients: Dispatch<SetStateAction<Patient[]>>,
    setSelectedPatient: Dispatch<SetStateAction<Patient|undefined>>,
}

export const OrderSummaryContext = createContext<OrderSummaryContextType | null>({
    deleteModalOpen: false,
    itemModalOpen: false,
    checkoutModalOpen: false,
    selectedPayment: undefined,
    patients: [],
    selectedPatient: undefined,
    handleModal: () => {},
    setSelectedPayment: () => {},
    setPatients: () => {},
    setSelectedPatient: () => {},
});
 
export const OrderSummaryProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [itemModalOpen, setItemModalOpen] = useState<boolean>(false);
    const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>();
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient>();

    useEffect( () => {
        setPatients(patientsFakeData);
    })

    const handleModal = (deleteModal:boolean, itemModal:boolean, checkoutModal:boolean) => {
        if (deleteModal) {
            setDeleteModalOpen(true);
            setItemModalOpen(false);
            setCheckoutModalOpen(false);
            return;
        }
        if (itemModal) {
            setDeleteModalOpen(false);
            setItemModalOpen(true);
            setCheckoutModalOpen(false);
            return;
        }
        if (checkoutModal) {
            setDeleteModalOpen(false);
            setItemModalOpen(false);
            setCheckoutModalOpen(true);
            return;
        }
        setDeleteModalOpen(false);
        setItemModalOpen(false);
        setCheckoutModalOpen(false);
        return;
    }

    return (
        <OrderSummaryContext.Provider value={{ deleteModalOpen, itemModalOpen, checkoutModalOpen, patients, selectedPatient, selectedPayment, handleModal, setSelectedPayment, setPatients, setSelectedPatient }}>
            {children}
        </OrderSummaryContext.Provider>
    );
};
 
export const useOrderSummaryContext = () => {
    const context = useContext(OrderSummaryContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the OrderSummaryProvider');
    }
    
    return context;
};