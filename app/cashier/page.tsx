'use client';

import OrderItemList from "@/modules/orders/application/list/order-item.list";
import PaymentMethods from "./common/PaymentMethods";
import OrderTotals from "./common/order-totals";
import PatientOverview from "./common/patient-overview";
import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import DashboardModal from "@/components/Modal/Modal";
import Checkout from "./common/Checkout";
import AddItem from "./common/AddItem";
import OrderItemDeleteConfirmation from "@/modules/orders/application/form/order-item.delete-confirmation";
import { OrderItem } from "@/modules/orders/domain/order-item";
import { deleteAnOrderItem, updateOrder } from "@/modules/orders/domain/order.actions";
import { useUserContext } from "@/contexts/user-context";
import { useAlertContext } from "@/contexts/alert-context";
import { useEffect, useState } from "react";
import { Order, orderPatcherMapper } from "@/modules/orders/domain/order";
import Spinner from "@/components/Spinner";
import Prescription from "./prescription/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { getAMedicalRecord } from "@/modules/medical-records/domain/medical-records.actions";
import { defaultMedicalRecord, medicalRecordMapper } from "@/modules/medical-records/domain/medical-record";
import { useTranslations } from "next-intl";

const OrderSummary = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [orderList, setOrderList] = useState<Order[]>([]);
    const [presModalOpen, setPresModalOpen] = useState<boolean>(false);
    const [medicalRecord, setMedicalRecord] = useState(defaultMedicalRecord);

    const t = useTranslations();
    const { accessToken, organization } = useUserContext();
    const { openSnackbarNotification } = useAlertContext();
    const { orderLoaded, examFee, orders, selectedOrder, deleteModalOpen, itemModalOpen, checkoutModalOpen, selectedItem, setSelectedOrder, setSelectedItem, handleModal } = useOrderSummaryContext();

    useEffect( () => {
        setOrderList(orders);
    }, [orders]);

    useEffect( () => {
        if (typeof(selectedOrder) === 'undefined') {
            return;
        }

        if (selectedOrder.visit.id === "") {
            setMedicalRecord(defaultMedicalRecord);
            return;
        }
        
        getAMedicalRecord(accessToken, selectedOrder?.visit.medical_record.id)
            .then( res => {
                let mr = defaultMedicalRecord;
                mr = medicalRecordMapper(res);
                setMedicalRecord(mr);
            })
            .catch( () => openSnackbarNotification(t('alert_msg.server_error'), 'error'));
    }, [selectedOrder])

    const handleQtyChange = (action:string, itemIndex:number, qty:number) => {
        if (typeof(selectedOrder) === 'undefined') {
            return;
        }
        let newSelectedOrder = {...selectedOrder};
        let item = {...newSelectedOrder.order_items[itemIndex]};
        if (action === 'substract' && item.quantity === 1) {
            handleModal(true, false, false);
            item.quantity = 1;
            return;
        }
        if (action === 'substract') {
            item.quantity--;
        }
        if (action === 'add') {
            item.quantity++;
        }
        if (action === 'input') {
            item.quantity = qty;
        }
        newSelectedOrder.order_items[itemIndex] = item;
        setSelectedOrder(newSelectedOrder);
        return;
    }

    const handleDeleteItem = (item:OrderItem, index:number) => {
        handleModal(true, false, false);
        setSelectedItem(item);
        setSelectedIndex(index);
    }

    const deleteItem = () => {
        let isError = false;
        deleteAnOrderItem(accessToken, selectedItem.id)
        .catch( () => {
            isError = true;
        });

        if (isError) {
            openSnackbarNotification(t("alert_msg.server_error"), "error");
            return;
        }

        let newOrder = removeItemFromOrder();
        if (typeof(newOrder) === 'undefined') {
            openSnackbarNotification(t("alert_msg.server_error"), "error");
            return;
        }

        updateOrder(accessToken, newOrder.id, orderPatcherMapper(newOrder, organization.id))
        .then( () => {
            openSnackbarNotification(t("alert_msg.success"), "success");
            handleModal(false, false, false);
        }).catch( () => {
            openSnackbarNotification(t("alert_msg.server_error"), "error");
            return;
        })
    }

    const removeItemFromOrder = () => {
        if (typeof(selectedOrder) === 'undefined') {
            return;
        }
        let newSelectedOrder = {...selectedOrder}
        newSelectedOrder.order_items.splice(selectedIndex);
        setSelectedOrder(newSelectedOrder);
        return newSelectedOrder;
    }

    return (
        <>
            { !orderLoaded && <Spinner /> }
            { (orderList.length > 0 && typeof(selectedOrder) !== 'undefined') && 
                <>
                    <DashboardModal open={presModalOpen} handleClose={() => setPresModalOpen(false)} children={ <Prescription medicalRecord={medicalRecord} /> } title={t('prescription')} />
                    <DashboardModal open={deleteModalOpen} handleClose={() => handleModal(false, false, false)} children={ <OrderItemDeleteConfirmation orderItem={selectedItem} handleDelete={deleteItem} handleClose={() => handleModal(false, false, false)} /> } title="" /> 
                    <DashboardModal open={itemModalOpen} handleClose={() => handleModal(false, false, false)} children={ <AddItem /> } title="" /> 
                    <DashboardModal open={checkoutModalOpen} handleClose={() => handleModal(false, false, false)} children={ <Checkout /> } title="" /> 
                    <div className="flex flex-row gap-2 mb-2">
                        <div className="w-full">
                            <PatientOverview />
                        </div>
                        <div className="w-full gap-2">
                            <OrderTotals />
                        </div>
                    </div>
                    { medicalRecord.id !== "" && 
                        <div>
                            <button 
                                className="top-0 z-50 mt-2 mb-2 w-full justify-center rounded bg-primary py-5 px-3 font-medium text-2xl text-gray"
                                onClick={() => setPresModalOpen(true)}>
                                <FontAwesomeIcon width={18} height={18} icon={faPrint} className="mr-2" />
                                { t("print_prescription") }
                            </button>
                        </div>
                    }
                    <div className="mt-6 text-black dark:text-white">
                        <h3 className="text-3xl font-extrabold mb-2">{ t("order_items") }</h3>
                        <OrderItemList examFee={examFee} orderItems={selectedOrder?.order_items} handleDelete={handleDeleteItem} handleQtyChange={handleQtyChange} />
                        { selectedOrder.order_items.length <= 0 &&  
                            <h4 className="text-center text-xl font-bold">{ t("no_order_items") }</h4>
                        }
                    </div>
                    <div className="flex mt-6">
                        <div className="w-full gap-2">
                            <PaymentMethods />
                        </div>
                    </div>
                </>
            }
            { (orderLoaded && orderList.length > 0 && typeof(selectedOrder) == 'undefined') && 
                <div className="flex p-6">
                    <h3 className="text-black dark:text-white font-extrabold text-center w-screen h-screen text-3xl items-center justify-center">
                        { t("cashier.select_patient") }
                    </h3>
                </div>
            }
            { orderList.length <= 0 &&
                <div className="flex p-6">
                    <h3 className="text-black dark:text-white font-extrabold text-center w-screen h-screen text-3xl items-center justify-center">
                        { t("cashier.no_active_order") }
                    </h3>
                </div>
            }
        </>
    );
}

export default OrderSummary;