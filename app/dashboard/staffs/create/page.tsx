'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { ALERT_MESSAGE } from "@/constants/alert";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import StaffForm from "@/modules/staffs/application/form/staff.form";
import { Staff, defaultStaff, staffNoIDMapper } from "@/modules/staffs/domain/staff";
import { createAStaff, staffExistChecker } from "@/modules/staffs/domain/staffs.actions";

import { useState } from "react";

const StaffCreatePage = () => {
  const [staff, setStaff] = useState(defaultStaff);
  const {accessToken, user} = useUserContext();
  const {setOpen, setMessage, setStatus} = useAlertContext();

  const handleSubmit = async (staff:Staff) => {
    let staffExists = false;
    await staffExistChecker(accessToken, staff.id_card_number, staff.family_id_number)
      .then( res => {
        if (res.length != 0) {
          staffExists = true;
          return;
        }
      }).catch( err => {
        setOpen(true);
        setMessage(ALERT_MESSAGE.server_error);
        setStatus("error");
        return;
      });
    
    if (staffExists) { 
      setOpen(true);
      setMessage(ALERT_MESSAGE.dataExists('staff'));
      setStatus("error");
      return;
    }

    let staffNoID = staffNoIDMapper(staff, user.organizationID);
    await createAStaff(accessToken, staffNoID).then( () => {
      setOpen(true);
      setMessage("Success! Staff has been created!");
      setStatus("success");
      window.location.href = '/dashboard/staffs'
      return;
    }).catch( err => {
      setOpen(true);
      setMessage(ALERT_MESSAGE.server_error);
      setStatus("error");
      return;
    })
  }

  return (
    <>
      <Breadcrumb pageName="Add Staff" />
      <StaffForm handleSubmit={handleSubmit} initStaff={staff} />
    </>
  );
};

export default StaffCreatePage;
