import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import { useTranslation } from "react-i18next";
import { Order } from "@/modules/orders/domain/order";

interface SidebarItemProps {
    sidebarExpanded: Boolean,
    setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>,
}

const SidebarMenu = ({ sidebarExpanded, setSidebarExpanded }: SidebarItemProps) => {
    const [orderList, setOrderList] = useState<Order[]>([]);
    
    const { orders, selectedOrder, setSelectedOrder } = useOrderSummaryContext();
    const {t} = useTranslation();

    useEffect( () => {
        setOrderList(orders);
    }, [orders]);

    return (
        <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                { t('patients_on_queue') }
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
                { orderList?.map((order, key) => (
                    <li>
                        <Link
                            href="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                (order.id === selectedOrder?.id) &&
                                "bg-graydark dark:bg-meta-4"
                            }`}
                            onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                ? setSelectedOrder(order)
                                : setSidebarExpanded(true);
                            }}
                            >
                            { order.patient?.name }
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SidebarMenu;