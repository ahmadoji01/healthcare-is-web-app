import { Order } from '@/modules/orders/domain/order';
import { ordersFakeData } from '@/modules/orders/infrastructure/order.fakes';
import { PaymentMethod } from '@/modules/payment-methods/domain/payment-method';
import { Alert, Snackbar } from '@mui/material';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
 
interface OrderSummaryContextType {
    deleteModalOpen: boolean,
    itemModalOpen: boolean,
    checkoutModalOpen: boolean,
    selectedPayment: PaymentMethod|undefined,
    orders: Order[],
    selectedOrder: Order|undefined,
    total: number,
    cashReceived: number,
    setTotal: Dispatch<SetStateAction<number>>,
    handleModal: (deleteModalOpen: boolean, itemModalOpen: boolean, checkoutModalOpen: boolean) => void,
    setSelectedPayment: Dispatch<SetStateAction<PaymentMethod|undefined>>,
    setOrders: Dispatch<SetStateAction<Order[]>>,
    setSelectedOrder: Dispatch<SetStateAction<Order|undefined>>,
    setCashReceived: Dispatch<SetStateAction<number>>,
}

export const OrderSummaryContext = createContext<OrderSummaryContextType | null>({
    deleteModalOpen: false,
    itemModalOpen: false,
    checkoutModalOpen: false,
    selectedPayment: undefined,
    orders: [],
    selectedOrder: undefined,
    total: 0,
    cashReceived: 0,
    setTotal: () => {},
    handleModal: () => {},
    setSelectedPayment: () => {},
    setOrders: () => {},
    setSelectedOrder: () => {},
    setCashReceived: () => {},
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
    const [total, setTotal] = useState<number>(0);
    const [cashReceived, setCashReceived] = useState<number>(0);

    const [snackbarMsg, setSnackbarMsg] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    useEffect( () => {
        setOrders(ordersFakeData);
    })

    const confirmPayment = () => {
        if (typeof(selectedPayment) === 'undefined') {
            setSnackbarMsg("Choose the payment method first!");
            setOpenSnackbar(true);
            return;
        }
        if (selectedPayment.name === 'cash' && (cashReceived < total)) {
            setSnackbarMsg("Cash received is less than the total amount needs to be paid!");
            setOpenSnackbar(true);
            return;
        }
        
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbar(false);
    };

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
        <OrderSummaryContext.Provider value={{ deleteModalOpen, itemModalOpen, checkoutModalOpen, total, orders, selectedOrder, selectedPayment, cashReceived, handleModal, setCashReceived, setSelectedPayment, setTotal, setOrders, setSelectedOrder }}>
            {children}
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnackbar} autoHideDuration={6000} onClose={handleClose} style={{ zIndex: 99999999999 }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    { snackbarMsg }
                </Alert>
            </Snackbar>
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