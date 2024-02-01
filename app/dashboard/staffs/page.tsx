'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useUserContext } from "@/contexts/user-context";
import PatientDeleteConfirmation from "@/modules/patients/application/form/patient.delete-confirmation";
import PatientForm from "@/modules/patients/application/form/patient.form";
import PatientListTable from "@/modules/patients/application/list/patient.list-table";
import { Patient, patientMapper } from "@/modules/patients/domain/patient";
import { getAllPatients, getTotalPatients } from "@/modules/patients/domain/patients.actions";
import StaffForm from "@/modules/staffs/application/form/staff";
import StaffDeleteConfirmation from "@/modules/staffs/application/form/staff.delete-confirmation";
import StaffListTable from "@/modules/staffs/application/list/staff.list-table";
import { Staff } from "@/modules/staffs/domain/staff";
import { getAllStaffs, getTotalStaffs } from "@/modules/staffs/domain/staffs.actions";

import { useEffect, useState } from "react";

const StaffsDashboardPage = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const {accessToken} = useUserContext();

  useEffect( () => {
    if (!dataLoaded || staffs.length == 0) {
      getAllStaffs(accessToken, 1)
        .then( res => {
          let stfs:Staff[] = [];
          res?.map( (staff) => { stfs.push(patientMapper(staff)); });
          setStaffs(stfs);
          setDataLoaded(true);
        });
      getTotalStaffs(accessToken)
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
    getAllStaffs(accessToken, 1)
      .then( res => {
        let stfs:Staff[] = [];
        res?.map( (staff) => { stfs.push(patientMapper(staff)); });
        setStaffs(stfs);
        setDataLoaded(true);
      });
  };

  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <StaffForm /> } title="Patient's Detail" />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <StaffDeleteConfirmation handleClose={ () => handleModal(true, false)} /> } title="" />
      <Breadcrumb pageName="Staffs" />
      <div className="flex flex-col gap-10">
        { !dataLoaded && <div className="flex"><div className="h-16 w-16 m-auto animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" /></div> }    
        { dataLoaded && <StaffListTable totalPages={totalPages} staffs={staffs} handlePageChange={handlePageChange} handleEditModal={ () => handleModal(false, true) } handleDeleteModal={ () => handleModal(false,false) } /> }
      </div>
    </>
  );
};

export default StaffsDashboardPage;