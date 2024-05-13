'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import { ALERT_MESSAGE } from "@/constants/alert";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import { useVisitContext } from "@/contexts/visit-context";
import VisitDeleteConfirmation from "@/modules/visits/application/form/visit.delete-confirmation";
import VisitForm from "@/modules/visits/application/form/visit.form";
import VisitList from "@/modules/visits/application/visit.list";
import { Visit, defaultVisit, visitCreatorMapper, visitMapper } from "@/modules/visits/domain/visit";
import { deleteAVisit, getAllVisits, getTotalVisits, updateVisit } from "@/modules/visits/domain/visits.actions";
import { useEffect, useState } from "react";

const VisitsDashboardPage = () => {

  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const [activeVisit, setActiveVisit] = useState(defaultVisit);
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

  const handleSubmit = (visit:Visit) => {
    updateVisit(accessToken, visit.id, { status: visit.status })
      .then( () => {
        openSnackbarNotification(ALERT_MESSAGE.success, "success");
        window.location.reload();
      }).catch( () => {
        openSnackbarNotification(ALERT_MESSAGE.server_error, "error");
      });
  }

  const handleDelete = () => {
    deleteAVisit(accessToken, activeVisit.id)
      .then( () => {
        openSnackbarNotification(ALERT_MESSAGE.success, "success");
        window.location.reload();
      }).catch( () => {
        openSnackbarNotification(ALERT_MESSAGE.server_error, "error");
      })
  }

  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <VisitForm initVisit={activeVisit} handleSubmit={handleSubmit} /> } title="Visit's Detail" />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <VisitDeleteConfirmation handleClose={ () => handleModal(true, false)} handleDelete={handleDelete} /> } title="" />
      <Breadcrumb pageName="Visits" />

      <div className="flex flex-col gap-10">
      { !dataLoaded && <div className="flex"><div className="h-16 w-16 m-auto animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" /></div> }    
      { dataLoaded && <VisitList visits={visits} totalPages={totalPages} handleModal={handleModal} handlePageChange={handlePageChange} setActiveVisit={setActiveVisit} /> }
      </div>
    </>
  );
};

export default VisitsDashboardPage;