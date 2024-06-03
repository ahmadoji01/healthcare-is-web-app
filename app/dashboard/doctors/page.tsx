'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import DoctorDeleteConfirmation from "@/modules/doctors/application/form/doctor.delete-confirmation";
import DoctorForm from "@/modules/doctors/application/form/doctor.form";
import DoctorListTable from "@/modules/doctors/application/list/doctor.list-table";
import { Doctor, defaultDoctor, doctorMapper, doctorPatcherMapper } from "@/modules/doctors/domain/doctor";
import { deleteADoctor, getAllDoctors, getTotalDoctors, getTotalSearchDoctors, searchDoctors, updateADoctor } from "@/modules/doctors/domain/doctors.actions";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

let activeTimeout = null;

const DoctorsDashboardPage = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [activeDoctor, setActiveDoctor] = useState<Doctor>(defaultDoctor);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const {t} = useTranslation();

  const fetchAllDoctors = () => {
    getAllDoctors(accessToken, 1)
      .then( res => {
        let docs:Doctor[] = [];
        res?.map( (doctor) => { docs.push(doctorMapper(doctor)); });
        setDoctors(docs);
        setDataLoaded(true);
      });
    getTotalDoctors(accessToken)
      .then( res => { 
        let total = res[0].count? parseInt(res[0].count) : 0;
        let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
        setTotalPages(pages);
      })
  }

  useEffect( () => {
    if (!dataLoaded || doctors.length == 0) {
      fetchAllDoctors();
    }
  }, [doctors]);

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
    searchDoctors(accessToken, searchQuery, value)
      .then( res => {
        let docs:Doctor[] = [];
        res?.map( (doctor) => { docs.push(doctorMapper(doctor)); });
        setDoctors(docs);
        setDataLoaded(true);
      });
  };

  const handleSubmit = (doctor:Doctor) => {
    updateADoctor(accessToken, doctor.id, doctorPatcherMapper(doctor))
      .then( () => {
        openSnackbarNotification(t("alert_msg.success"), "success");
        window.location.reload();
      }).catch( () => {
        openSnackbarNotification(t("alert_msg.server_error"), "error");
      })
  } 

  const handleSearch = (query:string) => {
    if (query.length > 3) {
      setDataLoaded(false);
      searchDoctors(accessToken, query, 1).then( res => {
        let docs:Doctor[] = [];
        res?.map( (doctor) => { docs.push(doctorMapper(doctor)); });
        setDoctors(docs);
        setDataLoaded(true);
      });
      getTotalSearchDoctors(accessToken, query)
        .then( res => {
          let total = res[0].count? parseInt(res[0].count) : 0;
          let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
          setTotalPages(pages);
        });
    }
    if (query.length === 0) {
      setDataLoaded(false);
      fetchAllDoctors();
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
    deleteADoctor(accessToken, activeDoctor.id)
      .then( () => {
        openSnackbarNotification(t("alert_msg.success"), "success");
        window.location.reload();
      }).catch( () => {
        openSnackbarNotification(t("alert_msg.server_error"), "error");
      })
  }

  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <DoctorForm initDoctor={activeDoctor} handleSubmit={handleSubmit} /> } title="Doctor's Detail" />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <DoctorDeleteConfirmation doctor={activeDoctor} handleDelete={handleDelete} handleClose={ () => handleModal(true, false)} /> } title="" />
      <Breadcrumb pageName="Doctors" />

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
        { dataLoaded && <DoctorListTable totalPages={totalPages} doctors={doctors} handlePageChange={handlePageChange} setActiveDoctor={setActiveDoctor} handleModal={handleModal} /> }
      </div>
    </>
  );
};

export default DoctorsDashboardPage;