'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import { useAlertContext } from "@/contexts/alert-context";
import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import { useUserContext } from "@/contexts/user-context";
import OrderListTable from "@/modules/orders/application/list/order.list";
import { Order, defaultOrder, orderMapper } from "@/modules/orders/domain/order";
import { deleteAnOrder, getAllOrders, getAllOrdersWithFilter, getOrdersWithFilter, getTotalOrdersWithFilter } from "@/modules/orders/domain/order.actions";
import { ORDER_STATUS } from "@/modules/orders/domain/order.constants";
import { dateRangeFilter, monthFilter, statusFilter, yearFilter } from "@/modules/orders/domain/order.specifications";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from 'moment/min/moment-with-locales';
import OrderView from "@/modules/orders/application/order.view";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDocumentContext } from "@/contexts/document-context";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import MiniSpinner from "@/components/MiniSpinner";
import { LIMIT_PER_PAGE } from "@/constants/request";

const OrdersDashboardPage = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const router = useRouter();
  const {selectedOrder, setSelectedOrder} = useOrderSummaryContext();
  const {t} = useTranslation();
  const {setOrderDocument, setOrdersDocument, setFrom, setTo} = useDocumentContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
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
    getTotalOrdersWithFilter(accessToken, newFilter)
      .then( res => { 
        let total = res[0].count? parseInt(res[0].count) : 0;
        let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
        setTotalPages(pages);
      });
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
      getTotalOrdersWithFilter(accessToken, statusFilter(ORDER_STATUS.paid))
        .then( res => { 
          let total = res[0].count? parseInt(res[0].count) : 0;
          let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
          setTotalPages(pages);
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

  const handleDelete = () => {
    if (typeof(selectedOrder) === 'undefined') {
      return;
    }

    deleteAnOrder(accessToken, selectedOrder.id)
      .then( () => {
        openSnackbarNotification(t('alert_msg.success'), "success");
        window.location.reload();
      }).catch( () => {
        openSnackbarNotification(t('alert_msg.server_error'), "error");
      })
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

  const handleDocument = (order:Order) => {
    setOrderDocument(order);
    router.push("/documents/order");
  }
  
  const handlePrintDocument = async () => {
    if (fromDate === null || toDate === null) {
      openSnackbarNotification(t('alert_msg.choose_date_first'), 'error');
      return;
    }

    let isError = false;
    let ords:Order[] = [];
    let filter:object = { _and: [ statusFilter(ORDER_STATUS.paid), dateRangeFilter(fromDate, toDate) ] };
    setPrintLoading(true);
    await getAllOrdersWithFilter(accessToken, filter)
      .then( res => {
        res?.map( (order) => { ords.push(orderMapper(order)); });
      })
      .catch( () => isError = true)

    if (isError) {
      openSnackbarNotification(t('alert_msg.server_error'), 'error'); 
      return;
    }

    setOrdersDocument(ords);
    setFrom(moment(fromDate).locale('id').format("Do MMMM YYYY"));
    setTo(moment(toDate).locale('id').format("Do MMMM YYYY"));
    router.push('/documents/orders');
  }
  
  return (
    <>
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <DeleteModal name={t("this_order")} handleDelete={handleDelete} handleClose={ () => handleModal(true, false)} /> } title="" />
      <Breadcrumb pageName={t("orders")} />
      
      <div className="flex flex-row gap-3 mb-3">
        <DatePicker label={t('from')} onChange={ e => onFromChange(e?.toDate()) } maxDate={moment(toDate)} />
        <DatePicker label={t('to')} onChange={ e => onToChange(e?.toDate()) } minDate={moment(fromDate)} />
        <button 
          onClick={handlePrintDocument}
          className="sticky bottom-0 z-50 w-100 justify-center rounded bg-primary py-3 px-1 font-medium text-xl text-gray">
          { printLoading && <MiniSpinner size={8} /> }
          <FontAwesomeIcon width={18} height={18} icon={faPrint} className="mr-2" />
          {t('print_order_document')}
        </button>
      </div>

      <div className="flex flex-col gap-10">
        <OrderListTable handleDocument={handleDocument} orders={orders} handleModal={handleModal} totalPages={totalPages} handlePageChange={handlePageChange} setActiveOrder={setSelectedOrder} />
      </div>
    </>
  );
};

export default OrdersDashboardPage;