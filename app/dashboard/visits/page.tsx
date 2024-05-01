'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { ALERT_MESSAGE } from "@/constants/alert";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import VisitList from "@/modules/visits/application/visit.list";
import { Visit, visitMapper } from "@/modules/visits/domain/visit";
import { getAllVisits, getTotalVisits } from "@/modules/visits/domain/visits.actions";
import { useEffect, useState } from "react";

const VisitsDashboardPage = () => {

  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect( () => {
    if (!dataLoaded || visits.length == 0) {
      getAllVisits(accessToken, 1)
        .then( res => {
          let vits:Visit[] = [];
          res?.map( (visit) => { vits.push(visitMapper(visit)); });
          setVisits(vits);
          setDataLoaded(true);
        });
      getTotalVisits(accessToken)
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
    getAllVisits(accessToken, 1)
      .then( res => {
        let vits:Visit[] = [];
        res?.map( (visit) => { vits.push(visitMapper(visit)); });
        setVisits(vits);
        setDataLoaded(true);
      });
  };

  return (
    <>
      <Breadcrumb pageName="Visits" />

      <div className="flex flex-col gap-10">
      { !dataLoaded && <div className="flex"><div className="h-16 w-16 m-auto animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" /></div> }    
      { dataLoaded && <VisitList visits={visits} /> }
      </div>
    </>
  );
};

export default VisitsDashboardPage;