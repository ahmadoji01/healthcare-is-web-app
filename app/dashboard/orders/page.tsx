'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import { useAlertContext } from "@/contexts/alert-context";
import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import { useUserContext } from "@/contexts/user-context";
import OrderDeleteConfirmation from "@/modules/orders/application/form/order.delete-confirmation";
import OrderListTable from "@/modules/orders/application/list/order.list";
import { Order, orderMapper } from "@/modules/orders/domain/order";
import { getAllOrders, getOrdersWithFilter } from "@/modules/orders/domain/order.actions";
import { ORDER_STATUS } from "@/modules/orders/domain/order.constants";
import { dateRangeFilter, monthFilter, statusFilter, yearFilter } from "@/modules/orders/domain/order.specifications";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

const OrdersDashboardPage = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const {setSelectedOrder} = useOrderSummaryContext();
  const {t} = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [fromDate, setFromDate] = useState<Date|null>(null);
  const [toDate, setToDate] = useState<Date|null>(null);

  const [filter, setFilter] = useState<object>({ _and: [ statusFilter(ORDER_STATUS.paid) ] })

  const fetchOrders = (newFilter:object) => {
    setDataLoaded(false);
    getOrdersWithFilter(accessToken, newFilter, 1)
      .then( res => {
        let ords:Order[] = [];
        res?.map( (order) => { ords.push(orderMapper(order)); });
        setOrders(ords);
        setDataLoaded(true);
      })
    setFilter(newFilter);
  }

  useEffect( () => {
    if (!dataLoaded && orders.length == 0) {
      
      getOrdersWithFilter(accessToken, statusFilter(ORDER_STATUS.paid), 1)
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
    getOrdersWithFilter(accessToken, filter, value)
      .then( res => {
        let ords:Order[] = [];
        res?.map( (order) => { ords.push(orderMapper(order)); });
        setOrders(ords);
        setDataLoaded(true);
      });
  }

  const onFromChange = (val:Date|undefined) => {
    if (typeof(val) === "undefined") {
      return;
    }
    setFromDate(val);

    if (toDate === null) {
      return;
    }
    let newFilter:object = { _and: [ statusFilter(ORDER_STATUS.paid), dateRangeFilter(val, toDate) ] };
    fetchOrders(newFilter);
  }

  const onToChange = (val:Date|undefined) => {
    if (typeof(val) === "undefined") {
      return;
    }
    setToDate(val);
    
    if (fromDate === null) {
      return;
    }
    let newFilter:object = { _and: [ statusFilter(ORDER_STATUS.paid), dateRangeFilter(fromDate, val) ] };
    fetchOrders(newFilter);
  }
  
  return (
    <>
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <OrderDeleteConfirmation handleClose={ () => handleModal(true, false)} /> } title="" />
      <Breadcrumb pageName="Orders" />
      
      <div className="flex flex-row gap-3 mb-3">
        <DatePicker label={t('from')} onChange={ e => onFromChange(e?.toDate()) } maxDate={moment(toDate)} />
        <DatePicker label={t('to')} onChange={ e => onToChange(e?.toDate()) } minDate={moment(fromDate)} />
      </div>

      <div className="flex flex-col gap-10">
        <OrderListTable orders={orders} handleModal={handleModal} totalPages={totalPages} handlePageChange={handlePageChange} setActiveOrder={setSelectedOrder} />
      </div>
    </>
  );
};

export default OrdersDashboardPage;