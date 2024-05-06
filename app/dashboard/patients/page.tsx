'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useUserContext } from "@/contexts/user-context";
import PatientDeleteConfirmation from "@/modules/patients/application/form/patient.delete-confirmation";
import PatientForm from "@/modules/patients/application/form/patient.form";
import PatientListTable from "@/modules/patients/application/list/patient.list-table";
import { Patient, defaultPatient, patientMapper } from "@/modules/patients/domain/patient";
import { getAllPatients, getTotalPatients, searchPatients } from "@/modules/patients/domain/patients.actions";
import { faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";

let activeTimeout = null;

const PatientsDashboardPage = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [activePatient, setActivePatient] = useState<Patient>(defaultPatient);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const {accessToken} = useUserContext();

  useEffect( () => {
    if (!dataLoaded || patients.length == 0) {
      getAllPatients(accessToken, 1)
        .then( res => {
          let pats:Patient[] = [];
          res?.map( (patient) => { pats.push(patientMapper(patient)); });
          setPatients(pats);
          setDataLoaded(true);
        });
      getTotalPatients(accessToken)
        .then( res => { 
          let total = res[0].count? parseInt(res[0].count) : 0;
          let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
          setTotalPages(pages);
        })
    }
  }, [patients]);

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
    getAllPatients(accessToken, value)
      .then( res => {
        let pats:Patient[] = [];
        res?.map( (patient) => { pats.push(patientMapper(patient)); });
        setPatients(pats);
        setDataLoaded(true);
      });
  };

  const handleSubmit = (patient:Patient) => {
    console.log(patient);
  } 

  const handleSearch = (query:string) => {
    setDataLoaded(false);
    searchPatients(accessToken, query).then( res => {
      let pats:Patient[] = [];
      res?.map( (patient) => { pats.push(patientMapper(patient)); });
      setPatients(pats);
      setDataLoaded(true);
    })
  }

  const handleChange = (query:string) => {
    if (activeTimeout) {
      clearTimeout(activeTimeout);
    }
    
    activeTimeout = setTimeout(() => {
      handleSearch(query);
    }, 1000);
  }

  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <PatientForm initPatient={activePatient} handleSubmit={handleSubmit} /> } title="Patient's Detail" />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <PatientDeleteConfirmation handleClose={ () => handleModal(true, false)} /> } title="" />
      <Breadcrumb pageName="Patients" />
      
      <div className="relative mb-4">
        <button className="absolute left-0 top-1/2 -translate-y-1/2">
          <FontAwesomeIcon icon={faSearch} width={20} />
        </button>

        <input
          type="text"
          placeholder="Type to search..."
          onChange={e => {handleChange(e.target.value) }}
          className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
          />
      </div>

      <div className="flex flex-col gap-10">
        { !dataLoaded && <div className="flex"><div className="h-16 w-16 m-auto animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" /></div> }    
        { dataLoaded && <PatientListTable totalPages={totalPages} patients={patients} setActivePatient={setActivePatient} handlePageChange={handlePageChange} handleModal={handleModal} /> }
      </div>
    </>
  );
};

export default PatientsDashboardPage;