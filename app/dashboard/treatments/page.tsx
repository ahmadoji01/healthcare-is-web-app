'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useUserContext } from "@/contexts/user-context";
import TreatmentDeleteConfirmation from "@/modules/treatments/application/form/treatment.delete-confirmation";
import TreatmentForm from "@/modules/treatments/application/form/treatment.form";
import TreatmentListTable from "@/modules/treatments/application/list/treatment.list-table";
import { Treatment, defaultTreatment, treatmentMapper } from "@/modules/treatments/domain/treatment";
import { getAllTreatments, getTotalTreatments } from "@/modules/treatments/domain/treatments.actions";

import { useEffect, useState } from "react";

const TreatmentsDashboardPage = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [activeTreatment, setActiveTreatment] = useState<Treatment>(defaultTreatment);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const {accessToken} = useUserContext();

  useEffect( () => {
    if (!dataLoaded || treatments.length == 0) {
      getAllTreatments(accessToken, 1)
        .then( res => {
          let treats:Treatment[] = [];
          res?.map( (treatment) => { treats.push(treatmentMapper(treatment)); });
          setTreatments(treats);
          setDataLoaded(true);
        });
      getTotalTreatments(accessToken)
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
    getAllTreatments(accessToken, value)
      .then( res => {
        let treats:Treatment[] = [];
        res?.map( (treatment) => { treats.push(treatmentMapper(treatment)); });
        setTreatments(treats);
        setDataLoaded(true);
      });
  };

  const handleSubmit = (treatment:Treatment) => {
    console.log(treatment);
  } 

  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <TreatmentForm initTreatment={activeTreatment} handleSubmit={handleSubmit} /> } title="Treatment's Detail" />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <TreatmentDeleteConfirmation handleClose={ () => handleModal(true, false)} /> } title="" />
      <Breadcrumb pageName="Treatments" />
      <div className="flex flex-col gap-10">
        { !dataLoaded && <div className="flex"><div className="h-16 w-16 m-auto animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" /></div> }    
        { dataLoaded && <TreatmentListTable totalPages={totalPages} treatments={treatments} setActiveTreatment={setActiveTreatment} handlePageChange={handlePageChange} handleModal={handleModal} /> }
      </div>
    </>
  );
};

export default TreatmentsDashboardPage;