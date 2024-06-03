'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import TreatmentDeleteConfirmation from "@/modules/treatments/application/form/treatment.delete-confirmation";
import TreatmentForm from "@/modules/treatments/application/form/treatment.form";
import TreatmentListTable from "@/modules/treatments/application/list/treatment.list-table";
import { Treatment, defaultTreatment, treatmentMapper, treatmentOrgMapper, treatmentPatcherMapper } from "@/modules/treatments/domain/treatment";
import { deleteATreatment, getAllTreatments, getTotalSearchTreatments, getTotalTreatments, searchTreatments, updateATreatment } from "@/modules/treatments/domain/treatments.actions";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

let activeTimeout = null;

const TreatmentsDashboardPage = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [activeTreatment, setActiveTreatment] = useState<Treatment>(defaultTreatment);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {openSnackbarNotification} = useAlertContext();
  const {accessToken} = useUserContext();
  const {t} = useTranslation();

  const fetchAllTreatments = () => {
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

  useEffect( () => {
    if (!dataLoaded || treatments.length == 0) {
      fetchAllTreatments();
    }
  }, [treatments]);

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
    searchTreatments(accessToken, searchQuery, value)
      .then( res => {
        let treats:Treatment[] = [];
        res?.map( (treatment) => { treats.push(treatmentMapper(treatment)); });
        setTreatments(treats);
        setDataLoaded(true);
      });
  }

  const handleSubmit = (treatment:Treatment) => {
    updateATreatment(accessToken, treatment.id, treatmentPatcherMapper(treatment))
      .then( () => {
        openSnackbarNotification(t('alert_msg.success'), "success");
        window.location.reload();
      }).catch( () => {
        openSnackbarNotification(t('alert_msg.server_error'), "error");
      })
  } 

  const handleSearch = (query:string) => {
    if (query.length > 3) {
      setDataLoaded(false);
      searchTreatments(accessToken, query, 1).then( res => {
        let treats:Treatment[] = [];
        res?.map( (treatment) => { treats.push(treatmentMapper(treatment)); });
        setTreatments(treats);
        setDataLoaded(true);
      });
      getTotalSearchTreatments(accessToken, query)
        .then( res => {
          let total = res[0].count? parseInt(res[0].count) : 0;
          let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
          setTotalPages(pages);
        });
    }
    if (query.length === 0) {
      setDataLoaded(false);
      fetchAllTreatments();
    }
  }

  const handleChange = (query:string) => {
    setSearchQuery(query);
    if (activeTimeout) {
      clearTimeout(activeTimeout);
    }
    
    activeTimeout = setTimeout(() => {
      handleSearch(query);
    }, 1000);
  }

  const handleDelete = () => {
    deleteATreatment(accessToken, activeTreatment.id)
      .then( () => {
        openSnackbarNotification(t('alert_msg.success'), "success");
        window.location.reload();
      }).catch( () => {
        openSnackbarNotification(t('alert_msg.server_error'), "error");
      })
  }

  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <TreatmentForm initTreatment={activeTreatment} handleSubmit={handleSubmit} /> } title="Treatment's Detail" />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <TreatmentDeleteConfirmation treatment={activeTreatment} handleDelete={handleDelete} handleClose={ () => handleModal(true, false)} /> } title="" />
      <Breadcrumb pageName="Treatments" />

      <div className="relative mb-4">
        <button className="absolute left-0 top-1/2 -translate-y-1/2" onClick={() => handleChange(searchQuery)}>
          <FontAwesomeIcon icon={faSearch} width={20} />
        </button>

        <input
          type="search"
          placeholder="Type to search..."
          onChange={e => {handleChange(e.target.value) }}
          className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
          />
      </div>
      
      <div className="flex flex-col gap-10">
        { !dataLoaded && <div className="flex"><div className="h-16 w-16 m-auto animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" /></div> }    
        { dataLoaded && <TreatmentListTable totalPages={totalPages} treatments={treatments} setActiveTreatment={setActiveTreatment} handlePageChange={handlePageChange} handleModal={handleModal} /> }
      </div>
    </>
  );
};

export default TreatmentsDashboardPage;