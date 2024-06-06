import AlertModal from '@/components/Modal/AlertModal';
import { ALERT_MESSAGE, ALERT_STATUS } from '@/constants/alert';
import { Order, defaultOrder, orderMapper, orderPatcherMapper } from '@/modules/orders/domain/order';
import { getOrdersWithFilter, updateOrder } from '@/modules/orders/domain/order.actions';
import { PaymentMethod, defaultPaymentMethod } from '@/modules/payment-methods/domain/payment-method';
import { Alert, Snackbar } from '@mui/material';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './user-context';
import { statusFilter } from '@/modules/orders/domain/order.specifications';
import { ORDER_STATUS } from '@/modules/orders/domain/order.constants';
import { OrderItem, defaultOrderItem } from '@/modules/orders/domain/order-item';
import { useAlertContext } from './alert-context';
import { useTranslation } from 'react-i18next';
import { getADoctorOrg, getDoctorsInOrg } from '@/modules/doctors/domain/doctors.actions';
import { defaultDoctorOrganization, doctorOrgMapper } from '@/modules/doctors/domain/doctor';
import { WebSocketClient } from '@directus/sdk';
import { subsOutputMapper } from '@/modules/websockets/domain/websocket';
import { WS_EVENT_TYPE } from '@/modules/websockets/domain/websocket.constants';
import { websocketClient } from '@/utils/request-handler';
import { Medicine } from '@/modules/medicines/domain/medicine';
import { updateAMedicine } from '@/modules/medicines/domain/medicines.actions';
 
interface OrderSummaryContextType {
    deleteModalOpen: boolean,
    itemModalOpen: boolean,
    checkoutModalOpen: boolean,
    selectedPayment: PaymentMethod|undefined,
    orders: Order[],
    selectedOrder: Order|undefined,
    selectedItem: OrderItem,
    total: number,
    cashReceived: number,
    examFee: number,
    setTotal: Dispatch<SetStateAction<number>>,
    handleModal: (deleteModalOpen: boolean, itemModalOpen: boolean, checkoutModalOpen: boolean) => void,
    setSelectedPayment: Dispatch<SetStateAction<PaymentMethod|undefined>>,
    setOrders: Dispatch<SetStateAction<Order[]>>,
    setSelectedOrder: Dispatch<SetStateAction<Order|undefined>>,
    setSelectedItem: Dispatch<SetStateAction<OrderItem>>,
    setCashReceived: Dispatch<SetStateAction<number>>,
    setExamFee: Dispatch<SetStateAction<number>>,
    confirmPayment: () => void,
}

