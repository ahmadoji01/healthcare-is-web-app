'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { Doctor } from "@/modules/doctors/domain/doctor";
import { Staff } from "@/modules/staffs/domain/staff";
import UserForm from "@/modules/users/application/form/user.form";
import { User } from "@/modules/users/domain/user";


const AccountCreatePage = () => {

  const handleSubmit = (user:User, doctor:Doctor, staff:Staff) => {
    console.log(user, doctor, staff);
  }

  return (
    <>
      <Breadcrumb pageName="Create a User" />
      <UserForm handleSubmit={handleSubmit} />
    </>
  );
};

export default AccountCreatePage;
