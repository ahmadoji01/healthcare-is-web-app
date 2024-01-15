import { Order } from '@/modules/orders/domain/order';
import { ordersFakeData } from '@/modules/orders/infrastructure/order.fakes';
import { Patient } from '@/modules/patients/domain/patient';
import { patientsFakeData } from '@/modules/patients/infrastructure/patients.fakes';
import { PaymentMethod } from '@/modules/payment-methods/domain/payment-method';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
 
interface OrderSummaryContextType {
    deleteModalOpen: boolean,
    itemModalOpen: boolean,
    checkoutModalOpen: boolean,
    selectedPayment: PaymentMethod|undefined,
    orders: Order[],
    selectedOrder: Order|undefined,
    handleModal: (deleteModalOpen: boolean, itemModalOpen: boolean, checkoutModalOpen: boolean) => void,
    setSelectedPayment: Dispatch<SetStateAction<PaymentMethod|undefined>>,
    setOrders: Dispatch<SetStateAction<Order[]>>,
    setSelectedOrder: Dispatch<SetStateAction<Order|undefined>>,
}

export const OrderSummaryContext = createContext<OrderSummaryContextType | null>({
    deleteModalOpen: false,
    itemModalOpen: false,
    checkoutModalOpen: false,
    selectedPayment: undefined,
    orders: [],
    selectedOrder: undefined,
    handleModal: () => {},
    setSelectedPayment: () => {},
    setOrders: () => {},
    setSelectedOrder: () => {},
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
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order>();

    useEffect( () => {
        setOrders(ordersFakeData);
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
        <OrderSummaryContext.Provider value={{ deleteModalOpen, itemModalOpen, checkoutModalOpen, orders, selectedOrder, selectedPayment, handleModal, setSelectedPayment, setOrders, setSelectedOrder }}>
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