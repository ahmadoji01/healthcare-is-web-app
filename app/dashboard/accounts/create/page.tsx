'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { Doctor } from "@/modules/doctors/domain/doctor";
import { Staff } from "@/modules/staffs/domain/staff";
import UserForm from "@/modules/users/application/form/user.form";
import { User, defaultUser } from "@/modules/users/domain/user";
import { ROLES } from "@/modules/users/domain/users.constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const AccountCreatePage = () => {

  const searchParams = useSearchParams();
  const [title, setTitle] = useState("User");
  const [initUser, setInitUser] = useState(defaultUser);

  useEffect( () => {
    const role = searchParams.get('role');
    if (role === ROLES.doctor) {
      setTitle(ROLES.doctor);
      setInitUser({ ...initUser, role_name: ROLES.doctor });
      return;
    }
    if (role === ROLES.staff) {
      setTitle(ROLES.staff);
      setInitUser({ ...initUser, role_name: ROLES.staff });
      return;
    }
  }, [searchParams])
  
  const handleSubmit = (user:User, doctor:Doctor, staff:Staff) => {
    console.log(user, doctor, staff);
  }

  return (
    <>
      <Breadcrumb pageName={"Add a " + title} />
      <UserForm initUser={initUser} handleSubmit={handleSubmit} />
    </>
  );
};

export default AccountCreatePage;
