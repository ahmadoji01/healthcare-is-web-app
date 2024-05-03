'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { useAlertContext } from "@/contexts/alert-context";
import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import { useUserContext } from "@/contexts/user-context";
import OrderListTable from "@/modules/orders/application/list/order.list";
import { Order, orderMapper } from "@/modules/orders/domain/order";
import { getAllOrders } from "@/modules/orders/domain/order.actions";
import { useEffect, useState } from "react";

const OrdersDashboardPage = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const {setSelectedOrder} = useOrderSummaryContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect( () => {
    if (!dataLoaded || orders.length == 0) {
      getAllOrders(accessToken, 1)
        .then( res => {
          let ords:Order[] = [];
          res?.map( (order) => { ords.push(orderMapper(order)); });
          setOrders(ords);
          setDataLoaded(true);
        });
    }
  });

  const handleModal = (closeModal:boolean, whichModal: boolean) => {
    if(closeModal) {
      setEditModalOpen(false);
      setDeleteModalOpen(false);
      return;
    }

    if (whichModal) {
      setEditModalOpen(true);
      setDeleteModalOpen(false);
    } else {
      setEditModalOpen(false);
      setDeleteModalOpen(true);
    }
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setDataLoaded(false);
    getAllOrders(accessToken, 1)
      .then( res => {
        let ords:Order[] = [];
        res?.map( (order) => { ords.push(orderMapper(order)); });
        setOrders(ords);
        setDataLoaded(true);
      });
  };
  
  return (
    <>
      <Breadcrumb pageName="Orders" />

      <div className="flex flex-col gap-10">
        <OrderListTable orders={orders} handleModal={handleModal} totalPages={totalPages} handlePageChange={handlePageChange} setActiveOrder={setSelectedOrder} />
      </div>
    </>
  );
};

export default OrdersDashboardPage;