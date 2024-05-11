'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Dashboard/Tables/TableOne";
import DashboardModal from "@/components/Modal/Modal";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useUserContext } from "@/contexts/user-context";
import DoctorDeleteConfirmation from "@/modules/doctors/application/form/doctor.delete-confirmation";
import DoctorForm from "@/modules/doctors/application/form/doctor.form";
import DoctorListTable from "@/modules/doctors/application/list/doctor.list-table";
import { Doctor, defaultDoctor, doctorMapper } from "@/modules/doctors/domain/doctor";
import { getAllDoctors, getTotalDoctors } from "@/modules/doctors/domain/doctors.actions";

//import { Metadata } from "next";
import { useEffect, useState } from "react";

//export const metadata: Metadata = {
//  title: "Tables Page | Next.js E-commerce Dashboard Template",
//  description: "This is Tables page for TailAdmin Next.js",
//};

const DoctorsDashboardPage = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [activeDoctor, setActiveDoctor] = useState<Doctor>(defaultDoctor);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const {accessToken} = useUserContext();

  useEffect( () => {
    if (!dataLoaded || doctors.length == 0) {
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
    getAllDoctors(accessToken, value)
      .then( res => {
        let docs:Doctor[] = [];
        res?.map( (doctor) => { docs.push(doctorMapper(doctor)); });
        setDoctors(docs);
        setDataLoaded(true);
      });
  };

  const handleSubmit = (doctor:Doctor) => {
    console.log(doctor);
  }

  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <DoctorForm initDoctor={activeDoctor} handleSubmit={handleSubmit} /> } title="Doctor's Detail" />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <DoctorDeleteConfirmation handleClose={ () => handleModal(true, false)} /> } title="" />
      <Breadcrumb pageName="Doctors" />
      <div className="flex flex-col gap-10">
        { !dataLoaded && <div className="flex"><div className="h-16 w-16 m-auto animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" /></div> }    
        { dataLoaded && <DoctorListTable totalPages={totalPages} doctors={doctors} handlePageChange={handlePageChange} setActiveDoctor={setActiveDoctor} handleModal={handleModal} /> }
      </div>
    </>
  );
};

export default DoctorsDashboardPage;