export const OrderSummaryContext = createContext<OrderSummaryContextType | null>({
    deleteModalOpen: false,
    itemModalOpen: false,
    checkoutModalOpen: false,
    selectedPayment: defaultPaymentMethod,
    orders: [],
    selectedOrder: defaultOrder,
    selectedItem: defaultOrderItem,
    total: 0,
    cashReceived: 0,
    examFee: 0,
    setTotal: () => {},
    handleModal: () => {},
    setSelectedPayment: () => {},
    setOrders: () => {},
    setSelectedOrder: () => {},
    setSelectedItem: () => {},
    setCashReceived: () => {},
    setExamFee: () => {},
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
    const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);
    const [medsQtyOrdered, setMedsQtyOrdered] = useState<number[]>([]);
    const [selectedItem, setSelectedItem] = useState<OrderItem>(defaultOrderItem);
    const [total, setTotal] = useState<number>(1);
    const [cashReceived, setCashReceived] = useState<number>(0);
    const [examFee, setExamFee] = useState<number>(0);
    const [wsClient, setWSClient] = useState<WebSocketClient<any>>();

    const [snackbarMsg, setSnackbarMsg] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);
    const [alertStatus, setAlertStatus] = useState<string>("");
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [alertAction, setAlertAction] = useState<string>("");

    const {accessToken, organization, user} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();
    const {t} = useTranslation();
    const notifySound = new Audio('/sounds/notification-sound.mp3');

    const playNotificationSound = () => {
        notifySound.play();
    }

    useEffect( () => {
        getOrdersWithFilter(accessToken, statusFilter(ORDER_STATUS.waiting_to_pay), 1)
        .then( (res) => {
            let ords:Order[] = [];
            res?.map( (order) => { ords.push(orderMapper(order)) });
            setOrders(ords);
        })
    }, []);

    useEffect( () => {
        getADoctorOrg(accessToken, { _and: [ { doctors_id: { _eq: selectedOrder?.visit.doctor.id } }, { organizations_id: { _eq: organization.id } } ] })
        .then( res => {
            let doctorOrg = defaultDoctorOrganization;
            if (res.length > 0)
                doctorOrg = doctorOrgMapper(res[0]);
            setExamFee(doctorOrg.examination_fee);
        });

        let meds:Medicine[] = [];
        let medsQty:number[] = [];
        selectedOrder?.order_items.map( (item) => {
            if (item.medicine !== null) {
                meds.push(item.medicine);
                medsQty.push(item.quantity);
            }
            setSelectedMedicines(meds);
            setMedsQtyOrdered(medsQty);
        });
    }, [selectedOrder]);

    const confirmPayment = () => {
        if (typeof(selectedPayment) === 'undefined') {
            openSnackbarNotification(t("alert_msg.no_payment_selected"), "error");
            setOpenSnackbar(true);
            return;
        }
        if (selectedPayment.name.toLowerCase() === 'cash' && (cashReceived == 0 || cashReceived < total)) {
            openSnackbarNotification(t("alert_msg.amount_not_enough"), "error");
            setOpenSnackbar(true);
            return;
        }

        if (typeof(selectedOrder) === 'undefined') {
            openSnackbarNotification(t("alert_msg.no_order_selected"), "error");
            return;
        }

        let isError = false;
        
        let orderPatcher = orderPatcherMapper(selectedOrder, organization.id)
        orderPatcher.status = ORDER_STATUS.paid;
        orderPatcher.total = total;
        updateOrder(accessToken, selectedOrder.id, orderPatcher).catch( () => {
            isError = true;
            return;
        });

        if (isError) {
            openSnackbarNotification(t("alert_msg.server_error"), "error");
            return;
        }
        
        selectedMedicines.map( (med, key) => {
            let data = { stock: med.stock - medsQtyOrdered[key] };
            updateAMedicine(accessToken, med.id, data)
                .catch( () => { isError = true; return; })
        });

        if (isError) {
            openSnackbarNotification(t("alert_msg.server_error"), "error");
            return;
        }

        setAlertStatus(ALERT_STATUS.success);
        setAlertMessage(t("alert_msg.payment_received"));
        setAlertAction("refresh");
        setOpenAlertModal(true);
        return;
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



    async function subsToOrder() { 
        if ( typeof(wsClient) === 'undefined')
            return;

        const { subscription } = await wsClient.subscribe('orders', {
            event: 'update',
            query: { fields: ['*.*.*'] },
        });
    
        for await (const item of subscription) {
            let output = subsOutputMapper(item);
            if (output.event === WS_EVENT_TYPE.update && output.data.length > 0) {
                let order = orderMapper(output.data[0]);
                if (order.status === ORDER_STATUS.waiting_to_pay) {
                    playNotificationSound();
                    let newOrders = [...orders];
                    newOrders.push(order);
                    setOrders(newOrders);
                }
            }
        }
    }

    useEffect( () => {
        let interval = setInterval(async () => {
            if (user.id !== "") {
                let client = websocketClient(accessToken);
                setWSClient(client);
                client.connect();
            }
            clearInterval(interval);
        }, 110);
        return () => clearInterval(interval);
    }, [user]);

    useEffect( () => {
        let interval = setInterval(async () => {
            if (typeof(wsClient) !== "undefined") {
                subsToOrder();
            }
            clearInterval(interval);
        }, 110);
        return () => clearInterval(interval);
    }, [wsClient]);

    return (
        <OrderSummaryContext.Provider value={{ examFee, deleteModalOpen, itemModalOpen, checkoutModalOpen, total, orders, selectedOrder, selectedItem, selectedPayment, cashReceived, setExamFee, handleModal, setCashReceived, setSelectedPayment, setTotal, setOrders, setSelectedOrder, setSelectedItem, confirmPayment }}>
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