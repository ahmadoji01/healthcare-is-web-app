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
import UserListTable from "@/modules/users/application/list/user.list-table";
import { User, defaultUser, userMapper } from "@/modules/users/domain/user";
import { getAllUsers } from "@/modules/users/domain/users.actions";
import { useEffect, useState } from "react";

const AccountManagementDashboardPage = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<User>(defaultUser);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const {accessToken} = useUserContext();

  useEffect( () => {
    if (!dataLoaded || users.length == 0) {
      getAllUsers(accessToken, 1)
        .then( res => {
          let usrs:User[] = [];
          res?.map( (user) => { usrs.push(userMapper(user)); });
          setUsers(usrs);
          setDataLoaded(true);
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
    getAllUsers(accessToken, value)
      .then( res => {
        let usrs:User[] = [];
        res?.map( (user) => { usrs.push(userMapper(user)); });
        setUsers(usrs);
        setDataLoaded(true);
      });
  };

  const handleSubmit = (user:User) => {
    console.log(user);
  }

  return (
    <>
      <Breadcrumb pageName="Account Management" />
      <div className="flex flex-col gap-10">
        { !dataLoaded && <div className="flex"><div className="h-16 w-16 m-auto animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" /></div> }    
        { dataLoaded && <UserListTable totalPages={totalPages} users={users} handlePageChange={handlePageChange} setActiveUser={setActiveUser} handleModal={handleModal} /> }
      </div>
    </>
  );
};

export default AccountManagementDashboardPage;