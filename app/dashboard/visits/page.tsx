'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import VisitList from "@/modules/visits/application/visit.list";
import { Visit, defaultVisit, visitMapper } from "@/modules/visits/domain/visit";
import { VISIT_STATUS } from "@/modules/visits/domain/visit.constants";
import { statusNotEqual } from "@/modules/visits/domain/visit.specifications";
import { deleteAVisit, getTotalVisitsWithFilter, getVisitsWithFilter } from "@/modules/visits/domain/visits.actions";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import moment from "moment";
import VisitView from "@/modules/visits/application/form/visit.view";
import DeleteModal from "@/components/Modal/DeleteModal";
import { dateRangeFilter } from "@/utils/generic-filters";
import { useTranslations } from "next-intl";

const VisitsDashboardPage = () => {

  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const t = useTranslations();
  const [activeVisit, setActiveVisit] = useState(defaultVisit);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [fromDate, setFromDate] = useState<Date|null>(null);
  const [toDate, setToDate] = useState<Date|null>(null);

  const [filter, setFilter] = useState<object>({ _and: [ statusNotEqual(VISIT_STATUS.inactive), statusNotEqual(VISIT_STATUS.active) ] })

  const fetchVisits = (newFilter:object) => {
    setDataLoaded(false);
    getVisitsWithFilter(accessToken, newFilter, '-date_updated', 1)
      .then( res => {
        let vits:Visit[] = [];
        res?.map( (visit) => { vits.push(visitMapper(visit)); });
        setVisits(vits);
        setDataLoaded(true);
      });
    getTotalVisitsWithFilter(accessToken, newFilter)
      .then( res => { 
        let total = res[0].count? parseInt(res[0].count) : 0;
        let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
        setTotalPages(pages);
      });
    setFilter(newFilter);
  }

  useEffect( () => {
    if (!dataLoaded && visits.length == 0) {
      getVisitsWithFilter(accessToken, filter, '-date_updated', 1)
        .then( res => {
          let vits:Visit[] = [];
          res?.map( (visit) => { vits.push(visitMapper(visit)); });
          setVisits(vits);
          setDataLoaded(true);
        });
      getTotalVisitsWithFilter(accessToken, filter)
        .then( res => { 
          let total = res[0].count? parseInt(res[0].count) : 0;
          let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
          setTotalPages(pages);
        })
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
    getVisitsWithFilter(accessToken, filter, '-date_updated', value)
      .then( res => {
        let vits:Visit[] = [];
        res?.map( (visit) => { vits.push(visitMapper(visit)); });
        setVisits(vits);
        setDataLoaded(true);
      });
  };

  const handleDelete = () => {
    deleteAVisit(accessToken, activeVisit.id)
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
    let newFilter:object = { _and: [ statusNotEqual(VISIT_STATUS.inactive), statusNotEqual(VISIT_STATUS.active), dateRangeFilter(val, toDate) ] }
    fetchVisits(newFilter);
  }

  const onToChange = (val:Date|undefined) => {
    if (typeof(val) === "undefined") {
      return;
    }
    setToDate(val);
    
    if (fromDate === null) {
      return;
    }
    let newFilter:object = { _and: [ statusNotEqual(VISIT_STATUS.inactive), statusNotEqual(VISIT_STATUS.active), dateRangeFilter(fromDate, val) ] }
    fetchVisits(newFilter);
  }

  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <VisitView visit={activeVisit} /> } title={t("visits_detail")} />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <DeleteModal name={t("this_visit")} handleClose={ () => handleModal(true, false)} handleDelete={handleDelete} /> } title="" />
      <Breadcrumb pageName={t('menu.visits')} />
      
      <div className="flex flex-row gap-3 mb-3">
        <DatePicker label={t('from')} onChange={ e => onFromChange(e?.toDate()) } maxDate={moment(toDate)} />
        <DatePicker label={t('to')} onChange={ e => onToChange(e?.toDate()) } minDate={moment(fromDate)} />
      </div>
      
      <div className="flex flex-col gap-10">
        { !dataLoaded && <div className="flex"><div className="h-16 w-16 m-auto animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" /></div> }    
        <VisitList visits={visits} totalPages={totalPages} handleModal={handleModal} handlePageChange={handlePageChange} setActiveVisit={setActiveVisit} />
      </div>
    </>
  );
};

export default VisitsDashboardPage;