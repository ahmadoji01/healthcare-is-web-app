import AlertModal from '@/components/Modal/AlertModal';
import { ALERT_MESSAGE, ALERT_STATUS } from '@/constants/alert';
import { Order, defaultOrder, orderMapper } from '@/modules/orders/domain/order';
import { getOrdersWithFilter, updateOrder } from '@/modules/orders/domain/order.actions';
import { PaymentMethod, defaultPaymentMethod } from '@/modules/payment-methods/domain/payment-method';
import { Alert, Snackbar } from '@mui/material';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './user-context';
import { statusFilter } from '@/modules/orders/domain/order.specifications';
import { ORDER_STATUS } from '@/modules/orders/domain/order.constants';
 
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
    confirmPayment: () => void,
}

export const OrderSummaryContext = createContext<OrderSummaryContextType | null>({
    deleteModalOpen: false,
    itemModalOpen: false,
    checkoutModalOpen: false,
    selectedPayment: defaultPaymentMethod,
    orders: [],
    selectedOrder: defaultOrder,
    total: 0,
    cashReceived: 0,
    setTotal: () => {},
    handleModal: () => {},
    setSelectedPayment: () => {},
    setOrders: () => {},
    setSelectedOrder: () => {},
    setCashReceived: () => {},
    confirmPayment: () => {},
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
    const [total, setTotal] = useState<number>(1);
    const [cashReceived, setCashReceived] = useState<number>(0);

    const [snackbarMsg, setSnackbarMsg] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);
    const [alertStatus, setAlertStatus] = useState<string>("");
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [alertAction, setAlertAction] = useState<string>("");

    const {accessToken} = useUserContext();

    useEffect( () => {
        getOrdersWithFilter(accessToken, statusFilter(ORDER_STATUS.waiting_to_pay), 1)
        .then( (res) => {
            let ords:Order[] = [];
            res?.map( (order) => { ords.push(orderMapper(order)) });
            setOrders(ords);
        })
    }, [orders]);

    const confirmPayment = () => {
        if (typeof(selectedPayment) === 'undefined') {
            setSnackbarMsg("Choose the payment method first!");
            setOpenSnackbar(true);
            return;
        }
        if (selectedPayment.name.toLowerCase() === 'cash' && (cashReceived == 0 || cashReceived < total)) {
            setSnackbarMsg("Cash received is less than the total amount needs to be paid!");
            setOpenSnackbar(true);
            return;
        }

        let orderPatcher = defaultOrder;
        if (typeof(selectedOrder) === 'undefined') {
            return;
        }

        orderPatcher = selectedOrder;
        orderPatcher.status = ORDER_STATUS.paid;
        orderPatcher.total = total;
        updateOrder(accessToken, orderPatcher.id, orderPatcher).then( () => {
            setAlertStatus(ALERT_STATUS.success);
            setAlertMessage("Your payment has been received!");
            setAlertAction("refresh");
            setOpenAlertModal(true);
            return;
        }).catch( () => {
            setSnackbarMsg(ALERT_MESSAGE.server_error);
            setOpenSnackbar(true);
            return;
        });
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
        <OrderSummaryContext.Provider value={{ deleteModalOpen, itemModalOpen, checkoutModalOpen, total, orders, selectedOrder, selectedPayment, cashReceived, handleModal, setCashReceived, setSelectedPayment, setTotal, setOrders, setSelectedOrder, confirmPayment }}>
            {children}
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnackbar} autoHideDuration={6000} onClose={handleClose} sx={{ zIndex: 2147483647 }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    { snackbarMsg }
                </Alert>
            </Snackbar>
            <AlertModal message={alertMessage} alertStatus={alertStatus} action={alertAction} open={openAlertModal} setOpen={setOpenAlertModal} />
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