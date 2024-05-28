'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { ALERT_MESSAGE } from "@/constants/alert";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import { Doctor, doctorNoIDMapper } from "@/modules/doctors/domain/doctor";
import { createADoctor } from "@/modules/doctors/domain/doctors.actions";
import { errorMapper } from "@/modules/errors/domains/error";
import { ERROR_CODE } from "@/modules/errors/domains/errors.constants";
import { errorMessage } from "@/modules/errors/domains/errors.specifications";
import { Staff, staffNoIDMapper } from "@/modules/staffs/domain/staff";
import { createAStaff } from "@/modules/staffs/domain/staffs.actions";
import UserForm from "@/modules/users/application/form/user.form";
import { User, UserRole, defaultRole, defaultUser, roleMapper, userCreatorMapper, userMapper } from "@/modules/users/domain/user";
import { createAUser, getAllRoles } from "@/modules/users/domain/users.actions";
import { ROLES } from "@/modules/users/domain/users.constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const AccountCreatePage = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("User");
  const [initUser, setInitUser] = useState(defaultUser);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const {accessToken, organization} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();

  useEffect( () => {
    getAllRoles(accessToken).then( res => {
      let rls:UserRole[] = [];
      res?.map( (role) => { rls.push(roleMapper(role)) });
      setRoles(rls);
    })

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
  
  const handleSubmit = async (user:User, doctor:Doctor, staff:Staff, role:string) => {
    user.first_name = staff.name !== "" ? staff.name : doctor.name;
    let usr = userCreatorMapper(user, role, organization.id);

    let isError = false;
    let redirectPath = "/dashboard/doctors";
    let newUser = defaultUser;
    
    await createAUser(usr).then( res => {
      newUser = userMapper(res);
      openSnackbarNotification(ALERT_MESSAGE.success, "success");
      router.push(redirectPath);
    }).catch( err => {
      let error = errorMapper(err.errors[0]);
      let message = errorMessage(error.code, error.field);
      isError = true;
      openSnackbarNotification(message, "error");
    })

    if (isError) {
      return;
    }

    if (staff.name === "") {
      await createADoctor(accessToken, doctorNoIDMapper(doctor, organization.id, newUser.id)).then( res => {
        openSnackbarNotification(ALERT_MESSAGE.success, "success");
        router.push(redirectPath);
      }).catch( () => {
        openSnackbarNotification(ALERT_MESSAGE.server_error, "error");
      });
    } else {
      redirectPath = "/dashboard/staffs";
      await createAStaff(accessToken, staffNoIDMapper(staff, organization.id, newUser.id)).then( res => {
        openSnackbarNotification(ALERT_MESSAGE.success, "success");
        router.push(redirectPath);
      }).catch( () => {
        openSnackbarNotification(ALERT_MESSAGE.server_error, "error");
      })
    }
  }

  return (
    <>
      <Breadcrumb pageName={"Add a " + title} />
      <UserForm initRoles={roles} initUser={initUser} handleSubmit={handleSubmit} />
    </>
  );
};

export default AccountCreatePage;
